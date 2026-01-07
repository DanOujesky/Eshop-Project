import { OrderService } from "../services/OrderService.js";
import { createOrderSchema } from "../validation/orderSchema.js";

const orderService = new OrderService();

export const createOrder = async (req, res) => {
  try {
    const parseResult = createOrderSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Neplatná data",
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { userData, orderData } = parseResult.data;

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
