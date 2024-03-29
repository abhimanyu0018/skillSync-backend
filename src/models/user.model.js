import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,

        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            require:true,
            enum: ["learner","teacher"]
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ],
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        }
    },
    {timestamps: true}
)

export const User = mongoose.model("User",userSchema)