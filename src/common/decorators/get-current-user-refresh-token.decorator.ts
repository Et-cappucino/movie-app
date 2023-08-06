import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRefreshToken } from 'src/auth/types';

export const GetCurrentUserRefreshToken = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const user = request.user as JwtPayloadWithRefreshToken;
    return user.refreshToken;
  }
)