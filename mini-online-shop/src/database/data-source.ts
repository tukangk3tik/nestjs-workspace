import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DataSource } from 'typeorm';
import { join } from 'path';

dotenvExpand.expand(dotenv.config());

export default new DataSource({
  type: 'postgres',
  url: process.env.DATASOURCE_URL,
  // Point to compiled JS when using the CLI against dist/
  entities: [join(__dirname, '..', '**', 'entities', '*.entity.js')],
  migrations: [join(__dirname, 'migrations', '*.js')],
});