import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtPayload } from "src/auth/types";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext) {

        const hasRole = this.reflector.getAllAndOverride('hasRole', [
            context.getHandler(),
            context.getClass()
        ])

        if (!hasRole) return true;
        
        const http = context.switchToHttp();
        const request = http.getRequest();
        const user = request.user as JwtPayload;

        return hasRole === user.role
    }
}