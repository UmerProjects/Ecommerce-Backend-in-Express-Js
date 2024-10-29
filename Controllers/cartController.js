import Cart from "../Models/cartModels.js";

import Products from "../Models/PoductsModels.js";

export default async function addToCart(req, res) {
  const { productId, quantity } = req.body;

  // console.log(productId);

  const userId = req.user._id;

  // console.log(userId);

  try {
    const product = await Products.findById(productId);

    // console.log(product);
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    // console.log(product);
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    // console.logl(cart);

    const productIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );

    console.log(productIndex);

    // console.log(productIndex);
    if (productIndex >= 0) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
      console.log("there is an error");
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * product.price,
      0
    );

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error in addTocaart" });
  }
}

export async function removeFromCart(req, res) {
  const { productId } = req.body;

  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart)
      return res.status(404).json({
        message: "Cart Not Found",
      });

    cart.items = cart.items.filter((item) => !item.product.equals(productId));

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

    await cart.save();

    res.status(200).json({
      message: `Product removed from cart`,
      data: {cart}
    });
  } catch (error) {}
}

export async function viewCartDetails(req, res) {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price"
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
