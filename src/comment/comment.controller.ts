import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  postComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.postComment(createCommentDto);
  }

  @Get('/profile-:profileId/watchable-:watchableId')
  getProfileAllWatchableComments(@Param('profileId') profileId: number,
                                 @Param('watchableId') watchableId: number) {
    return this.commentService.findAllComments(profileId, watchableId);
  }

  @Get('/watchable-:watchableId')
  getWatchableAllComments(@Param('watchableId') watchableId: number) {
    return this.commentService.findWatchableAllComments(watchableId);
  }

  @Get('/profile-:profileId')
  getProfileAllComments(@Param('profileId') profileId: number) {
    return this.commentService.findProfileAllComments(profileId);
  }

  @Get(':id')
  getComment(@Param('id') id: number) {
    return this.commentService.getComment(id);
  }

  @Put(':id')
  updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  removeComment(@Param('id') id: number) {
    return this.commentService.removeComment(id);
  }
}
