import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DataSource } from 'typeorm';
import { join } from 'path';

dotenvExpand.expand(dotenv.config());

const user = process.env.DATASOURCE_USERNAME;
const password = process.env.DATASOURCE_PASSWORD;
const host = process.env.DATASOURCE_HOST;
const port = process.env.DATASOURCE_PORT;
const database = process.env.DATASOURCE_DATABASE;

const url = `postgresql://${user}:${password}@${host}:${port}/${database}`;

export default new DataSource({
  type: 'postgres',
  url,
  // Point to compiled JS when using the CLI against dist/
  entities: [join(__dirname, '..', '**', 'entities', '*.entity.js')],
  migrations: [join(__dirname, 'migrations', '*.js')],
});