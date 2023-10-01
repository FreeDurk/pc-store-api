import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/Profile.dto';

@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  getProfile(@Param('id', ParseIntPipe) profileId: number) {
    return this.profileService.profile(profileId);
  }

  @Post('user/:id')
  createProfile(
    @Param('id', ParseIntPipe) userId: number,
    @Body() request: ProfileDto,
  ) {
    return this.profileService.createProfile(userId, request);
  }
}
