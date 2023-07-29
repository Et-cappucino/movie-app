import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './dto'
import { Comment } from './entities/comment.entity';
import { ProfileService } from 'src/profile/profile.service';
import { WatchableService } from 'src/watchable/services';
import { PaginationService } from 'src/utils/pagination/pagaination.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly profileService: ProfileService,
    private readonly watchableService: WatchableService,
    private readonly paginationService: PaginationService
  ) {}
  
  async postComment(createCommentDto: CreateCommentDto) {
    const profile = await this.profileService.findOne(createCommentDto.commenterId);
    const watchable = await this.watchableService.findOne(createCommentDto.watchableId);
    
    const comment = this.commentRepository.create(createCommentDto);
    comment.commenter = profile
    comment.watchable = watchable
    
    this.commentRepository.save(comment);
  }

  async findAllComments(profileId: number, watchableId: number, pageNumber: number, pageSize: number) {
    const [comments, count] = await this.commentRepository.findAndCount({
      where: { 
        watchable: {
          id: watchableId
        },
        commenter: {
          id: profileId
        }
      },
      skip: pageNumber * pageSize,
      take: pageSize
    })
    return this.paginationService.paginate(comments, pageNumber, pageSize, count);
  }

  async findWatchableAllComments(watchableId: number, pageNumber: number, pageSize: number) {
    const [comments, count] = await this.commentRepository.findAndCount({
      where: { 
        watchable: {
          id: watchableId
        }
      },
      skip: pageNumber * pageSize,
      take: pageSize
    })
    return this.paginationService.paginate(comments, pageNumber, pageSize, count);
  }

  async findProfileAllComments(profileId: number, pageNumber: number, pageSize: number) {
    const [comments, count] = await this.commentRepository.findAndCount({
      where: { 
        commenter: {
          id: profileId
        } 
      },
      skip: pageNumber * pageSize,
      take: pageSize
    })
    return this.paginationService.paginate(comments, pageNumber, pageSize, count);
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
