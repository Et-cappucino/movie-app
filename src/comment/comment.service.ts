import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './dto'
import { Comment } from './entities/comment.entity';
import { ProfileService } from 'src/profile/profile.service';
import { WatchableService } from 'src/watchable/services';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly profileService: ProfileService,
    private readonly watchableService: WatchableService 
  ) {}
  
  async postComment(createCommentDto: CreateCommentDto) {
    const profile = await this.profileService.findOne(createCommentDto.commenterId);
    const watchable = await this.watchableService.findOne(createCommentDto.watchableId);
    
    const comment = this.commentRepository.create(createCommentDto);
    comment.commenter = profile
    comment.watchable = watchable
    
    this.commentRepository.save(comment);
  }

  async findAllComments(profileId: number, watchableId: number) {
    const comments = await this.commentRepository.find({
      where: { 
        watchable: {
          id: watchableId
        },
        commenter: {
          id: profileId
        }
      }
    })
    return comments;
  }

  async findWatchableAllComments(watchableId: number) {
    const comments = await this.commentRepository.find({
      where: { 
        watchable: {
          id: watchableId
        }
      }
    })
    return comments;
  }

  async findProfileAllComments(profileId: number) {
    const comments = await this.commentRepository.find({
      where: { 
        commenter: {
          id: profileId
        } 
      }
    })
    return comments;
  }

  async getComment(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        commenter: true,
        watchable: true
      }
    })

    if (!comment) throw new NotFoundException(`Comment with id: ${id} not found`)

    return comment;
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.getComment(id);
    this.commentRepository.save({ ...comment, ...updateCommentDto });
  }

  async removeComment(id: number) {
    const comment = await this.getComment(id);
    this.commentRepository.remove(comment);
  }
}
