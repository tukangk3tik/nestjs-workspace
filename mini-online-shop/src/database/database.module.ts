import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig from "./config/database.config";

/**
 * Database Module
 * 
 * Initializes TypeORM with asynchronous configuration for PostgreSQL database connection.
 * Uses the databaseConfig.asProvider() method to cleanly provide configuration to TypeOrmModule.
 * 
 * Key features:
 * - Async initialization: Configuration is resolved at runtime before TypeORM starts
 * - Type-safe config: Uses TypeOrmModuleOptions for compile-time validation
 * - Environment-driven: Reads DATASOURCE_URL from environment variables
 * - Auto-load entities: TypeORM automatically discovers and loads all entities
 * - Simplified setup: Uses .asProvider() for cleaner dependency injection
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig.asProvider())
  ]
})
export class DatabaseModule {}