import { pool } from "../db/db.js";

export class ProductRepository {
  async findAll() {
    const [rows] = await pool.query("select * from products");
    return rows;
  }
  async create(product) {
    await pool.query(
      "insert into products (name, price, available, category_id) values (?, ?, ?, ?)",
      [product.name, product.price, product.available, product.categoryId]
    );
  }
  async findById(id, conn) {
    const [[row]] = await conn.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return row || null;
  }
  async countProducts(conn = pool) {
    const [rows] = await conn.query(
      "SELECT COUNT(*) as totalProducts FROM products"
    );
    return rows[0].totalProducts;
  }
}
