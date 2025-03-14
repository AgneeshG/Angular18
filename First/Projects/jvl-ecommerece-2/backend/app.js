const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')


const product = require('./routes/products')
const order = require('./routes/order')



app.listen(5000, ()=>{
    console.log(`Server listening to port 5000`);
})