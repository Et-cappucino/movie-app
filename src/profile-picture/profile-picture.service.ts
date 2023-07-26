import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfilePictureDto } from './dto/create-profile-picture.dto';
import { ProfilePicture } from './entities/profile-picture.entity';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class ProfilePictureService {
  constructor(
    @InjectRepository(ProfilePicture)
    private readonly profilePictureRepository: Repository<ProfilePicture>,
    private readonly profileService: ProfileService
  ) {}
  
  async uploadProfilePicture(imageFile: Express.Multer.File, profileId: number) {
    const profilePicture = this.imageFileToProfilePicture(imageFile);

    const profile = await this.profileService.findOne(profileId);
    if(profile.profilePicture) {
      this.update(profilePicture)
    }
    
    profilePicture.profile = profile
    profilePicture.id = profile.id

    return this.profilePictureRepository.save(profilePicture);
  }

  async getProfilePicture(id: number) {
    const image = await this.profilePictureRepository.findOneBy({ id });
    
    if (!image) throw new NotFoundException(`Profile Picture with id: ${id} not found`)

    return image;
  }

  async removeProfilePicture(id: number) {
    const image = await this.getProfilePicture(id)
    return this.profilePictureRepository.remove(image);
  }

  private imageFileToProfilePicture(imageFile: Express.Multer.File) {
    const imageDto: CreateProfilePictureDto = {
      name: imageFile.originalname.substring(0, imageFile.originalname.lastIndexOf('.')),
      type: imageFile.mimetype,
      imageData: imageFile.buffer
    }
    return this.profilePictureRepository.create(imageDto);
  }

  private update(current: ProfilePicture) {
    current.uploadedAt = new Date()
  }
}
