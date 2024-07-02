import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Restaurante } from "./restaurante.model.js";

export const Mesa = sequelize.define('mesa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_mesa: {
        type: DataTypes.TEXT,
    },
    restauranteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Restaurante ,
            key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    posicion_x: {
        type: DataTypes.INTEGER,
    },
    posicion_y: {
        type: DataTypes.INTEGER,
    },
    nro_piso: {
        type: DataTypes.INTEGER,
    },
    capacidad: {
        type: DataTypes.INTEGER,
    },

    ocupado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

