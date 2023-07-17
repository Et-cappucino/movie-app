import { GenreEnum } from "src/watchable/enums";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateFavoriteGenresDto {

    @IsNotEmpty()
    @IsEnum(GenreEnum)
    genreEnum: GenreEnum;
}
