import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>) {}
  
  save(profile: Profile) {
    return this.profileRepository.save(profile);
  }  
  
  create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto)
    return this.save(profile);
  }

  findAll() {
    return this.profileRepository.find({
      relations: {
        watchlist: true
      }
    });
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id }, 
      relations: {
        watchlist: true
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
