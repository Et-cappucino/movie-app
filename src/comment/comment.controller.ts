import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from './entities/comment.entity';

@ApiTags('Comment-Controller')
@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiCreatedResponse({ 
    type: Comment, 
    description: 'The comment has been successfully created.' 
  })
  @Post()
  postComment(@Body() createCommentDto: CreateCommentDto) {
    this.commentService.postComment(createCommentDto);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
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

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
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

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiOkResponse({ 
    type: Comment, 
    isArray: true,
    description: 'Retrieve all Comments from a particular Profile by ID with pagination and sorting support.' 
  })
  @Get('/profile-:profileId')
  getProfileAllComments(@Query('pageNumber') pageNumber: number = 0, 
                        @Query('pageSize') pageSize: number = 5,
                        @Param('profileId') profileId: number) {
    return this.commentService.findProfileAllComments(profileId, pageNumber, pageSize);
  }

  @ApiOkResponse({ type: Comment })
  @ApiNotFoundResponse({ description: 'Comment with provided id could not be found' })
  @Get(':id')
  getComment(@Param('id') id: number) {
    return this.commentService.getComment(id);
  }

  @ApiOkResponse({ type: Comment })
  @ApiNotFoundResponse({ description: 'Comment with provided id could not be found' })
  @Put(':id')
  updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    this.commentService.updateComment(id, updateCommentDto);
  }

  @ApiOkResponse({ type: Comment })
  @ApiNotFoundResponse({ description: 'Comment with provided id could not be found' })
  @Delete(':id')
  removeComment(@Param('id') id: number) {
    this.commentService.removeComment(id);
  }
}
