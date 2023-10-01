import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/User';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'src/utils/password/password.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateTypes } from './types/Types';
import { UserNotFoundException } from './exception/UserNotFound.exception';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {}

  users() {
    return this.userRepo.find();
  }

  async userById(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async createUser(userData: CreateUserDto) {
    const password = await this.passwordService.hash(userData.password);
    const newUser = this.userRepo.create({ ...userData, password });
    return this.userRepo.save(newUser);
  }

  async updateUser(id: number, userData: UpdateTypes) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException();
    }
    await this.userRepo.update({ id }, { ...userData, updated_at: new Date() });

    return this.userById(id);
  }
}
