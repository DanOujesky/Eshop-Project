import { ProductRepository } from "../repositories/ProductRepository.js";

const repo = new ProductRepository();

export const getProducts = async (req, res) => {
  res.json(await repo.findAll());
};

export const createProduct = async (req, res) => {
  await repo.create(req.body);
  res.sendStatus(201);
};


