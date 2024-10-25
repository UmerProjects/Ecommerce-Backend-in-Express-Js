import express from "express";
import { getTheProductsByUser } from "../Controllers/simpleUserController.js";
import userVerification from "../Middlewares.js/verifySimpleUser.js";


const user = express.Router();

user.get('/products', userVerification, getTheProductsByUser)

export default user;