const express = require('express')
const app = express()
const bodyparser =  require('body-parser')
const exhbs = require('express-handlebars')
const dbo = require('./db')

app.engine('hbs', exhbs.engine({layoutsDir:'views/', defaultLayout:'main', extname:'hbs'}))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.get('/',async (req,res)=>{
    let database = await dbo.getDatabase()
    const collection = database.collection('user2')
    const cursor = collection.find({})
    let userList = await cursor.toArray()

    let message = 'message from app.js file'
    res.render('main',{message,userList})
})
app.listen(5000, ()=>{
    console.log('listening to port 5000');
})