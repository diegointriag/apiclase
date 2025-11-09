import { conmysql } from "../db.js"

export const getProductos=
    async (req,res)=>{
        try {
            const [result]=await conmysql.query('select * from productos')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar clientes"})
         }
    }

export const getproductosxid= async(req, res)=>{
    try {
        const [result]=await conmysql.query('Select * from productos where prod_id=?',[req.params.id])
        if(result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Producto no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const postProducto = async (req, res) => {
  try {
    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;
    const prod_imagen = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("Datos del producto:", req.body);
    console.log("Archivo de imagen:", req.file);

    //  Verificar si el código ya existe antes de insertar
    const [existe] = await conmysql.query('SELECT * FROM productos WHERE prod_codigo = ?', [prod_codigo]);

    if (existe.length > 0) {
      return res.status(409).json({
        id: 0,
        message: 'Producto con código ' + prod_codigo + ' ya existe.',
      });
    }

    //  Insertar producto correctamente
    const [row] = await conmysql.query(
      'INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES (?, ?, ?, ?, ?, ?)',
      [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen]
    );

    res.json({
      id: row.insertId,
      message: 'Producto registrado correctamente.',
    });
  } catch (error) {
    console.error('Error en postProducto:', error);
    return res.status(500).json({ message: 'Error del lado del servidor' });
  }
};



export const putProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;

    // Si se sube una nueva imagen, la guardamos
    let prod_imagen = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    // Si no hay nueva imagen, buscar la imagen actual en la BD
    if (!req.file) {
      const [rows] = await conmysql.query(
        'SELECT prod_imagen FROM productos WHERE prod_id = ?',
        [id]
      );

      // Si el producto existe, conservar su imagen actual
      if (rows && rows.length > 0) {
        prod_imagen = rows[0].prod_imagen;
      } else {
        return res.status(404).json({
          message: 'Producto no encontrado'
        });
      }
    }

    // Actualizar los datos del producto
    const [result] = await conmysql.query(
      `UPDATE productos 
       SET prod_codigo = ?, prod_nombre = ?, prod_stock = ?, 
           prod_precio = ?, prod_activo = ?, prod_imagen = ? 
       WHERE prod_id = ?`,
      [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    // Devolver el producto actualizado
    const [rows] = await conmysql.query(
      'SELECT * FROM productos WHERE prod_id = ?',
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error('Error en putProducto:', error);
    return res.status(500).json({
      message: 'Error del lado del servidor'
    });
  }
};


export const patchProducto=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo}=req.body
        //const prod_imagen = req.file ? `/uploads/${req.file.filename}` :null; //capturar la imagen que se envie en un formulario
        //console.log("Datos del producto:",req.body);
        //console.log("Archivo de imagen:",req.file);
        //console.log(prod_nombre)
        const [result]=await conmysql.query('update productos set prod_codigo=IFNULL(?,prod_codigo), prod_nombre=IFNULL(?,prod_nombre), prod_stock=IFNULL(?,prod_stock), prod_precio=IFNULL(?,prod_precio), prod_activo=IFNULL(?,prod_activo), prod_imagen=IFNULL(?,prod_imagen) where prod_id=?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Producto no encontrado'
        })
        const[rows]=await conmysql.query('select * from productos where prod_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteProducto=
async(req, res)=>{
    try {
        const [rows]=await conmysql.query('delete from productos where prod_id=?',[req.params.id])
        if (rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message:"No pudo eliminar el producto"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({
            message:"Error del lado del servidor"
        })
    }
}