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
app.use(express.json())
app.use(express.urlencoded({extended: false}))

console.log('FRONTEND:',FRONTEND)


const corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// database connection
const mongoose = require('mongoose')

app.use('/api/products', product_route); 

app.get('/', (req, res) => {
   
    res.send("Hello Node api test")
})

app.use(errorMiddleware);


mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL, {
    dbName: process.env.MONGO_DB_NAME
})
.then(() => {
    console.log('Successfully connected to MongoDB')
}).catch((error) => {
    console.log(error)
})


app.listen(PORT, () => {
    console.log(`NodeApi app is running on port ${PORT}`)
})
