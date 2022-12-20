import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import { Article } from "./entities/article";
import { Website } from "./entities/website";
import * as dotenv from "dotenv";

dotenv.config({path: join(__dirname, '../../.env.local')});

const appDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Article, Website],
    subscribers: [],
})

let dataSourceReadyPromise: Promise<void> | null = null;


export const getAppDataSource = async () => {
  if (!appDataSource.isInitialized) {
    await appDataSource.initialize();
  }

  return appDataSource;
};

// export const getAppDataSource = async () => {
//   initDataSource();
//   await dataSourceReadyPromise;
//   return appDataSource;
// };

export default appDataSource;