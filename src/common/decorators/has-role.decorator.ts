import { SetMetadata } from "@nestjs/common";
import { Role } from "src/auth/enum/role";

export const HasRole = (role: Role) => SetMetadata('hasRole', role);