import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

/**
 * Interface for class constructor
 * This is useful for type checking and ensuring that the DTOs passed to the interceptor are valid classes
 * This interface will return error before the program runs if the dto is not a class
 * @interface ClassConstructor
 */
interface ClassConstructor {
  new (...args: any[]): {};
}

/**
 * Decorator function to apply the SerializeInterceptor to a route handler
 * @param dto 
 * @returns 
 */
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * This interceptor is for run some logic before a request is handled by the request handler
 * and/or after the request has been handled by the request handler
 * In this case, we are using it to transform the response data before sending it back to the client
 */
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  
  intercept(context: ExecutionContext, handler: CallHandler) : Observable<any>  {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, { excludeExtraneousValues: true });
      }),
    )
  }
}