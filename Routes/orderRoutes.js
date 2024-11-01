import express from "express";
import userVerification from "../Middlewares.js/verifySimpleUser.js";
import { cancelOrder, createOrder } from "../Controllers/orderController.js";

const order = express.Router();

order.post("/create", userVerification, createOrder);
order.put("/cancel/:orderId", userVerification, cancelOrder);

export default order;
