import { ProductRepository } from "../repositories/ProductRepository.js";

const repo = new ProductRepository();

export const getProducts = async (req, res) => {
  res.json(await repo.findAll());
};
export const getProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const product = await repo.findById(id);
    if (!product) return res.sendStatus(404);

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, available, categoryId } = req.body;

  if (!name || price == null || !available) {
    return res.status(400).json({ error: "Neplatná data" });
  }

  await repo.create({ name, price, available, categoryId });
  res.sendStatus(201);
};

export const updateProduct = async (req, res) => {
  await repo.update(req.params.id, req.body);
  res.sendStatus(204);
};

export const deleteProduct = async (req, res) => {
  await repo.delete(req.params.id);
  res.sendStatus(204);
};
