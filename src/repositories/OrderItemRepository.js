export class OrderItemRepository {
  async create({ orderId, productId, quantity, price }, conn) {
    await conn.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, productId, quantity, price]
    );
  }
}
