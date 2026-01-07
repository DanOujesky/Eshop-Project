import { pool } from "../db/db.js";

export class OrderItemRepository {
  async create({ orderId, productId, quantity, price }, conn) {
    await conn.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, productId, quantity, price]
    );
  }
  async getTopProduct(conn = pool) {
    const [rows] = await conn.query(`
      SELECT p.name, SUM(oi.quantity) as sold
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      GROUP BY oi.product_id
      ORDER BY sold DESC
      LIMIT 1
    `);
    return rows[0] || null;
  }
}
