import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from './entities/comment.entity';
import { GetCurrentUserId, Public } from 'src/common/decorators';

@ApiTags('Comment-Controller')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ 
    type: Comment, 
    description: 'The comment has been successfully created.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to post a comment.' })
  @Post()
  postComment(@Body() createCommentDto: CreateCommentDto,
              @GetCurrentUserId() userId: number) {
    this.commentService.postComment(createCommentDto, userId);
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get all comments from a particular Profile under a particular Watchable.' })
  @ApiOkResponse({ 
    type: Comment, 
    isArray: true,
    description: 'Retrieve all Comments from a particular Profile under a particular Watchable by IDs with pagination and sorting support.' 
  })
  @Get('/profile-:profileId/watchable-:watchableId')
  getProfileAllWatchableComments(@Query('pageNumber') pageNumber: number = 0, 
                                 @Query('pageSize') pageSize: number = 5,
                                 @Param('profileId') profileId: number,
                                 @Param('watchableId') watchableId: number) {
    return this.commentService.findAllComments(profileId, watchableId, pageNumber, pageSize);
  }

  @Public()
  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get all comments under a particular Watchable.' })
  @ApiOkResponse({ 
    type: Comment, 
    isArray: true,
    description: 'Retrieve all Comments under a particular Watchable by ID with pagination and sorting support.' 
  })
  @Get('/watchable-:watchableId')
  getWatchableAllComments(@Query('pageNumber') pageNumber: number = 0, 
                          @Query('pageSize') pageSize: number = 5,
                          @Param('watchableId') watchableId: number) {
    return this.commentService.findWatchableAllComments(watchableId, pageNumber, pageSize);
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get all comments from a particular Profile.' })
  @ApiOkResponse({ 
    type: Comment, 
    isArray: true,
    description: 'Retrieve all Comments from a particular Profile by ID with pagination and sorting support.' 
  })
  @Get()
  getProfileAllComments(@Query('pageNumber') pageNumber: number = 0, 
                        @Query('pageSize') pageSize: number = 5,
                        @GetCurrentUserId() userId: number) {
    return this.commentService.findProfileAllComments(userId, pageNumber, pageSize);
  }

  @Public()
  @ApiOkResponse({ 
    type: Comment,
    description: 'Comment has been successfully found.' 
  })
  @ApiNotFoundResponse({ description: 'Comment with provided id could not be found.' })
  @Get(':id')
  getComment(@Param('id') id: number) {
    return this.commentService.getComment(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ 
    type: Comment,
    description: 'Comment has been successfully updated.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to edit a comment.' })
  @ApiNotFoundResponse({ description: 'Comment with provided id could not be found.' })
  @Put(':id')
  updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    this.commentService.updateComment(id, updateCommentDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ 
    type: Comment,
    description: 'Comment has been successfully deleted.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete a comment.' })
  @ApiNotFoundResponse({ description: 'Comment with provided id could not be found.' })
  @Delete(':id')
  removeComment(@Param('id') id: number) {
    this.commentService.removeComment(id);
  }
}
