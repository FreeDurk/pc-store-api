import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/Category';
import { Repository } from 'typeorm';
import { UserNotFoundException } from 'src/user/exception/UserNotFound.exception';
import { CategoryNotFound } from './exception/CategoryNotFound.exception';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto);
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new CategoryNotFound();
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new CategoryNotFound();
    }

    await this.categoryRepo.update(
      { id },
      { ...updateCategoryDto, updated_at: new Date() },
    );

    return await this.findOne(id);
  }
}
