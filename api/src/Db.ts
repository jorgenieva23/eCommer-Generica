import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_NAME) {
  console.log(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME);

  throw new Error("Faltan variables de entorno de la base de datos");
}

export const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // Cambia esto a `true` si quieres ver las consultas
    native: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Esto es importante para Render o servicios que necesitan SSL
      },
    },
  }
);
