import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from "class-validator";

export class CreateRateDto {

    @Min(0)
    @Max(5)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    questionOneValue: number;

    @Min(0)
    @Max(5)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    questionTwoValue: number;

    @Min(0)
    @Max(5)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    questionThreeValue: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    profileId: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    watchableId: number;
}
