import { AdminService } from "../services/AdminService.js";

const adminService = new AdminService();

export const getReport = async (req, res) => {
  try {
    const report = await adminService.getReport();
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Chyba při generování reportu" });
  }
};
