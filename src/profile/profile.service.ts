import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { Profile } from './entities/profile.entity';
import { PaginationService } from 'src/utils/pagination/pagaination.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly pagainationService: PaginationService
  ) {}
  
  save(profile: Profile) {
    return this.profileRepository.save(profile);
  }  
  
  create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto)
    return this.save(profile);
  }

  async findAll(pageNumber: number, pageSize: number) {
    const [profiles, count] = await this.profileRepository.findAndCount({
      skip: pageNumber * pageSize,
      take: pageSize
    });

    return this.pagainationService.paginate(profiles, pageNumber, pageSize, count);
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id }, 
      relations: {
        watchlist: true,
        favorites: true,
        favoriteGenres: true,
        profilePicture: true
      }
    });
    
    if (!profile) throw new NotFoundException(`Profile with id: ${id} not found`)

    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.findOne(id)
    return this.save({ ...profile, ...updateProfileDto });
  }

  async remove(id: number) {
    const profile = await this.findOne(id)
    return this.profileRepository.remove(profile);
  }
}
