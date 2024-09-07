const Product = require('../models/productModel')
const asyncHandler= require('express-async-handler')


 // get all products
const getProducts = asyncHandler(async(req, res)=> {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
        
    }
})

//get single product
const getSingleProduct = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
        
    }
})

// create a product

const createProduct = asyncHandler(async(req,res)=> {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product); 
        
    } catch (error) {
        console.log(error.message);
        res.status(500);
        throw new Error(error.message)
        
    }
})

const updateProduct = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true 
        });
        if (!product) {
            res.stat(404);
            throw new Error(`Product with that id cannot be found ${id}`)
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const deleteProduct =asyncHandler( async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.stat(404);
            throw new Error(`Product with that id cannot be found ${id}`)
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct

}