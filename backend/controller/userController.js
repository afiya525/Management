import user from "../models/user.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
    try{
        const {
            name,
            email,
            mobile,
            username,
            password,
            role,
            specialization,
            dob,
            gender,
            address,
        } = req.body;

        const existingUser = await UserActivation.findOne({
            $or : [{email},{username}],
        });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await user.create({
            name,
            email,
            mobile,
            username,
            password: hashedPassword,
            role,
            specialization,
            dob,
            gender,
            address,
        });
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const getAllUsers = async (req,res) => {
    try{
        const users = await user.find().select("-password");

        res.json(users);
    } catch(error) { 
        res.status(500).json({
            message:error.message,
        });
    }
};

const getUserById = async (req,res) =>{
    try{
        const user = await user.findById(req.params.id).select("-password");

        if(!user){
            return res.status(404).json ({
                message : "User not found",
            });
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json ({
            message : error.message,
        });
    }
};

const updateUser = async (req,res) => {
    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new :true,
            }
        ).select("-password");

        if(!updatedUser) {
            return res.status(404).json ({
                message :"User not found",
            });
        }
        res.json(updatedUser);
    }
    catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};

const toggleUserStatus = async (req,res) => {
    try {
        const user = await user.findById(req.params.id);

        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        user.status = user.status === "Active"
        ? "Inactive"
        : "Active";

        await user.save();

        res.json({
            message : "Status Updated",
            status:user.status,
        });
    }
    catch(error){
        res.status(500).json ({
            message : error.message,
        });
    }
};

const deleteUser = async (req,res) => {
    try {
        const user = await user.findById(req.params.id);

        if(!user){
            return res.status(404).json ({
                message :"User not found",
            });
        }
        await user.deleteOne();

        res.json({
            message:"User deleted",
        });
    } catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

export {createUser,getAllUsers,getUserById,updateUser,toggleUserStatus,deleteUser,};