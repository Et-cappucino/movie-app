import { Entity, PrimaryColumn } from "typeorm";
import { GenreEnum } from "../enums";
import { ApiProperty } from "@nestjs/swagger";

@Entity('all_available_genres')
export class Genre {

    @ApiProperty()
    @PrimaryColumn({ type: 'varchar' })
    genre: GenreEnum;
}