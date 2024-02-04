import {user} from "../models/userModels.js";
import { generateToken } from "../utils/utils.js";


export const signup = async(req, res)=>{
    const {name,email,password,role} = req.body;
    const userExists = await user.findOne({email,password});

    if (userExists){
        res.status(400).json({message:"Email already exits. Please signup with a different email"})
    }

    const newUser = await user.create({
        name,
        email,
        password,
        role
    })

    if (newUser){
        res.json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            role: newUser.role,
            token: generateToken(newUser._id)
        })
    }
}

export const loginUser = async(req,res)=>{
    try{
        const{email,password} = req.body;

        const User = await user.findOne({email, password});

        if(!User){
            throw new Error("Invalid email or password");
        }

        if (user){
            res.json({
                _id: User._id,
                name: User.name,
                email: User.email,
                token: generateToken(User._id),
            });
        }
    } catch(err){
        console.log(err);
        res.status(500).send("incorrect password or email")
    }

}

//to get all users
export const getAllUsers = async(req,res)=>{
    try{
        const all = await user.find();

        if(all){
            res.status(200).json(all);
        }else{
            res.status(404).json({message:"No user found"});
        }
    }catch(error){
        console.error(error.message);
        res.status(500).json(error.message)
    }
}


//get a single user
export const getUser = async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.json({
                message: "User not found"
            });
        }
        const id = req.params.id;
        const all = await user.findById(id);
        if(all){
            res.send(all);
        }
    }catch(error){
        console.error(error.message);
    }
}


//update user profile
export const updateUser = async(req,res)=>{
    try{
        if(!mysql.Types.ObjectId.isValid(req.params.id)){
            return res.json({
                message: "user not found"
            })
        }

        const id =req.params.id;
        const all = await user.findByIdAndUpdate(id.req.body,{
            new: true,
            runValidators: true
        })
        if(all){
            res.json({
                message: "User profile updated successfully",
                data: org
            });
        }
    }catch(error){
        console.error(error.message)
    }
}

//delete user
export const deleteUser = async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.json({
                message: "user not found"
            });
        }
        const id = req.params.id;
        const all = await user.findByIdAndDelete(id);
        if(all){
            res.json({
                message:"user delete"
            })
        }
    } catch(error){
        console.error(error.message);
    }
}