import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

//login controller
export const loginUser = async (req,res) => {
    res.json({mesg: "User Login"})
}

//signup controller
export const signupUser = asyncHandler( async (req,res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const user = await User.signup(firstName, lastName, email, password, role)
        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
   

})
