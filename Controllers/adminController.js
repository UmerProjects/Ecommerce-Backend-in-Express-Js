import Products from "../Models/PoductsModels.js";
import User from "../Models/userModels.js";

export default async function adminProducts(req, res) {
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
      status: "Succceeded",
      code: 200,
      data: { savedProducts },
      message: "Thanks for registering the products",
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      code: 500,
      message: "Internal Server Error in admin controllers",
    });
  }

  res.end();
}

export async function getAdminProducts(req, res) {
  let userId = req.user._id;

  let userRole = req.user.role;

  if(userRole !== "admin"){
    res.status(401).json({
      message: "Your role is not defined you are not authorized"
    })
  }

  let getProducts = await Products.find({ postedBy: userId });

  res.status(200).json({
    message: "OO ballay ballay oyy",
    data: { getProducts },
  });
}

export async function updateAdminProducts(req, res) {
  try {
    let { id } = req.params;

    const userId = req.user._id;

    let userRole = req.user.role;

    if(userRole !== "admin"){
      res.status(401).json({
        message: "Your role is not defined you are not authorized"
      })
    }
  

    const checkPostExist = await Products.findById(id);

    if (!checkPostExist) {
      return res.status(401).json({
        message: "The post you are updating is not existed",
      });
    }

    if (checkPostExist.postedBy.toString() !== userId.toString()) {
      return res.status(404).json({
        message: "You are not authorized to update this Product",
      });
    }

    const upddatePost = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!upddatePost) {
      return res.status(404).json({
        message: `Connot find any post using ${upddatePost}`,
      });
    }

    res.status(200).json({
      message: "Finally The put method is also working",
    });
  } catch (error) {
    res.status(401).json({
      message: "We Cannot do any Thing",
    });
  }
}

export async function DeletedAdminProducts(req, res) {
  try {
    let { id } = req.params;

    let userId = req.user._id;

    let userRole = req.user.role;

    if(userRole !== "admin"){
      res.status(401).json({
        message: "Your role is not defined you are not authorized"
      })
    }

    let product = await Products.findById(id);

    if (!product) {
      return res.status(401).json({
        message: "There is no product is present in this case",
      });
    }
    if (product.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this post",
      });
    }

    const deletingProducts = await Products.findByIdAndDelete(id);

    if (!deletingProducts) {
      return res.status(404).json({
        message: `Sorry we cannot deletig this product ${deletingProducts}`,
      });
    }

    res.status(200).json({
      message: "The Delete Post is also working Perfectly",
    });
  } catch (error) {
    res.status(401).json({
      message: "Sorry It is not working properly",
    });
  }
}
