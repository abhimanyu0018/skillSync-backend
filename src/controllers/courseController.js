import asyncHandler from "../utils/asyncHandler.js"
import {Course} from "../models/course.model.js"




//course Controller 

export const createCourse = asyncHandler( async (req,res) => {
    // const {name,} = req.body

    // try {
        
    // } catch (error) {
        
    // }
    

    res.status(200).json(
        {
            message: "OK"
        }
    )


})