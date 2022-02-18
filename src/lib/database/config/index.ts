import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";
import env from "../../../config";

export interface TypeOrmConfigIE {
  [index: string]: MongoConnectionOptions;
}

/**
 * Typeorm Mongo config
 */
export const mongoConfig: TypeOrmConfigIE = {
  dev: {
    name: "dev",
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    username: "root",
    password: env.mongoPassword,
    database: "localDB",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  production: {
    name: "production",
    type: "mongodb",
    host: "",
    port: undefined,
    username: "",
    password: "",
    database: "",
    synchronize: false,
    logging: true,
    entities: ["src/models/**/*.ts"],
    migrationsTableName: "migrations",
    cli: {
      entitiesDir: "src/models/**/*.ts",
      // migrationsDir: "src/migration",
      // subscribersDir: "src/subscriber",
    },
  },
};
