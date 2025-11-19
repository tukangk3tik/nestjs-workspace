import {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

/**
 * AuthGuard is a custom guard that implements the CanActivate interface.
 * It checks if the user is authenticated by verifying the presence of userId in the session.
 * If userId exists, the request is allowed to proceed; otherwise, it is denied.
 */
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}