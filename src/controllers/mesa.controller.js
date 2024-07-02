import { Mesa } from "../models/mesa.model.js";
import { Restaurante } from "../models/restaurante.model.js";

export const getMesas = async (req, res) => {
  const mesas = await Mesa.findAll();
  if (!mesas) {
    return res.status(404).json({
      message: "No hay mesas registradas",
    });
  }
  res.json({
    data: mesas,
  });
};

export const createMesa = async (req, res) => {
  const {
    nombre_mesa,
    restauranteId,
    posicion_x,
    posicion_y,
    nro_piso,
    capacidad,
  } = req.body;
  try {
    let newMesa = await Mesa.create(
      {
        nombre_mesa,
        restauranteId,
        posicion_x,
        posicion_y,
        nro_piso,
        capacidad,
      },
      {
        fields: [
          "nombre_mesa",
          "restauranteId",
          "posicion_x",
          "posicion_y",
          "nro_piso",
          "capacidad",
        ],
      }
    );
    if (newMesa) {
      return res.json({
        message: "Mesa creada exitosamente",
        data: newMesa,
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

export const getMesaById = async (req, res) => {
  const { id } = req.params;
  try {
    const mesa = await Mesa.findOne({
      where: {
        id,
      },
    });
    if (mesa) {
      res.json(mesa);
    } else {
      res.status(404).json({
        message: `No se encontró la mesa con el ID ${id}`,
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

export const deleteMesaById = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteRowCount = await Mesa.destroy({
        where: {
          id,
        },
      });
      if (deleteRowCount === 0) {
        return res.json({
          message: "Mesa no encontrada",
          count: deleteRowCount,
        });
      }
      res.json({
        message: "Mesa eliminada exitosamente",
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
  

export const updateMesaById = async (req, res) => {
  const { id } = req.params;
  const {
    nombre_mesa,
    restauranteId,
    posicion_x,
    posicion_y,
    nro_piso,
    capacidad,
  } = req.body;
  try {
    const mesas = await Mesa.findAll({
      attributes: [
        "id",
        "nombre_mesa",
        "restauranteId",
        "posicion_x",
        "posicion_y",
        "nro_piso",
        "capacidad",
      ],
      where: {
        id,
      },
    });
    if (mesas.length > 0) {
      mesas.forEach(async (mesa) => {
        await mesa.update({
          nombre_mesa,
          restauranteId,
          posicion_x,
          posicion_y,
          nro_piso,
          capacidad,
        });
      });
      return res.json({
        message: "Mesa actualizada exitosamente",
        data: mesas,
      });
    } else {
      return res.status(404).json({
        message: "Mesa no encontrada",
        data: mesas,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ocurrió un error al actualizar la mesa",
      data: {},
    });
  }
};

export const getMesasByRestaurante = async (req, res) => {
  const { restauranteId } = req.params;
  const mesas = await Mesa.findAll({
    attributes: [
      "id",
      "nombre_mesa",
      "restauranteId",
      "posicion_x",
      "posicion_y",
      "nro_piso",
      "capacidad",
      "ocupado",
    ],
    where: {
      restauranteId,
    },
  });
  res.json({
    data: mesas,
  });
};

