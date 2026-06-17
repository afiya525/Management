import express from "express"
import {create} from "../controller/userController.js"

const route = express.Router();

route.post("/userin", create)

export default route;