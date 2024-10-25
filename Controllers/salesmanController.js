import Products from "../Models/PoductsModels.js";

export async function getTheProducts(req, res) {
  let { id } = req.params;

  let userId = req.user._id;

  let userRole = req.user.role;

  if (userRole !== "salesman") {
    return res.status(403).json({
      message: "You role is not salesman, Are you hacking",
    });
  }

  let getProducts = await Products.find();

  res.status(200).json({
    message: "the product are getting",
    data: { getProducts },
  });
}

export async function updateProductBySalesman(req, res) {
  try {
    let { id } = req.params;

    let userId = req.user._id;

    let userRole = req.user.role;

    if (userRole !== "salesman") {
      return res.status(403).json({
        message: "The salesman role is not yours are you hacker",
      });
    }

    let getProducts = await Products.findById(id);

    if (!getProducts) {
      return res.status(401).json({
        message: "There is no products like that, sorry for convenience",
      });
    }

    const updatePost = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatePost) {
      return res.status(401).json({
        message: "Sorry we cannot update this post salesman",
      });
    }

    res.status(200).json({
      message: "Finally, we updated this post",
      data: { updatePost },
    });
  } catch (error) {
    res.status(404).json({
      message: "We cannot update this post sorry",
      error: `The errro is ${error}`,
    });
  }
}
