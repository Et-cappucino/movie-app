import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  postComment(@Body() createCommentDto: CreateCommentDto) {
    this.commentService.postComment(createCommentDto);
  }

  @Get('/profile-:profileId/watchable-:watchableId')
  getProfileAllWatchableComments(@Query('pageNumber') pageNumber: number = 0, 
                                 @Query('pageSize') pageSize: number = 5,
                                 @Param('profileId') profileId: number,
                                 @Param('watchableId') watchableId: number) {
    return this.commentService.findAllComments(profileId, watchableId, pageNumber, pageSize);
  }

  @Get('/watchable-:watchableId')
  getWatchableAllComments(@Query('pageNumber') pageNumber: number = 0, 
                          @Query('pageSize') pageSize: number = 5,
                          @Param('watchableId') watchableId: number) {
    return this.commentService.findWatchableAllComments(watchableId, pageNumber, pageSize);
  }

  @Get('/profile-:profileId')
  getProfileAllComments(@Query('pageNumber') pageNumber: number = 0, 
                        @Query('pageSize') pageSize: number = 5,
                        @Param('profileId') profileId: number) {
    return this.commentService.findProfileAllComments(profileId, pageNumber, pageSize);
  }

  @Get(':id')
  getComment(@Param('id') id: number) {
    return this.commentService.getComment(id);
  }

  @Put(':id')
  updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  removeComment(@Param('id') id: number) {
    this.commentService.removeComment(id);
  }
}
