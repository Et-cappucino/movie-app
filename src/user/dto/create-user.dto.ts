import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: String;

    @IsNotEmpty()
    @IsString()
    password: String;
    
    isAdmin: boolean;
}
