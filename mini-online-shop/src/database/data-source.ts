import { DataSource } from 'typeorm';
import { join } from 'path';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'shop1234',
  database: 'mini-online-shop',
  // Point to compiled JS when using the CLI against dist/
  entities: [join(__dirname, '..', '**', 'entities', '*.entity.js')],
  migrations: [join(__dirname, 'migrations', '*.js')],
});