import { Injectable } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto'

@Injectable()
export class CommentService {
  
  postComment(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAllComments(profileId: number, watchableId: number) {
    return `This action returns all comments from profile #${profileId} under watchable #${watchableId}`;
  }

  findWatchableAllComments(watchableId: number) {
    return `This action returns all comments under watchable #${watchableId}`;
  }

  findProfileAllComments(profileId: number) {
    return `This action returns all comments from profile #${profileId}`;
  }

  getComment(id: number) {
    return `This action returns a #${id} comment`;
  }

  updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  removeComment(id: number) {
    return `This action removes a #${id} comment`;
  }
}
