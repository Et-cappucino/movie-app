import { GenreEnum } from "src/watchable/enums";
import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateFavoriteGenresDto {

    @ApiProperty({ example: GenreEnum.CRIME, enum: GenreEnum, description: 'Genre name' })
    @IsNotEmpty()
    @IsEnum(GenreEnum)
    genreEnum: GenreEnum;
}
