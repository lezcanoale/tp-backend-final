import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Cliente = sequelize.define('cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.TEXT,
    },
    apellido: {
        type: DataTypes.TEXT,
    },
    cedula: {
        type: DataTypes.TEXT,
        unique: true,
    },
});