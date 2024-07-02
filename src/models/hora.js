import { DataTypes, Sequelize  } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Reserva } from "./reserva.model.js";

export const RangoDeHoraPorReserva = sequelize.define("RangoDeHoraPorReserva", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_reserva: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Reservas',
            key: 'id',
        }
    },
    hora: {
        type: Sequelize.STRING,
    }
});
