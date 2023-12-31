import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { PaginationService } from 'src/utils/pagination/pagaination.service';
import { EmailConfirmationToken } from 'src/email-confirmation-token/entities/email-confirmation-token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly pagainationService: PaginationService,
    private readonly eventEmitter: EventEmitter2
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    await this.validateEmailUnique(createUserDto.email);

    const profile = await this.profileService.create(new Profile())
    createUserDto.password = await this.encrypt(createUserDto.password);
    
    const user = this.userRepository.create(createUserDto)
    user.profile = profile

    const result = await this.eventEmitter.emitAsync('user-created');
    const token = result[0];
    
    if (token instanceof EmailConfirmationToken) {
      user.emailConfirmationToken = token;
    }
    
    return this.userRepository.save(user);
  }

  async findAll(pageNumber: number, pageSize: number) {
    const [users, count] = await this.userRepository.findAndCount({
      relations: {
        profile: true,
        emailConfirmationToken: true
      },
      skip: pageNumber * pageSize,
      take: pageSize
    });
    
    return this.pagainationService.paginate(users, pageNumber, pageSize, count);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
        emailConfirmationToken: true
      }
    });
    
    if (!user) throw new NotFoundException(`User with id: ${id} not found`)

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.validateEmailUnique(updateUserDto.email, id);
    updateUserDto.password = await this.encrypt(updateUserDto.password);
    
    const user = await this.findOne(id)
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    return this.userRepository.remove(user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { 
        profile: true
      }
    })
    
    if (!user) throw new NotFoundException(`User with email: ${email} not found`)

    return user;
  }

  async updateHashedRefreshToken(id: number, token: string) {
    const user = await this.findOne(id);
    
    await this.userRepository.save({
      ...user,
      hashedRefreshToken: token ? await this.encrypt(token) : null
    })
  }

  @OnEvent('email-confirmed')
  async enableUser(id: number) {
    const user = await this.findOne(id);
    
    await this.userRepository.save({
      ...user,
      isEnabled: true
    })
  }

  @Cron(CronExpression.EVERY_5_HOURS)
  async cleanupNotEnabledUsers() {
    const notEnabledUsers = await this.userRepository.find({
      where: {
        isEnabled: false
      }
    })
    
    if (notEnabledUsers.length !== 0) {
      await this.userRepository.remove(notEnabledUsers);
    }
  }

  private async validateEmailUnique(email: string, id?: number) {
    const existingUser = await this.userRepository.findOne({
      where: { email }
    })
    if (existingUser && id !== existingUser.id) {
      throw new ConflictException(`User with email: ${email} already exists`);
    }
  }

  private encrypt = (password: string) => Bcrypt.hash(password, 10);
}
