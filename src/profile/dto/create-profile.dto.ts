import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {

    @ApiProperty({ example: 'James' , description: 'First Name of the user in the profile' })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Bond' , description: 'Last Name of the user in the profile' })
    @IsNotEmpty()
    @IsString()
    lastName: string;
}
