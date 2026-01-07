import { pool } from "../db/db.js";
import { CustomerRepository } from "../repositories/CustomerRepository.js";
import { ProductRepository } from "../repositories/ProductRepository.js";
import { OrderRepository } from "../repositories/OrderRepository.js";
import { OrderItemRepository } from "../repositories/OrderItemRepository.js";

export class OrderService {
  constructor() {
    this.customerRepo = new CustomerRepository();
    this.productRepo = new ProductRepository();
    this.orderRepo = new OrderRepository();
    this.orderItemRepo = new OrderItemRepository();
  }

  async createOrder(userData, cartItems) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      let customer = await this.customerRepo.findByEmail(userData.email, conn);

      let customerId;
      if (!customer) {
        customerId = await this.customerRepo.create(userData, conn);
      } else {
        customerId = customer.id;
      }

      const orderId = await this.orderRepo.create(customerId, conn);

      let totalPrice = 0;

      for (const item of cartItems) {
        const product = await this.productRepo.findById(item.id, conn);

        if (!product) {
          throw new Error(`Produkt ${item.id} neexistuje`);
        }

        totalPrice += product.price * item.quantity;

        await this.orderItemRepo.create(
          {
            orderId,
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
          },
          conn
        );
      }

      await this.orderRepo.updateTotal(orderId, totalPrice, conn);

      await conn.commit();

      return { orderId, totalPrice };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
}
