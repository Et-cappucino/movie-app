import { Entity, PrimaryColumn } from "typeorm";
import { GenreEnum } from "../enums";

@Entity('all_available_genres')
export class Genre {

    @PrimaryColumn({ type: 'varchar' })
    genre: GenreEnum;
}