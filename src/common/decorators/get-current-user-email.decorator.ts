import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';

export const GetCurrentUserEmail = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const user = request.user as JwtPayload;
    return user.email;
  }
)