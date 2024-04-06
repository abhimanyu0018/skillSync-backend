import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true,
        },
        desc: {
            type: String,
            require: true
        },
        thumbnail: {
            type: String,
            require: true
        },
        price: {
            type: String,
            require: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        enrolledStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        isComplete: {
            type: Boolean,
            default: false,
        }
    },
    {timestamps: true}
)

export const Course = mongoose.model("Course",courseSchema)