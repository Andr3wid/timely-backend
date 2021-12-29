import { Model, Sequelize } from "sequelize";
import { logger } from "./LoggingService";
import { exit } from "process";

export const sequelize = new Sequelize({
  dialect: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_SECRET,
  database: process.env.DB_NAME,
});

sequelize
  .authenticate()
  .then(() => {
    logger.info("DB connection successful!");
  })
  .catch((err) => {
    logger.error(
      `Error while connecting to database:\n${err}\nShutting down service ...`
    );
    exit(1);
  });
