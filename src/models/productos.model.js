import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Categoria } from "./categoria.model.js";

export const Producto = sequelize.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_producto: {
        type: DataTypes.TEXT,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria ,
            key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    precio: {
        type: DataTypes.INTEGER,
    },
});

