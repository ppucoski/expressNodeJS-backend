const express = require('express')
const Product = require ('../models/productModel')
const router = express.Router();
const {getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct} = require('../controller/productController')



// routes

router.get('/', getProducts);
router.get('/:id', getSingleProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id',deleteProduct);
module.exports = router;