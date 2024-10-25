import express from "express";
import adminProducts, { DeletedAdminProducts, getAllAdminProducts, updateAdminProducts } from "../Controllers/adminController.js";
import adminVerification from "../Middlewares.js/verifyAdmin.js";




const admin = express.Router();

admin.post('/products',adminVerification, adminProducts)

admin.get('/products', adminVerification, getAllAdminProducts)

admin.get('/products' , adminVerification)

admin.put('/products/:id', adminVerification, updateAdminProducts)

admin.delete('/products/:id', adminVerification, DeletedAdminProducts)

export default admin;


