import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {

    },
    {timestamps: true}
)


export const Profile = mongoose.model("Profile",profileSchema)