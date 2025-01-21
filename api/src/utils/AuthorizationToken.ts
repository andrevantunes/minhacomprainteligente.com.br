import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthorizationToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new Error('Authorization header not found');
    return authHeader.split(' ')[1];
  },
);
