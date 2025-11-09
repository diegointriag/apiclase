import { conmysql } from "../db.js";

// ✅ Obtener todos los clientes
export const getobetenerClientes = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM clientes");
    res.json({ cant: result.length, data: result });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los clientes",
      error: error.message,
    });
  }
};

// ✅ Obtener cliente por ID
export const getClientesxId = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "SELECT * FROM clientes WHERE cli_id = ?",
      [req.params.id]
    );
    if (result.length <= 0)
      return res.status(404).json({
        cli_id: 0,
        message: "Cliente no encontrado",
      });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el cliente",
      error: error.message,
    });
  }
};

// ✅ 🔍 Obtener cliente por CÉDULA
export const getClientePorCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    const [result] = await conmysql.query(
      "SELECT * FROM clientes WHERE cli_identificacion = ?",
      [cedula]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener cliente por cédula",
      error: error.message,
    });
  }
};

// ✅ Insertar nuevo cliente
export const postClientes = async (req, res) => {
  try {
    const {
      cli_identificacion,
      cli_nombre,
      cli_telefono,
      cli_correo,
      cli_direccion,
      cli_pais,
      cli_ciudad,
    } = req.body;

    const [result] = await conmysql.query(
      "INSERT INTO clientes(cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        cli_identificacion,
        cli_nombre,
        cli_telefono,
        cli_correo,
        cli_direccion,
        cli_pais,
        cli_ciudad,
      ]
    );
    res.send({ id: result.insertId });
  } catch (error) {
    return res.status(500).json({
      message: "Error al insertar cliente",
      error: error.message,
    });
  }
};

// ✅ Actualizar cliente (PUT)
export const putClientes = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cli_identificacion,
      cli_nombre,
      cli_telefono,
      cli_correo,
      cli_direccion,
      cli_pais,
      cli_ciudad,
    } = req.body;

    const [result] = await conmysql.query(
      "UPDATE clientes SET cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_pais=?, cli_ciudad=? WHERE cli_id=?",
      [
        cli_identificacion,
        cli_nombre,
        cli_telefono,
        cli_correo,
        cli_direccion,
        cli_pais,
        cli_ciudad,
        id,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Cliente no encontrado" });

    const [row] = await conmysql.query(
      "SELECT * FROM clientes WHERE cli_id=?",
      [id]
    );
    res.json(row[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar cliente",
      error: error.message,
    });
  }
};

// ✅ Eliminar cliente
export const deleteClientes = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM clientes WHERE cli_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "No se encontró el cliente",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el cliente",
      error: error.message,
    });
  }
};


