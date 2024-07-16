const categoryModel = require("../models/categoryModel");
const slugify = require("slugify")
const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) return res.status(404).send({ message: "name is required" })

        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) return res.status(200).json({
            success: true,
            message: "category name already in use"
        })

        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "new category created",
            category
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in creating category"
        })
    }
}

const UpdateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: " category updated",
            category
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            error,
            message: "error in updating category"
        })
    }
}

//get all category
const getAllCategory = async(req,res)=>{
    try{
   const category = await categoryModel.find({})
   res.status(200).send({message:"All categories",
    category
   })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            error,
            message: "error in getting category"
        })
    }
}
const singleCategory =async (req,res)=>{
try{
    
    const category = await categoryModel.findOne({slug:req.params.slug})
    res.status(200).send({message:"get single category",
        category
       })
}
catch (error) {
    console.log(error.message);
    res.status(500).send({
        success: false,
        error,
        message: "error in getting category"
    })
}
}
//delete category


const DeleteCategory =async (req,res)=>{
    try{
        const {id} = req.params
       await categoryModel.findByIdAndDelete(id)
       res.status(200).send({message:"category deleted",
        
       })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            error,
            message: "error in deleting category"
        })
    }
    }


module.exports = { createCategoryController, UpdateCategoryController ,getAllCategory , singleCategory,DeleteCategory}