import { ExpressValidator } from "express-validator";
import Products from "../Models/PoductsModels.js";


export default async function managerProducts(req, res) {
    const { name, description, price, category, stock } = req.body;
  
    try {
      const existingName = await Products.findOne({ name });
  
      if (existingName) {
        return res.status(400).json({
          status: "Failed",
          message: "It seems the title is already presents",
        });
      }
      // Create an instance of the product
  
      const newProduct = new Products({
        name,
        description,
        price,
        category,
        stock,
        postedBy: req.user._id,
      });
  
      const savedProducts = await newProduct.save();
  
      res.status(200).json({
        status: "Succceeded You Post The Product As a Manager",
        code: 200,
        data: { savedProducts },
        message: "Thanks for registering the products as a Manager",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error in manager controllers",
      });
    }
  
    res.end();
  }

export async function getManagerProducts(req, res) {
    let userId = req.user._id;
  
    let userRole = req.user.role;
  
    if(userRole !== "manager"){
      return res.status(401).json({
        message: "Your role is not Manager you are not authorized"
      })
    }
  
    let getProducts = await Products.find({ postedBy: userId });
  
    res.status(200).json({
      message: "OO ballay ballay oyy",
      data: { getProducts },
    });
  }

export async function updateManagerProducts (req, res) {

    try {

    let { id } = req.params;

    let userId = req.user._id;

    let userRole = req.user.role;

    if(userRole !== "manager"){
        res.status(403).json({
            message: "Forbidden, You are not allowed to access this request as a manage"
        })
    }

    const checkPostExist = await Products.findById(id);

    if(!checkPostExist){
        return res.status(401).json({
            message: "There is no such Post exis, Are you sure you are a manager"
        })
    }

    if(checkPostExist.postedBy.toString() !== userId.toString()){
        return res.status(401).json({
            message: "I think you are hacking this"
        })
    }

    const updatePost = await  Products.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })

    if(!updatePost){
        return res.status(404).json({
            message: "Sorry we cannot update this post"
        })
    }

    res.status(200).json({
        message: "Finally, We updated this post",
        data: {updatePost}
    })
}
    catch (error) {
        res.status(404).json({
            message: "We cannot update this post sorry",
            error: `The errro is ${error}`
        })
    }
}




  

