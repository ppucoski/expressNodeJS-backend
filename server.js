const express = require('express')
const app = express()
const Product = require ('./models/productModel')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// database connection
const mongoose = require('mongoose')

// routes

app.get('/', (req, res) => {
    res.send("Hello Node api test")
})

app.get('/products', async(req, res)=> {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id); // Pass the id directly
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/products', async(req,res)=> {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product); 
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
})

// updating a product

// updating a product
app.put('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true 
        });
        if (!product) {
            return res.status(404).json({ message: 'Product with that id cannot be found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//deleting a product

app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({ message: 'Product with that id cannot be found' });

        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.
connect('mongodb+srv://admin:admin@mycluster.fqide.mongodb.net/Node-API?retryWrites=true&w=majority&appName=myCluster')
.then(() => {
    app.listen(3000, () => {
        console.log(`NodeApi app is running on port 3000`)
    })
    console.log('Successfully connected to MongoDB')
}).catch((error) => {
    console.log(error)
})
