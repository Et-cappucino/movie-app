import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateActorDto {

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsOptional()
    birthDate: Date;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    imagePath: string;
}
