import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,

        },
        lastName: {
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

// static signup method 
userSchema.statics.signup = async function(firstName, lastName, email, password, role ) {

    const existedUser = await this.findOne({email})

    if(existedUser) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)


    const user = await this.create({
            firstName,
            lastName,
            email,
            password: hash,
            role
        })

return user

}

export const User = mongoose.model("User",userSchema)