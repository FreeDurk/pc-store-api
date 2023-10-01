import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/Profile';
import { UserEntity } from 'src/entities/User';
import { Repository } from 'typeorm';
import { CreateProfile } from './types/Types';
import { UserNotFoundException } from 'src/user/exception/UserNotFound.exception';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async profile(id: number) {
    const profile = await this.profileRepo.findOneBy({ id });

    if (!profile) {
      throw new UserNotFoundException('Profile not found');
    }

    return profile;
  }

  async createProfile(id: number, userProfile: CreateProfile) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException();
    }

    const newProfile = this.profileRepo.create({ ...userProfile });
    const profile = await this.profileRepo.save(newProfile);

    user.profile = profile;
    return this.userRepo.save(user);
  }
}
