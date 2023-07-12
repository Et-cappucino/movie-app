import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly profileService: ProfileService
  ) {}
  
  async signUp(createUserDto: CreateUserDto) {
    await this.validateEmailUnique(createUserDto.email);

    const profile = await this.profileService.create(new Profile())
    
    const user = this.userRepository.create(createUserDto)
    user.profile = profile
    
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: {
        profile: true
      }
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true
      }
    });
    
    if (!user) throw new NotFoundException(`User with id: ${id} not found`)

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.validateEmailUnique(updateUserDto.email);
    
    const user = await this.findOne(id)
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    return this.userRepository.remove(user);
  }

  private async validateEmailUnique(email: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email }
    })
    if (existingUser) {
      throw new ConflictException(`User with email: ${email} already exists`);
    }
  }
}
