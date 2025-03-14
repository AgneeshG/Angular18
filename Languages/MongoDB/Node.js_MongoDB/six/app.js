const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const exhbs = require('express-handlebars')
const dbo = require('./db')
const { endianness } = require('os')
const ObjectID = dbo.ObjectID

app.engine('hbs', exhbs.engine({ layoutsDir: 'views/', extname: 'hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(bodyparser.urlencoded({ extended: true }))


app.get('/', async (req, res) => {
    const database = await dbo.getDatabase()
    let collection = database.collection('listone')
    let cursor = collection.find({})
    const mobilesList = await cursor.toArray()

    let edit_id, edit_mobile;
    if(req.query.edit_id){
        edit_id = req.query.edit_id;
        edit_mobile = await collection.findOne({_id:new ObjectID(edit_id)})
    }

    if(req.query.delete_id){
        // delete_id = req.query.delete_id
        await collection.deleteOne({_id:new ObjectID(req.query.delete_id)})
        return res.redirect('/?status=3')
    }
    let message = ""
    switch (req.query.status) {
        case '1':
            message = "New mobile created successfully."
            break;
        case '2':
            message = "Mobile details updated successfully."
        case '3':
            message = "Mobile deleted successfully"
    }
    res.render('main', { message, mobilesList, edit_id, edit_mobile })
})

app.post('/new_mobile', async (req, res) => {
    const database = await dbo.getDatabase()
    let collection = database.collection('listone')
    let newMobile = { brand: req.body.brand, price: req.body.price, ram: req.body.ram, rom: req.body.rom }
    await collection.insertOne(newMobile)
    return res.redirect('/?status=1')
})

app.post('/update_mobile/:edit_id', (async (req, res) => {
    const database = await dbo.getDatabase()
    let collection = database.collection('listone')
    let edit_id = req.params.edit_id
    let updateMobile = { brand:req.body.brand, price:req.body.price, rom:req.body.rom, ram:req.body.ram }
    await collection.updateOne({ _id: new ObjectID(edit_id)}, {$set: updateMobile})
    return res.redirect('/?status=2')
})  )





app.listen(3000, () => {
    console.log("listening to 3000 port");
})