
import {Categoria} from '../models/categoria.model.js';

export const getCategorias = async (req, res) => {
    const categorias = await Categoria.findAll();
    if (!categorias) {
        return res.status(404).json({
            message: 'No hay categorias registradas'
        });
    }
    res.json({
        data: categorias
    });
}

export const createCategoria = async (req, res) => {
    const { nombre } = req.body;
    try {
        const categoria = await Categoria.create({
            nombre
        }, {
            fields: ['nombre']
        });
        if (categoria) {
            return res.json({
                message: 'Categoria creada correctamente',
                data: categoria
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al crear la categoria',
            data: {}
        });
    }
}

export const getCategoriaById = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findOne({
        where: {
            id
        }
    });
    if (!categoria) {
        return res.status(404).json({
            message: `Categoria de id ${id} no existe`
        });
    }
    res.json(categoria);
}

export const deleteCategoriaById = async (req, res) => {
    const { id } = req.params;
    const deleteRowCount = await Categoria.destroy({
        where: {
            id
        }
    });
    if (deleteRowCount === 0) {
        res.status(404).json({
            message: `Categoria de id ${id} no existe`
        });
    } else {
        res.json({
            message: 'Categoria eliminada correctamente',
            count: deleteRowCount
        });
    }
}

export const updateCategoriaById = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const categorias = await Categoria.findAll({
        attributes: ['id', 'nombre'],
        where: {
            id
        }
    });
    if (categorias.length > 0) {
        categorias.forEach(async categoria => {
            await categoria.update({
                nombre
            });
        });
    }
    return res.json({
        message: 'Categoria actualizada correctamente',
        data: categorias
    });
}

