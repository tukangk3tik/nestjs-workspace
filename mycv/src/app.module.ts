import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    /**
     * Database Configuration
     * Using SQLite for simplicity; in production, consider using PostgreSQL, MySQL, etc.
     * The 'synchronize: true' option is convenient for development but should be disabled in production.
     * Import all entities here to ensure TypeORM is aware of them.
     */
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [
        User,
        Report,
      ],
      synchronize: true, // IMPORTANT: Disable in production
    }), 
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
