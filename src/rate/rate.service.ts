import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './entities/rate.entity';
import { ProfileService } from 'src/profile/profile.service';
import { WatchableService } from 'src/watchable/services';
import { PaginationService } from 'src/utils/pagination/pagaination.service';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
    private readonly profileService: ProfileService,
    private readonly watchableService: WatchableService,
    private readonly pagainationService: PaginationService
  ) {}
  
  async create(createRateDto: CreateRateDto) {
    const isAlreadyRated = await this.validateRateAttempt(createRateDto);
    
    if (!isAlreadyRated) {
      const profile = await this.profileService.findOne(createRateDto.profileId);
      const watchable = await this.watchableService.findOne(createRateDto.watchableId);
      
      const rate = this.rateRepository.create(createRateDto);
      rate.profile = profile;
      rate.watchable = watchable;

      this.rateRepository.save(rate);
    }  
  }

  async findAllWatchableRates(id: number, pageNumber: number, pageSize: number) {
    const [rates, count] = await this.rateRepository.findAndCount({
      where: {
        watchable: {
          id
        }
      },
      relations: {
        profile: true
      },
      skip: pageNumber * pageSize,
      take: pageSize,
      order: {
        ratedAt: 'DESC'
      }
    });
    return this.pagainationService.paginate(rates, pageNumber, pageSize, count);
  }

  async findAllProfileRates(id: number, pageNumber: number, pageSize: number) {
    const [rates, count] = await this.rateRepository.findAndCount({
      where: {
        profile: {
          id
        }
      },
      relations: {
        watchable: true
      },
      skip: pageNumber * pageSize,
      take: pageSize,
      order: {
        ratedAt: 'DESC'
      }
    });
    return this.pagainationService.paginate(rates, pageNumber, pageSize, count);
  }

  private async validateRateAttempt(createRateDto: CreateRateDto) {
    const rate = await this.rateRepository.findOne({
      where: {
        profile: {
          id: createRateDto.profileId
        },
        watchable: {
          id: createRateDto.watchableId
        }
      }
    })
    return rate;  
  }
}
