const ProductModel = require("../models/ProductModel")
const fs = require('fs')
const slugify = require("slugify")

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields

        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(404).send({ error: "Name is required" })
            case !description:
                return res.status(404).send({ error: "description is required" })
            case !price:
                return res.status(404).send({ error: "price is required" })
            case !category:
                return res.status(404).send({ error: "category is required" })
            case !quantity:
                return res.status(404).send({ error: "quantity is required" })
            case photo && photo.size > 100000000:
                return res.status(504).send({ error: "photo is required" })
        }
        const products = new ProductModel({ ...req.fields, slug: slugify(name)})

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products,

        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            error,
            message: error.message
        })
    }
}

//get all

const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({})
            .populate("category")
            .select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(201).send({
            success: true,
            total: products.length,
            message: "All Product ",
            products,

        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            error,
            message: error.message
        })
    }
}

const getSingleProduct = async (req, res) => {
    try {

        const products = await ProductModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(201).send({
            success: true,
            success: true,
            message: "single Product ",
            products,
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            error,
            message: error.message
        })
    }
}


const productPhoto = async (req, res) => {

    try {
        const products = await ProductModel.findById(req.params.pid).select("photo")
        if (products.photo.data) {
            res.set("ContentType", products.photo.contentType)
            return res.status(200).send(products.photo.data)
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            error,
            message: error.message
        })
    }
}
 const deleteProductController = async (req, res) => {
    try {
      await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };
  const updateProduct = async(req,res)=>{
    try {
        const { name, description, price, category, quantity, shipping } = req.fields

        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(404).send({ error: "Name is required" })
            case !description:
                return res.status(404).send({ error: "description is required" })
            case !price:
                return res.status(404).send({ error: "price is required" })
            case !category:
                return res.status(404).send({ error: "category is required" })
            case !quantity:
                return res.status(404).send({ error: "quantity is required" })
            case photo && photo.size > 100000000:
                return res.status(504).send({ error: "photo is required" })
        }
        const products = await ProductModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product update successfully",
            products,

        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            error,
            message: error.message
        })
    }
  }
module.exports = { createProduct, getProducts, getSingleProduct, productPhoto,deleteProductController,updateProduct }