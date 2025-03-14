const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const exhbs = require('express-handlebars')
const dbo = require('./db')
const ObjectID = dbo.ObjectID

app.engine('hbs', exhbs.engine({ layoutsDir: 'views/', defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(bodyparser.urlencoded({ extended: true }))  


app.get('/', async (req, res) => {
    const database = await dbo.getDatabase()
    let collection = database.collection('listone')
    let cursor = collection.find({})
    const mobileList = await cursor.toArray()

    let message = ''
    let edit_id, edit_mobile;
    if (req.query.edit_id) {
        edit_id = req.query.edit_id;
        edit_mobile = await collection.findOne({ _id: new ObjectID(edit_id) })
    }
    switch (req.query.status) {
        case '1':
            message = "Mobile created successfully."
            break;
        case '2':
            message = "Mobile updated successfully."
        default:    
            break;
    }
    res.render('main', { message, mobileList, edit_id, edit_mobile })
})

app.post('/mobile', (async (req, res) => {
    let database = await dbo.getDatabase()
    let collection = database.collection('listone')
    let mobileData = { brand: req.body.Brand, price: req.body.Price, ram: req.body.Ram, rom: req.body.Rom }
    await collection.insertOne(mobileData)
    return res.redirect('/?status=1')
}))

app.post('/update_mobile/:edit_id', (async (req, res) => {
    const database = await dbo.getDatabase()
    let collection = database.collection('listone')
    let edit_id = req.params.edit_id
    let mobiles = { brand: req.body.Brand, price: req.body.Price, ram: req.body.Ram, rom: req.body.Rom }
    await collection.updateOne({ _id: new ObjectID(edit_id) }, { $set: mobiles })
    return res.redirect('/?status=2',)
}))

app.listen(3400, () => {
    console.log("Listening to 3400 port");
})
