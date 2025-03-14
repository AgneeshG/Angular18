const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const exhbs = require('express-handlebars')

app.engine('hbs', exhbs.engine({layoutsDir:'views/', defaultLayout:'main', extname:'hbs'}))
app.set('view engine', 'hbs');
app.set('views', 'views')

app.get('/',((req,res)=>{
    let message = "Express with MongoDB"
    res.render('main', {message})
}))
app.listen(4000, ()=>{
    console.log("listening to 4000 port");    
})