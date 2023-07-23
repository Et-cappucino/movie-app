import { Injectable } from '@nestjs/common';
import { CreateProfilePictureDto } from './dto/create-profile-picture.dto';

@Injectable()
export class ProfilePictureService {
  
  uploadProfilePicture(createProfilePictureDto: CreateProfilePictureDto) {
    return 'This action adds a new profilePicture';
  }

  getProfilePicture(id: number) {
    return `This action returns a #${id} profilePicture`;
  }

  removeProfilePicture(id: number) {
    return `This action removes a #${id} profilePicture`;
  }
}
