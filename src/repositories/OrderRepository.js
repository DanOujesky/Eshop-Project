export class OrderRepository {
  async create(customerId, conn) {
    const [res] = await conn.query(
      "INSERT INTO orders (customer_id, total_price,status, created_at) VALUES (?, 0,'ordered', NOW())",
      [customerId]
    );
    return res.insertId;
  }

  async updateTotal(orderId, total, conn) {
    await conn.query("UPDATE orders SET total_price = ? WHERE id = ?", [
      total,
      orderId,
    ]);
  }
}
