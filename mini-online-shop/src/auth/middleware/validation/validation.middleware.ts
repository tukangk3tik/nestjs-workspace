import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NextFunction } from 'express';
import { validate } from 'class-validator';

export const ValidationMiddleware = <TDto extends Type>(DtoClass: TDto) => {
  @Injectable()
  class ValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
      const dto = plainToInstance(DtoClass, req.body) as InstanceType<TDto>;
      const errors = await validate(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const errorMessages = errors.flatMap((error: Record<string, any>) =>
          Object.values(error.constraints),
        );
        throw new BadRequestException(errorMessages);
      }

      next();
    }
  }

  return ValidationMiddleware;
};
