import mongoose from "mongoose";

import Product from "../models/product.model.js";

export const getProdcut = async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({
            success: true, data: products
        });
    }
    catch(error){
        console.log("error in fetching products:", error.message)
        res.status(500).json({
            success: false, message: "Server Error"
        });
    }
}

export const addProduct = async(req, res) => {
    const product = req.body // user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({
            success: false, message: "Please provide all fields"
        });
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({
            success: true, data: newProduct
        });
    }
    catch(error){
        console.error("error in create product:", error.message);
        res.status(500).json({
            success: false, message: "Server Error"
        });
    }

}

export const updateProduct = async(req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return req.status(404).json({
            success: false, message: "Product not found"
        });
    }

    try{
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({
            success: true, data: updateProduct
        });
    }
    catch(error){
        console.log("error in updating product", error.message)
        res.status(500).json({
            success: false, message: "Server Error"
        });
    }
}

export const deleteProduct = async(req, res) => {
    const {id} = req.params
    // console.log("id:",id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return req.status(404).json({
            success: false, message: "Invalid Product Id"
        });
    }

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true, message: "Prodcut deleted"
        });
    }
    catch(error){
        console.log("error in deleting product:", error.message)
        res.status(500).json({
            success: false, message: "Server Error"
        });
    }
}