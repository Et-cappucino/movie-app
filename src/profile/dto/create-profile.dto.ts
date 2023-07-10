import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {

    @IsNotEmpty()
    @IsString()
    firstName: String;

    @IsNotEmpty()
    @IsString()
    lastName: String;
    
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: String;

    @IsNotEmpty()
    @IsString()
    password: String;
    
    isAdmin: boolean;
}
