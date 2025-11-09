import { conmysql as pool } from "../db.js";


export const postCompras = async (req, res) => {
  try {
    const { com_fecha, com_total, cli_id } = req.body;

    if (!com_fecha || !com_total || !cli_id) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const [result] = await pool.query(
      "INSERT INTO compras (com_fecha, com_total, cli_id) VALUES (?, ?, ?)",
      [com_fecha, com_total, cli_id]
    );

    res.status(201).json({ id: result.insertId, message: "Compra registrada correctamente" });
  } catch (error) {
    console.error("❌ Error en postCompras:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
