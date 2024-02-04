import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        mongoose.connect("mongodb+srv://Chynwe:welcome!@cluster0.ea11hek.mongodb.net/")
        console.log(`Onile has connected successfully to MongoDB!`);
    }catch(error){
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
};