import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        url: process.env.DATASOURCE_URL,
        autoLoadEntities: true,
      })
    })
  ]
})
export class DatabaseModule {}