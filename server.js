const express = require('express')
const app = express()

// routes

app.get('/', (req, res) => {
    res.send("Hello Node api")
})

app.listen(3000, () => {
    console.log(`NodeApi app is running on port 3000`)
})