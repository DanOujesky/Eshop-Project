import { pool } from "../db/db.js";
export class OrderRepository {
  async create(customerId, conn) {
    const [res] = await conn.query(
      "INSERT INTO orders (customer_id, total_price,status, created_at) VALUES (?, 0,'ordered', NOW())",
      [customerId]
    );
    return res.insertId;
  }
  async countOrders(conn = pool) {
    const [rows] = await conn.query(
      "SELECT COUNT(*) as totalOrders, SUM(total_price) as totalRevenue FROM orders"
    );
    return {
      totalOrders: rows[0].totalOrders,
      totalRevenue: rows[0].totalRevenue || 0,
    };
  }

  async updateTotal(orderId, total, conn) {
    await conn.query("UPDATE orders SET total_price = ? WHERE id = ?", [
      total,
      orderId,
    ]);
  }
}
