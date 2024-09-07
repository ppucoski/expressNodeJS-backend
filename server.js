require('dotenv').config()
var cors = require('cors')
const express = require('express')
const app = express()
const MONGO_URL=process.env.MONGO_URL
const PORT= process.env.PORT || 3000
const FRONTEND= process.env.FRONTEND
//middleware
const product_route = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
app.use('/api/products', product_route); 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());


// TODO: l8er
// vo .env FRONTEND= http://example.com 
 //var corsOptions = {
   // origin: FRONTEND,
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  //}

// database connection
const mongoose = require('mongoose')

app.get('/', (req, res) => {
   
    res.send("Hello Node api test")
})

app.use(errorMiddleware);


mongoose.set("strictQuery", false)
mongoose.
connect(MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`NodeApi app is running on port ${PORT}`)
    })
    console.log('Successfully connected to MongoDB')
}).catch((error) => {
    console.log(error)
})
