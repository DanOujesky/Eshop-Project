import { ProductRepository } from "../repositories/ProductRepository.js";
import { CategoryRepository } from "../repositories/CategoryRepository.js";

const productRepo = new ProductRepository();
const categoryRepo = new CategoryRepository();

export const getProducts = async (req, res) => {
  try {
    const products = await productRepo.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const product = await productRepo.findById(id);
    if (!product) return res.sendStatus(404);

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, available, categoryId, description } = req.body;

    if (!name || price == null || available == null) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const categoryValid = await categoryRepo.exists(categoryId);
    if (!categoryValid) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    await productRepo.create({
      name,
      price,
      available,
      categoryId,
      description,
    });
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, available, categoryId, description } = req.body;

    if (!name || price == null || available == null) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const categoryValid = await categoryRepo.exists(categoryId);
    if (!categoryValid) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    await productRepo.update(req.params.id, {
      name,
      price,
      available,
      categoryId,
      description,
    });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productRepo.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error při mazání produktu" });
  }
};
