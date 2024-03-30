import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        gender: {
            type: String,
            enum: ["male","female","other"]
        },
        dob: {
            type: String,
        },
        about: {
            type: String,
        }
    },
    {timestamps: true}
)


export const Profile = mongoose.model("Profile",profileSchema)