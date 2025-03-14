const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

const products = require('./routes/products')
const order = require('./routes/order')

app.use(express.json())
app.use('/api/v1/', products)
app.use('/api/v1/', order)

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening to ${process.env.PORT} port in ${process.env.DEV_ENVIRONMENT}`);
})
