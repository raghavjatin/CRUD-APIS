import { createConnection, Connection, ConnectionOptions } from "typeorm";
// eslint-disable-next-line import/no-extraneous-dependencies
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import path from "path";
import {
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_LOGGING,
} from "../config/secret";

export class DBConnection {
  public static conn: Connection;

  public static async databaseConnection(): Promise<void> {
    const dbConfig: ConnectionOptions = {
      type: "postgres",
      host: TYPEORM_HOST,
      port: Number(TYPEORM_PORT),
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      entities: [path.join(`${__dirname}/model/*.{js,ts}`)],
      migrations: [path.join(`${__dirname}/migration/**/*{.ts,.js}`)],
      // migrations: ["src/database/migration/**/*{.ts,.js}"],
      synchronize: true,
      logging: Boolean(TYPEORM_LOGGING), // true => make it to true to log the sql queries
      namingStrategy: new SnakeNamingStrategy(),
      cli: {
        entitiesDir: "src/database/model",
        migrationsDir: "src/database/migration",
      },
    };

    return createConnection(dbConfig)
      .then((connection) => {
        this.conn = connection;
        // console.log("Connected to DB");
      })
      .catch((error) => {
        // console.log("Not Connected to DB");
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  public static closeConnection(): Promise<void> {
    return this.conn.close();
  }
}
