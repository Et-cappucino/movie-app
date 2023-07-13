import { WatchableType } from "../enums";
import { IsString, IsEnum, IsNotEmpty, IsPositive, Min, Max, IsInt, IsNumber, IsOptional } from "class-validator";

export class CreateWatchableDto {

    @IsString()
    @IsNotEmpty()
    title: string; 

    @IsEnum(WatchableType)
    @IsNotEmpty()
    type: WatchableType;

    @IsOptional()
    releaseDate: Date;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    trailerLink: string;

    @Min(0)
    @Max(10)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    rating: number;

    @Min(0)
    @IsInt()
    @IsPositive()
    voteCount: number;

    @IsInt()    
    @IsNotEmpty()
    @IsPositive()
    duration: number;

    @IsString()
    posterPath: string;

    @IsString()
    mainBackdropPath: string;
}
