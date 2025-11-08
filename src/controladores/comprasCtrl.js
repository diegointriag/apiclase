import { conmysql as pool } from "../db.js";


export const postCompra = async (req, res) => {
  try {
    const { cli_id, total, fecha, detalles } = req.body;

    const [result] = await pool.query(
      "INSERT INTO compras (cli_id, total, fecha) VALUES (?, ?, ?)",
      [cli_id, total, fecha]
    );

    const compraId = result.insertId;

    // Si hay detalles (productos de la compra)
    if (detalles && Array.isArray(detalles)) {
      for (const det of detalles) {
        await pool.query(
          "INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)",
          [compraId, det.producto_id, det.cantidad, det.precio]
        );
      }
    }

    res.json({ message: "Compra registrada", id: compraId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la compra" });
  }
};
