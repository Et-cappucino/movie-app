import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCommentDto {

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    commenterId: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    watchableId: number;
}
