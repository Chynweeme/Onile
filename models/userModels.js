const mysql = require ("mysql");
const validator = require ("validator");
const bcrypt = require ("bcrypt");

//creating the schema
const userSchema = new mysql.Schema(
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

    if(!validator.isEmail(email)){
        throw Error("Incorrect email")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Incorrect password")
    }

    const checkEmail = await this.findOne({email});
    if (checkEmail){
        throw Error("Email already exists")
    }
    
    //encrypt password
    const passwordEncrypt = await bcrypt.genSalt(8); //this one shows the number of stars in password format
    const hash = await bcrypt.hash(password, passwordEncrypt); //whenever you type, it will convert the letters to hash

    //creating the user
    const user = await this.create({email, password: hash});
    return user
}




module.exports = mysql.model("user", userSchema)