import { Restaurante } from "../models/restaurante.model.js";

export const getRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.findAll();
    res.json({
      data: restaurantes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los restaurantes",
      data: {},
    });
  }
};

export const createRestaurante = async (req, res) => {
    const { nombre, direccion } = req.body;
    try {
        let restaurante = await Restaurante.create(
        {
            nombre,
            direccion,
        },
        {
            fields: ["nombre", "direccion"],
        }
        );
        if (restaurante) {
        return res.json({
            message: "Restaurante creado correctamente",
            data: restaurante,
        });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: "Error al crear el restaurante",
        data: {},
        });
    }
    }

    export const getRestauranteById = async (req, res) => {
        const { id } = req.params;
        const restaurante = await Restaurante.findOne({
            where: {
                id,
            },
        });
        if (!restaurante) {
            return res.status(404).json({
                message: `Restaurante de id ${id} no existe`,
            });
        }
        res.json(restaurante);
    }

    export const deleteRestauranteById = async (req, res) => {
        const { id } = req.params;
        const deleteRowCount = await Restaurante.destroy({
            where: {
                id,
            },
        });
        if (deleteRowCount === 0) {
            res.status(404).json({
                message: `Restaurante de id ${id} no existe`,
            });
        } else {
            res.json({
                message: "Restaurante eliminado correctamente",
                count: deleteRowCount,
            });
        }
    }

    export const updateRestauranteById = async (req, res) => {
        const { id } = req.params;
        const { nombre, direccion } = req.body;
        const restaurantes = await Restaurante.findAll({
            attributes: ["id", "nombre", "direccion"],
            where: {
                id,
            },
        });
        if (restaurantes.length > 0) {
            restaurantes.forEach(async (restaurante) => {
                await restaurante.update({
                    nombre,
                    direccion,
                });
            });
        }
        return res.json({
            message: "Restaurante actualizado correctamente",
            data: restaurantes,
        });
    }