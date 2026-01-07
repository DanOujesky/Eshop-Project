export class CustomerRepository {
  async findByEmail(email, conn) {
    const [[row]] = await conn.query(
      "SELECT * FROM customers WHERE email = ?",
      [email]
    );
    return row || null;
  }

  async create({ first_name, last_name, email }, conn) {
    const [res] = await conn.query(
      "INSERT INTO customers (first_name, last_name, email) VALUES (?, ?, ?)",
      [first_name, last_name, email]
    );
    return res.insertId;
  }
}
