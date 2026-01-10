import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig from "./config/database.config";

/**
 * Database Module
 * 
 * Configures TypeORM for PostgreSQL database connection using asynchronous configuration.
 * This module imports the database configuration registered via registerAs() and uses it
 * to dynamically configure the TypeORM connection at application startup.
 * 
 * Key features:
 * - Async configuration: Loads config at runtime before TypeORM initializes
 * - Feature-scoped config: Imports databaseConfig as a feature module
 * - Environment-driven: Uses environment variables via ConfigType
 * - Auto-load entities: Automatically discovers and loads all TypeORM entities
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // Import the database config as a feature module to make it available
      imports: [ConfigModule.forFeature(databaseConfig)],
      // Inject the databaseConfig token to access the configuration values
      inject: [databaseConfig.KEY],
      // Factory function that receives the injected database config and returns TypeORM options
      useFactory: async (
        databaseConfigValues: ConfigType<typeof databaseConfig>,
      ) => ({
        // Database type: PostgreSQL
        type: 'postgres',
        // Connection URL from environment variable (DATASOURCE_URL)
        url: databaseConfigValues.url,
        // Automatically load all entities from the application
        autoLoadEntities: true,
      })
    })
  ]
})
export class DatabaseModule {}