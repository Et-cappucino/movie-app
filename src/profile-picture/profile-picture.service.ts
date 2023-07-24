import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfilePictureDto } from './dto/create-profile-picture.dto';
import { ProfilePicture } from './entities/profile-picture.entity';

@Injectable()
export class ProfilePictureService {
  constructor(
    @InjectRepository(ProfilePicture)
    private readonly profilePictureRepository: Repository<ProfilePicture>
  ) {}
  
  uploadProfilePicture(imageFile: Express.Multer.File) {
    const imageDto: CreateProfilePictureDto = {
      name: imageFile.originalname.substring(0, imageFile.originalname.lastIndexOf('.')),
      type: imageFile.mimetype,
      imageData: imageFile.buffer
    }
    
    const image = this.profilePictureRepository.create(imageDto);
    return this.profilePictureRepository.save(image);
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
}
