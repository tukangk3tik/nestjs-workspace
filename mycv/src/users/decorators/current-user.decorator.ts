import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * A custom decorator to extract the current user from the request object.
 * createParamDecorator is a NestJS function that helps create decorators for method parameters.
 * 
 * ExecutionContext provides details about the current request being handled. 
 * Why using ExecutionContext instead of Request? Because it allows access to the underlying request object
 * across different contexts (HTTP, WebSocket, etc.).
 * 
 * `data` parameter is using never type here because we don't expect any data 
 * to be passed to this decorator.
 */
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  }
)