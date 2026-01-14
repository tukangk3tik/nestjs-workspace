import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator<unknown, any>(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request as any).user;
  },
);
