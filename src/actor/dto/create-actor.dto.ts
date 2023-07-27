import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateActorDto {

    @ApiProperty({ example: 'Ryan', description: 'FirstName of the actor' })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: 'Gosling', description: 'LastName of the actor' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: '1980-11-12', description: 'Birthdate of the actor', required: false })
    @IsOptional()
    birthDate: Date;

    @ApiProperty({ example: 'Ryan Thomas Gosling is a Canadian actor. Prominent in independent film, he has also worked in blockbuster films of varying genres, and has accrued a worldwide box office gross of over 1.9 billion USD. He has received various accolades, including a Golden Globe Award, and nominations for two Academy Awards and a BAFTA Award.', description: 'Bio of the actor', required: false })
    @IsString()
    @IsOptional()
    bio: string;

    @ApiProperty({ example: '/4X1wJo5xHm3YICPWZqVCPgLBEJ7.jpg', description: 'Image path of the actor', required: false })
    @IsString()
    @IsOptional()
    imagePath: string;
}
