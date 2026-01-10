import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/**
 * Database Configuration Registration
 * 
 * Uses NestJS ConfigModule's registerAs() to create a namespaced configuration object
 * for PostgreSQL database connection. This configuration is type-safe and validated against
 * TypeOrmModuleOptions, ensuring all required TypeORM options are properly defined.
 * 
 * The configuration can be used as a provider via .asProvider() method, making it easy
 * to inject into TypeOrmModule.forRootAsync().
 * 
 * Configuration properties:
 * - type: 'postgres' - Specifies PostgreSQL as the database type
 * - url: Database connection URL from DATASOURCE_URL environment variable
 * - autoLoadEntities: true - Automatically discovers and loads TypeORM entities
 * 
 * @returns {Object} Typed configuration object conforming to TypeOrmModuleOptions
 */
export default registerAs('database', () => {
  const config = {
    type: 'postgres',
    url: process.env.DATASOURCE_URL,
    autoLoadEntities: true,
  } as const satisfies TypeOrmModuleOptions;
  return config;
})