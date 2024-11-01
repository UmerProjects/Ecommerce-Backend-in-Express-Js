import Order from "../Models/orders.js";
import Product from "../Models/PoductsModels.js";

export const createOrder = async (req, res) => {
  const { items } = req.body;
  const userId = req.user._id;

  try {
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}. Available stock: ${product.stock}`,
        });
      }

      totalPrice += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
      });
    }

    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    
    const order = new Order({
      user: userId,
      items: orderItems,
      totalPrice,
    });
    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};


export const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    

    try{

        const order = await Order.findById(orderId);

        console.log(order);

        if(!order){
            return res.status(404).json({
                message: "Order Not Found"
            })
        }

        if(order.status !== "Successful"){
            return res.status(400).json({
                message: "Only pending orders can be cancelled "
            })
        }

        for(const item of order.items){
            await Product.findByIdAndUpdate(item.product, {
                new: true,
                $inc: {stock: item.quantity},
            })
        }

        order.status = "Cancelled";
        await order.save();

        res.status(200).json({
            message: "Yours order cancelled succesfully",
            data: {order}
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to cancel the order, Please try again"
        })
    }
}