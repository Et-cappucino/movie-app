import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {

    @IsNotEmpty()
    @IsString()
    firstName: String;

    @IsNotEmpty()
    @IsString()
    lastName: String;
}
