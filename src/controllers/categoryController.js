import asyncHandler from "../utils/asyncHandler.js";
import { Category } from "../models/category.model.js";



// Add new category to db
export const addCategory = asyncHandler( async (req,res) => {
    const { name } = req.body;

    try {
        const category = await Category.addCategory(name)

        res.status(200).json({ category })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
        
    }
})

// get all category form db 

export const getAllCategory = asyncHandler( async (req,res) => {
    try {
        const categories = await Category.getAllCategory()
        res.status(200).json(categories)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
        
    }
})