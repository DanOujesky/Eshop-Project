import { ProductRepository } from "../repositories/ProductRepository.js";
import { OrderRepository } from "../repositories/OrderRepository.js";
import { OrderItemRepository } from "../repositories/OrderItemRepository.js";

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
}
