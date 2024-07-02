import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
      preferNative: true,
      supportBigNumbers: true,
      bigNumberStrings: true,
      application_name: "restaurante",
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  }
);
