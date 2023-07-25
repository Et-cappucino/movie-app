import { Controller, Get, Post, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfilePictureService } from './profile-picture.service';

@Controller('api/images')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @Post('upload/:profileId')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfilePicture(@UploadedFile(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })
    .addMaxSizeValidator({ maxSize: 1000000 })
    .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
  ) imageFile: Express.Multer.File, @Param('profileId') profileId: number) {
    this.profilePictureService.uploadProfilePicture(imageFile, profileId);
  }

  @Get(':id')
  getProfilePicture(@Param('id') id: number) {
    return this.profilePictureService.getProfilePicture(id);
  }

  @Delete(':id')
  removeProfilePicture(@Param('id') id: number) {
    this.profilePictureService.removeProfilePicture(id);
  }
}
