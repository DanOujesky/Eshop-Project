import { ProductRepository } from "../repositories/ProductRepository.js";
import { OrderRepository } from "../repositories/OrderRepository.js";
import { OrderItemRepository } from "../repositories/OrderItemRepository.js";
import { CustomerRepository } from "../repositories/CustomerRepository.js";
import { pool } from "../db/db.js";

export class AdminService {
  constructor() {
    this.productRepo = new ProductRepository();
    this.orderRepo = new OrderRepository();
    this.orderItemRepo = new OrderItemRepository();
  }

  async getReport() {
    const totalProducts = await this.productRepo.countProducts();
    const { totalOrders, totalRevenue } = await this.orderRepo.countOrders();
    const topProductRow = await this.orderItemRepo.getTopProduct();

    return {
      totalProducts,
      totalOrders,
      totalRevenue,
      topProduct: topProductRow?.name || null,
    };
  }

  async importProducts(products) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await this.productRepo.createMany(products, conn);
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async importCustomers(customers) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await this.customerRepo.createMany(customers, conn);
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
}
