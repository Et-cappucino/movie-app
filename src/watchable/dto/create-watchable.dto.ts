import { WatchableType } from "../enums";
import { IsString, IsEnum, IsNotEmpty, IsPositive, Min, Max, IsInt, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWatchableDto {

    @ApiProperty({ example: 'American Psycho', description: 'Title of the watchable' })
    @IsString()
    @IsNotEmpty()
    title: string; 

    @ApiProperty({ example: WatchableType.MOVIE, description: 'Type of the watchable' })
    @IsEnum(WatchableType)
    @IsNotEmpty()
    type: WatchableType;

    @ApiProperty({ example: '2000-04-14', description: 'Release date of the watchable', required: false })
    @IsOptional()
    releaseDate: Date;

    @ApiProperty({ example: 'A wealthy New York investment banking executive hides his alternate psychopathic ego from his co-workers and friends as he escalates deeper into his illogical, gratuitous fantasies.', description: 'Description of the watchable' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '5YnGhW4UEhc', description: 'Trailer link of the watchable' })
    @IsString()
    trailerLink: string;

    @ApiProperty({ example: 7.4, description: 'Rating of the watchable' })
    @Min(0)
    @Max(10)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    rating: number;

    @ApiProperty({ example: 3659, description: 'Vote count of the watchable' })
    @Min(0)
    @IsInt()
    @IsPositive()
    voteCount: number;

    @ApiProperty({ example: 102, description: 'Duration of the watchable' })
    @IsInt()    
    @IsNotEmpty()
    @IsPositive()
    duration: number;

    @ApiProperty({ example: '/9uGHEgsiUXjCNq8wdq4r49YL8A1.jpg', description: 'Poster path of the watchable' })
    @IsString()
    posterPath: string;

    @ApiProperty({ example: '/m0xdvPRlNjX0KbCwXFr9bBeSdqE.jpg', description: 'Main backdrop path  of the watchable' })
    @IsString()
    mainBackdropPath: string;
}
