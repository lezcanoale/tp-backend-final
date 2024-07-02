import { Producto } from "../models/productos.model.js";
import { Categoria } from "../models/categoria.model.js";

export const getProductos = async (req, res) => {
  const productos = await Producto.findAll();
  if (!productos) {
    return res.status(404).json({
      message: "No hay productos registrados",
    });
  }
  res.json({
    data: productos,
  });
};

export const createProductos = async (req, res) => {
  const {
    nombre_producto,
    categoriaId,
    precio,
  } = req.body;
  try {
    let newProducto = await Producto.create(
      {
        nombre_producto,
        categoriaId,
        precio,
      },
      {
        fields: [
          "nombre_producto",
          "categoriaId",
          "precio",
        ],
      }
    );
    if (newProducto) {
      return res.json({
        message: "Producto creado exitosamente",
        data: newProducto,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salio mal",
      data: {},
    });
  }
};

export const getProductosById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findOne({
      where: {
        id,
      },
    });
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({
        message: `No se encontró el producto con el ID ${id}`,
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salió mal",
      data: {},
    });
  }
};

export const deleteProductoById = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteRowCount = await Producto.destroy({
        where: {
          id,
        },
      });
      if (deleteRowCount === 0) {
        return res.json({
          message: "Producto no encontrado",
          count: deleteRowCount,
        });
      }
      res.json({
        message: "Producto eliminado exitosamente",
        count: deleteRowCount,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Algo salió mal",
        data: {},
      });
    }
  };
  

export const updateProductoById = async (req, res) => {
  const { id } = req.params;
  const {
    nombre_producto,
    categoriaId,
    precio,
  } = req.body;
  try {
    const productos = await Producto.findAll({
      attributes: [
        "id",
        "nombre_producto",
        "categoriaId",
        "precio",
      ],
      where: {
        id,
      },
    });
    if (productos.length > 0) {
      productos.forEach(async (producto) => {
        await producto.update({
          nombre_producto,
          categoriaId,
          precio,
        });
      });
      return res.json({
        message: "Producto actualizado exitosamente",
        data: productos,
      });
    } else {
      return res.status(404).json({
        message: "Producto no encontrado",
        data: mesas,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ocurrió un error al actualizar el producto",
      data: {},
    });
  }
};

export const getProductosByCategoria = async (req, res) => {
  const { categoria } = req.params;
  const productos = await Producto.findAll({
    attributes: [
      "id",
      "nombre_producto",
      "categoriaId",
      "precio",
    ],
    where: {
      categoria,
    },
  });
  res.json({
    data: productos,
  });
};
