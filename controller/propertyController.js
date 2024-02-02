import mysql from "mysql"
import { property } from "../models/propertyModels";
import { generateToken } from "../utils/utils";

export const newProperty = async(req,res)=>{
    try{
        const {propertyType, propertyName, description, image, country, state, city, zipCode, address} = req.body;
        const createProperty = await property.create({
            propertyType,
            propertyName,
            description,
            image,
            country,
            state,
            city,
            zipCode,
            address,
        });
        if(createProperty){
            res.join({
                _id: createProperty._id,
                propertyType: createProperty.propertyType,
                propertyName: createProperty.propertyName,
                description: createProperty.description,
                image: createProperty.image,
                country: createProperty.country,
                state: createProperty.state,
                city: createProperty.city,
                zipCode: createProperty.zipCode,
                address: createProperty.address,
                token: generateToken(createProperty._id)
            })
        }

        await createProperty.save();
        res.json({
            message: "New property created succesfully!",
            data: createRecipe
        })
    } catch(error){
        console.error(error.message);
    }
}

//get all property

export const getAllProperty = async(req,res)=>{
    try{
        const rec = await recipe.find()

        if(rec){
            res.send(rec)
        }else{
            res.send("No porperty found")
        }
    } catch(error){
        console.error(error.message)
    }
}

//get property by ID

export const getProperty = async(req,res)=>{
    try{
        if(!mysql.Types.ObjectId.isValid(req.params.id)){
            return res.json({message: "Property not found"});
        }
        const id = req.params.id;
        const rec = await property.findById(id);
        if(rec){
            res.send(rec)
        }
    } catch(error){
        console.error(error.message);
    }
}

//update property
export const updateProperty = async(req,res)=>{
    try{
        if(!mysql.Types.ObjectId.isvalid(req.params.id)){
            return res.json({
                message: "Property not found"
            });
        }
        const id = req.params.id;
        const rec = await property.findByIdAndUpdate(id.req.body,{
            new: true,
            runValidators: true
        })
        if(rec){
            res.json({
                message: "Prpoperty udate successfully",
                data: rec
            })
        }
    } catch(errror){
        console.error(error.message);
    }
}


//delete property
export const deleteProperty = async(req,res)=>{
    try{
        if(!mysql.Types.ObjectId.isValid(req.params.id)){
            return res.json({
               message: "Property not found" 
            });
        }
        const id = req.paras.id;
        const rec = await property.findByIdAndDelete(id)
        if(rec){
            res.json({message: "Property deleted successfully"})
        }
    }catch(error){
        console.error(error.message)
    }
}