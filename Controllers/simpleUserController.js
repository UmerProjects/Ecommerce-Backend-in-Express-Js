import express from "express";
import Products from "../Models/PoductsModels.js";

export async function getTheProductsByUser(req, res) {
    let { id } = req.params;
  
    let userId = req.user._id;
  
    let userRole = req.user.role;
  
    if (userRole !== "user") {
      return res.status(403).json({
        message: "You role is not user, Are you hacking",
      });
    }
  
    let getProducts = await Products.find();
  
    res.status(200).json({
      message: "the product are getting",
      data: { getProducts },
    });
  }