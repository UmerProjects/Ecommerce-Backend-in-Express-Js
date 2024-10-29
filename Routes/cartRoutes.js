import express from "express";
import userVerification from "../Middlewares.js/verifySimpleUser.js";
import addToCart, { removeFromCart, viewCartDetails } from "../Controllers/cartController.js";

const cart = express.Router();

cart.post('/add', userVerification, addToCart)
cart.delete('/remove', userVerification, removeFromCart)
cart.get('/', userVerification, viewCartDetails)

export default cart;