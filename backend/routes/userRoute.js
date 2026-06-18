import express from "express"
import {createuser, getAllusers, getUserById, updateUser, deleteUser} from "../controller/userController.js"
const route = express.Router();

route.post("/userin", createuser)
route.get("/userget", getAllusers)
route.get("/userget/:id", getUserById);
route.put("/update/user/:id", updateUser);
route.delete("/delete/user/:id", deleteUser);

export default route;