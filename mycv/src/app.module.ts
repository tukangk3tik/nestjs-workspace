import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    /**
     * Database Configuration
     * Using SQLite for simplicity; in production, consider using PostgreSQL, MySQL, etc.
     * The 'synchronize: true' option is convenient for development but should be disabled in production.
     * Import all entities here to ensure TypeORM is aware of them.
     * 
     * Note: Using forRootAsync to leverage ConfigService for dynamic configuration
     */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'sqlite',
          database: configService.get<string>('DB_NAME'),
          entities: [
            User,
            Report,
          ],
          synchronize: true, // IMPORTANT: Disable in production
        }
      }
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * Global Validation Pipe
     * This ensures that all incoming requests are validated according to the DTOs defined in the application.
     * Need to apply in level module so it works in e2e tests as well.
     */
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['your-secret-key']
        })
      ).forRoutes('*'); // Apply to all routes (globally scoped middleware)
  }
}
