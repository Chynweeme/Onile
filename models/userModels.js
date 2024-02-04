import validator from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

//creating the schema
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            enum: ["tenant","landlord"],
            required: true,
            default: "tenant",
        },
        
    },
    {
        timestamps: true
    },
   

)


userSchema.statics.signup = async function(email, password){
    if(!email || !password){
        throw Error("Incorrect signup details")
    }

    if(!isEmail(email)){
        throw Error("Incorrect email")
    }

    if(!isStrongPassword(password)){
        throw Error("Incorrect password")
    }

    const checkEmail = await this.findOne({email});
    if (checkEmail){
        throw Error("Email already exists")
    }
    
    //encrypt password
    const passwordEncrypt = await genSalt(8); //this one shows the number of stars in password format
    const hash = await _hash(password, passwordEncrypt); //whenever you type, it will convert the letters to hash

    //creating the user
    const user = await this.create({email, password: hash});
    return user
}



export const user = mongoose.model("user", userSchema)