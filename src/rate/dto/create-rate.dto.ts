import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from "class-validator";

export class CreateRateDto {

    @ApiProperty({ example: '3.5', description: 'Rated value of the first question of the watchable' })
    @Min(0)
    @Max(5)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    questionOneValue: number;

    @ApiProperty({ example: '4.5', description: 'Rated value of the second question of the watchable' })
    @Min(0)
    @Max(5)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    questionTwoValue: number;

    @ApiProperty({ example: '5', description: 'Rated value of the third question of the watchable' })
    @Min(0)
    @Max(5)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    questionThreeValue: number;

    @ApiProperty({ example: '222100', description: 'Id of the watchable under which has been rated' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    watchableId: number;
}
