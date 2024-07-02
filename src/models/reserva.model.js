import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Restaurante } from "./restaurante.model.js";
import { Cliente } from "./cliente.model.js";
import { Mesa } from "./mesa.model.js";


export const Reserva = sequelize.define("Reserva", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'id',
        }
    },
    id_restaurante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Restaurante ,
            key: 'id',
        }
    },
    id_mesa: {
        type: DataTypes.INTEGER,
        references: {
            model: Mesa,
            key: 'id',
        }
    },
    fecha: {
        type: Sequelize.DATE
    },
    cantidad: {
        type: Sequelize.INTEGER
    },
});