import { Role } from "../enum/role"

export type JwtPayload = {

    sub: number,
    
    email: string,

    role: Role
}