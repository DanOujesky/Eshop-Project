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
}
