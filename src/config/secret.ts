import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const {
  ENVIRONMENT,
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT,
  TYPEORM_LOGGING,
  TYPEORM_ENTITIES,
  TYPEORM_ENTITIES_DIR,
  TYPEORM_MIGRATIONS,
  TYPEORM_MIGRATIONS_DIR,
  PORT,
} = process.env;
