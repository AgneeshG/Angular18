const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const exhbs = require('express-handlebars')
const dbo = require('./db')
const ObjectID = dbo.ObjectID;

app.engine('hbs', exhbs.engine({ layoutsDir: 'views/', defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {

    const database = await dbo.getDatabase()
    let collection = database.collection('listone')
    let cursor = collection.find({})
    const productList = await cursor.toArray()

    let message = ''
    let edit_id, edit_mobile;

    if (req.query.edit_id) {
        edit_id = req.query.edit_id;
        edit_mobile = await collection.findOne({ _id: new ObjectID(edit_id) })
    }

    switch (req.query.status) {
        case '1':
            message = "Data inserted successfully"
            break;
        case '2':
            message = "Data updated successfully"
            break;

        default:
            break;
    }
    res.render('main', { message, productList, edit_id, edit_mobile })
})

app.post('/mobile', (async (req, res) => {
    let database = await dbo.getDatabase()
    let collection = database.collection('listone')
    let mobiles = { brand: req.body.brand, price: req.body.price, ram: req.body.ram, rom: req.body.rom }
    await collection.insertOne(mobiles)
    return res.redirect('/?status=1')
}))

app.post('/update_mobile/:edit_id', (async (req, res) => {
    let database = await dbo.getDatabase()
    let collection = database.collection('listone')
    let edit_id = req.params.edit_id;
    let mobiles = { brand: req.body.brand, price: req.body.price, ram: req.body.ram, rom: req.body.rom }
    await collection.updateOne({ _id: new ObjectID(edit_id) }, { $set: mobiles })
    return res.redirect('/?status=2')
}))

app.listen(3000, () => {
    console.log("Listening to port 3000");
})