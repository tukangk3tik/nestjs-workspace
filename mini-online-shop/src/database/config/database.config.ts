import { registerAs } from "@nestjs/config";

/**
 * Database Configuration Registration
 * 
 * Uses NestJS ConfigModule's registerAs() to create a namespaced configuration object
 * for database settings. This allows the database configuration to be accessed globally
 * throughout the application via the ConfigService.
 * 
 * @function registerAs - Registers a configuration namespace ('database') with a factory function
 * @param {string} 'database' - The namespace key used to access this config (e.g., config.get('database').url)
 * @param {Function} () => {...} - Factory function that returns the configuration object
 * 
 * @returns {Object} Configuration object containing:
 *   - url: The database connection string from DATASOURCE_URL environment variable
 */
export default registerAs('database', () => ({
  url: process.env.DATASOURCE_URL,
}))