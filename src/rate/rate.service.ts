import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './entities/rate.entity';
import { ProfileService } from 'src/profile/profile.service';
import { WatchableService } from 'src/watchable/services';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
    private readonly profileService: ProfileService,
    private readonly watchableService: WatchableService
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

  async findAllWatchableRates(id: number) {
    const rates = await this.rateRepository.find({
      where: {
        watchable: {
          id
        }
      },
      relations: {
        profile: true
      }
    });
    return rates;
  }

  async findAllProfileRates(id: number) {
    const rates = await this.rateRepository.find({
      where: {
        profile: {
          id
        }
      },
      relations: {
        watchable: true
      }
    });
    return rates;
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
