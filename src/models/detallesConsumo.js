import { DataTypes, Sequelize} from "sequelize";
import { sequelize } from "../database/database.js";

export const DetallesConsumo = sequelize.define("detallesConsumo", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idProducto: {
        type: DataTypes.INTEGER,
        references: {
            model: 'productos',
            key: 'id',
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
});
