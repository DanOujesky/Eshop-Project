import { pool } from "../db/db.js";

export class CategoryRepository {
  async exists(categoryId) {
    if (!categoryId) return false;

    const [[row]] = await pool.query(
      "SELECT id FROM valid_categories WHERE id = ?",
      [categoryId]
    );

    return !!row;
  }

  async findAll() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  }

  async findById(id) {
    const [[row]] = await pool.query("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);
    return row || null;
  }
}
