import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Categoria = sequelize.define('categoria', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT
    },
}, {
    // timestamps: false
});
