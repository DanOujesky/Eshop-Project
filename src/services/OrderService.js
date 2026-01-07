import { pool } from "../db/db.js";
import { ProductRepository } from "../repositories/ProductRepository";

export class OrderService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createOrder(customerId, items) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      const [orderResult] = await conn.query(
        "INSERT INTO orders (customer_id, total_price, created_at) VALUES (?, 0, NOW())",
        [customerId]
      );

      const orderId = orderResult.insertId;
      let totalPrice = 0;

      for (const item of items) {
        const product = await this.productRepo.findById(item.productId);

        if (!product) {
          throw new Error("Produkt neexistuje");
        }

        const price = product.price;
        totalPrice += price * item.quantity;

        await conn.query(
          "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
          [orderId, item.productId, item.quantity, price]
        );
      }

      await conn.query("UPDATE orders SET total_price = ? WHERE id = ?", [
        totalPrice,
        orderId,
      ]);

      await conn.commit();
      return { orderId, totalPrice };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
}
