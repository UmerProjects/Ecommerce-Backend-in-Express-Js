import express from "express";
import adminProducts, { DeletedAdminProducts, updateAdminProducts } from "../Controllers/adminController.js";
import adminVerification from "../Middlewares.js/verifyAdmin.js";
import { getAdminProducts } from "../Controllers/adminController.js";




const admin = express.Router();

admin.post('/products',adminVerification, adminProducts)

admin.get('/products', adminVerification, getAdminProducts)

admin.put('/products/:id', adminVerification, updateAdminProducts)

admin.delete('/products/:id', adminVerification, DeletedAdminProducts)

export default admin;


