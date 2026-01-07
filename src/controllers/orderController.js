import { OrderService } from "../services/OrderService.js";

const orderService = new OrderService();

export const createOrder = async (req, res) => {
  try {
    const { userData, orderData } = req.body;

    const result = await orderService.createOrder(userData, orderData);

    res.status(201).json({
      message: "Objednávka vytvořena",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
