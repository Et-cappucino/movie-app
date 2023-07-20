import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ example: 'jamesbond@gmail.com', description: 'Email of the user' })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ example: '12345678', description: 'Password of the user' })
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiProperty({ required: false, description: 'Is the user an admin or not' })
    @IsOptional()
    isAdmin: boolean;
}
