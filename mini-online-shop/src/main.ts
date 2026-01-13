import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
   */
  app.enableCors();

  /**
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   */
  app.use(helmet());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;

  await app.listen(port);
}
bootstrap();
