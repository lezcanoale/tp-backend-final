import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';


export const Restaurante = sequelize.define('restaurante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.TEXT,
  },
  direccion: {
    type: DataTypes.TEXT,
  },
});

/*
Restaurante.hasMany(Mesa, {
foreignKey: {
name: 'id_restaurante',
}
});
*/

