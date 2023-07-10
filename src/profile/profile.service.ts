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
    
  create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto)
    return this.profileRepository.save(profile);
  }

  findAll() {
    return this.profileRepository.find();
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOneBy({ id });
    
    if (!profile) throw new NotFoundException(`Profile with id: ${id} not found`)

    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.findOne(id)
    return this.profileRepository.save({ ...profile, ...updateProfileDto });
  }

  async remove(id: number) {
    const profile = await this.findOne(id)
    return this.profileRepository.remove(profile);
  }
}
