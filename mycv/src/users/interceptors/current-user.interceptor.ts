import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";

/**
 * This interceptor uses the @Injectable decorator to allow NestJS to manage its lifecycle and inject UsersService.
 * It should registred in UserModule providers array.
 * 
 * This interceptor allow @CurrentUser decorator to access the current user from the request object.
 */
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const user = this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return next.handle();
  }
}