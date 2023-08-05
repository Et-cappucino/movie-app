import { Controller, Get, Post, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePicture } from './entities/profile-picture.entity';

@ApiTags('Profile-Picture-Controller')
@ApiBearerAuth()
@Controller('api/images')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @ApiCreatedResponse({ description: 'The Profile Picture has been successfully uploaded.' })
  @ApiUnprocessableEntityResponse({ description: 'File upload failed because of upload validation failure.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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

  @ApiOkResponse({ type: ProfilePicture })
  @ApiNotFoundResponse({ description: 'Profile Picture with provided id could not be found.' })
  @Get(':id')
  getProfilePicture(@Param('id') id: number) {
    return this.profilePictureService.getProfilePicture(id);
  }

  @ApiOkResponse({ description: 'The Profile Picture has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'Profile Picture with provided id could not be found.' })
  @Delete(':id')
  removeProfilePicture(@Param('id') id: number) {
    this.profilePictureService.removeProfilePicture(id);
  }
}
