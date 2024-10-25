import express from "express";
import verifySalesman from "../Middlewares.js/verifySalesman.js";
import { getTheProducts, updateProductBySalesman } from "../Controllers/salesmanController.js";

const salesMan = express.Router();


salesMan.get('/products', verifySalesman, getTheProducts);
salesMan.put('/products/:id', verifySalesman, updateProductBySalesman);

export default salesMan;


