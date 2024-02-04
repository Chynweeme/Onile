import mongoose from "mongoose"

const propertySchema = new mongoose.Schema(
    {
        propertyType:{
            type: String,
            enum:["Own Property","other property"],
            required: true,
            default: "Own property"
        },
        propertyName:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: false,
        },
        country:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        zipCode:{
            type: String,
            required: false,
        },
        address:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export const property = mongoose.model("property", propertySchema)