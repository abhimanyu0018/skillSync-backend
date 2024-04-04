import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String
    }
})




export const Category = mongoose.model("Category",categorySchema)