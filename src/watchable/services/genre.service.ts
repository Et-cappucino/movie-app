import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../entities';
import { GenreEnum } from '../enums';

@Injectable()
export class GenreService implements OnModuleInit {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) {}

  async onModuleInit() {
    await this.saveAllGenres()
  }   

  private async saveAllGenres() {
    const genresToSave = Object.values(GenreEnum);

    const genreEntities = [];
    for (const genre of genresToSave) {
        const existingGenre = await this.genreRepository.findOneBy({ genre });
        
        if (!existingGenre) {
            const genreEntity = new Genre();
            genreEntity.genre = genre;
            genreEntities.push(genreEntity);
        }
    }

    await this.genreRepository.save(genreEntities);
  }
}
