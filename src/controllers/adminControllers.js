import { AdminService } from "../services/AdminService.js";
import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import xml2js from "xml2js";
import { config } from "../config/config.js";

const adminService = new AdminService();

const upload = multer({
  dest: config.upload.dir,
  limits: {
    fileSize: config.upload.maxImportSizeMB * 1024 * 1024,
  },
});

export const getReport = async (req, res) => {
  try {
    const report = await adminService.getReport();
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Chyba při generování reportu" });
  }
};
export const importProducts = [
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) throw new Error("Soubor nebyl nahrán");

      let products = [];
      const ext = file.originalname.split(".").pop().toLowerCase();

      if (ext === "json") {
        const data = fs.readFileSync(file.path, "utf-8");
        products = JSON.parse(data);
      } else if (ext === "csv") {
        products = [];
        fs.createReadStream(file.path)
          .pipe(csvParser())
          .on("data", (row) =>
            products.push({
              name: row.name,
              description: row.description,
              price: parseFloat(row.price),
              stock: parseInt(row.stock),
            })
          )
          .on("end", async () => {
            await adminService.importProducts(products);
            res.json({ message: "Produkty importovány" });
          });
        return;
      } else if (ext === "xml") {
        const data = fs.readFileSync(file.path, "utf-8");
        const parsed = await xml2js.parseStringPromise(data);
        products = parsed.products.product.map((p) => ({
          name: p.name[0],
          description: p.description[0],
          price: parseFloat(p.price[0]),
          stock: parseInt(p.stock[0]),
        }));
      } else {
        throw new Error("Nepodporovaný formát souboru");
      }

      await adminService.importProducts(products);
      res.json({ message: "Produkty importovány" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  },
];

export const importCustomers = [
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) throw new Error("Soubor nebyl nahrán");

      let customers = [];
      const ext = file.originalname.split(".").pop().toLowerCase();

      if (ext === "json") {
        const data = fs.readFileSync(file.path, "utf-8");
        customers = JSON.parse(data);
      } else if (ext === "csv") {
        customers = [];
        fs.createReadStream(file.path)
          .pipe(csvParser())
          .on("data", (row) =>
            customers.push({
              first_name: row.first_name,
              last_name: row.last_name,
              email: row.email,
            })
          )
          .on("end", async () => {
            await adminService.importCustomers(customers);
            res.json({ message: "Zákazníci importováni" });
          });
        return;
      } else if (ext === "xml") {
        const data = fs.readFileSync(file.path, "utf-8");
        const parsed = await xml2js.parseStringPromise(data);
        customers = parsed.customers.customer.map((c) => ({
          first_name: c.first_name[0],
          last_name: c.last_name[0],
          email: c.email[0],
        }));
      } else {
        throw new Error("Nepodporovaný formát souboru");
      }

      await adminService.importCustomers(customers);
      res.json({ message: "Zákazníci importováni" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  },
];
