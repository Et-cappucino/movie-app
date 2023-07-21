import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { Page } from 'src/utils/types/page.interface';

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

  async findAll(pageNumber: number, pageSize: number) {
    const [users, count] = await this.userRepository.findAndCount({
      relations: {
        profile: true
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize
    });
    
    return this.getPage(users, count, pageSize);
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
    await this.validateEmailUnique(updateUserDto.email, id);
    
    const user = await this.findOne(id)
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    return this.userRepository.remove(user);
  }

  private async validateEmailUnique(email: string, id?: number) {
    const existingUser = await this.userRepository.findOne({
      where: { email }
    })
    if (existingUser && id !== existingUser.id) {
      throw new ConflictException(`User with email: ${email} already exists`);
    }
  }

  private async getPage(content: User[], totalElements: number, pageSize: number) {
    const page: Page = {
      numberOfElements: content.length,
      totalPages: Math.ceil(totalElements / pageSize),
      totalElements,
      content
    }
    return page
  }
}
