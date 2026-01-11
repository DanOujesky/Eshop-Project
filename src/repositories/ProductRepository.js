import { pool } from "../db/db.js";

export class ProductRepository {
  async findAll() {
    const [rows] = await pool.query("select * from product_with_category");
    return rows;
  }
  async create(product) {
    await pool.query(
      "insert into products (name, price, available, category_id) values (?, ?, ?, ?)",
      [product.name, product.price, product.available, product.categoryId]
    );
  }
  async findById(id) {
    const [[row]] = await pool.query("SELECT * FROM products WHERE id = ?", [
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
  async createMany(products, conn = pool) {
    for (const p of products) {
      await conn.query(
        "INSERT INTO products (name, description, price, available, category_id) VALUES (?, ?, ?, ?, ?)",
        [p.name, p.description, p.price, p.available ? 1 : 0, p.categoryId]
      );
    }
  }

  async update(id, product) {
    await pool.query(
      "UPDATE products SET name=?, price=?, available=?, category_id=? WHERE id=?",
      [product.name, product.price, product.available, product.categoryId, id]
    );
  }

  async delete(id) {
    await pool.query("DELETE FROM products WHERE id=?", [id]);
  }
}
