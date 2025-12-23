import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'shop1234',
      database: 'mini-online-shop',
      autoLoadEntities: true,
    })
  ]
})
export class DatabaseModule {}