import { property } from "../models/propertyModels.js";
import { generateToken } from "../utils/utils.js";

export const newProperty = async(req,res)=>{
    try{
        const {propertyType, propertyName, description, image, country, state, city, zipCode, address} = req.body;
        const createProperty = await new property({
            propertyType,
            propertyName,
            description,
            image,
            country,
            state,
            city,
            zipCode,
            address,
        })
        await createProperty.save()
        .then(()=>res.status(201).json(
            {
                message: "New property created succesfully!",
                data: createProperty
            }
        ))
        // if(createProperty){
        //     res.join({
        //         _id: createProperty._id,
        //         propertyType: createProperty.propertyType,
        //         propertyName: createProperty.propertyName,
        //         description: createProperty.description,
        //         image: createProperty.image,
        //         country: createProperty.country,
        //         state: createProperty.state,
        //         city: createProperty.city,
        //         zipCode: createProperty.zipCode,
        //         address: createProperty.address,
        //         token: generateToken(createProperty._id)
        //     })
        // }

        
        
    } catch(error){
        console.error(error.message);
        res.status(500).json(error)
    }
}

//get all property

export const getAllProperty = async(req,res)=>{
    try{
        const rec = await property.find()
        console.log(rec)

        if(rec){
            res.status(200).json(rec)
        }else{
            res.status(404).json({message:"Property not found"})
        }
    } catch(error){
        console.error(error.message)
    }
}

//get property by ID

export const getProperty = async(req,res)=>{
    try{
        const id = req.params.id;
        const rec = await property.findById(id);
        if(rec){
            res.status(200).json(rec)
        }
    } catch(error){
        console.error(error.message);
        res.status(500).json(error.message)
    }
}

//update property
export const updateProperty = async(req,res)=>{
    try{
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
        const id = req.paras.id;
        const rec = await property.findByIdAndDelete(id)
        if(rec){
            res.json({message: "Property deleted successfully"})
        }
    }catch(error){
        console.error(error.message)
    }
}