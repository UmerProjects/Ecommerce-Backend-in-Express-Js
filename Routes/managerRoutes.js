import express from "express";
import verifyManager from "../Middlewares.js/verifyManager.js";
import managerProducts, { getManagerProducts, updateManagerProducts } from "../Controllers/managerController.js";


const manager = express.Router()

manager.post('/products', verifyManager, managerProducts)
manager.get('/products', verifyManager, getManagerProducts)
manager.put('/products/:id', verifyManager, updateManagerProducts)

export default manager;