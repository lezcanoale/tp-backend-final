import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Consumo = sequelize.define('consumo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idMesa: {
        type: DataTypes.INTEGER,
        references: {
            model: 'mesas',
            key: 'id',
        }
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'id',
        }
    },
    estado: {
        type: DataTypes.TEXT,
    },
    total: {
        type: DataTypes.INTEGER,
    },
    fechaCreacion: {
        type: DataTypes.DATE,
    },
    horaCreacion: {
        type: DataTypes.TIME,
    },
    fechaCierre: {
        type: DataTypes.DATE,
        allowNull: true, // Permite que la propiedad sea nula
    },
    horaCierre: {
        type: DataTypes.TIME,
        allowNull: true, // Permite que la propiedad sea nula
    },
    detallesConsumoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'detallesConsumos',
            key: 'id',
        }
    },
});
