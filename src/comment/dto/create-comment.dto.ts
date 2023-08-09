import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCommentDto {

    @ApiProperty({ example: 'Random text posted by some user', description: 'Text of the comment' })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({ example: '222100', description: 'Id of the watchable under which the comment is posted' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    watchableId: number;
}
