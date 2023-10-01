import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from 'src/entities/Item';
import { Repository } from 'typeorm';
import { CategoryNotFound } from 'src/category/exception/CategoryNotFound.exception';
import { CategoryEntity } from 'src/entities/Category';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity) private itemRepo: Repository<ItemEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async create(id: number, createItemDto: CreateItemDto) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new CategoryNotFound();
    }

    const newItem = this.itemRepo.create({ ...createItemDto });
    const item = await this.itemRepo.save(newItem);

    category.item = [item];
    this.categoryRepo.save(category);
    return item;
  }

  findAll() {
    return this.itemRepo.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return this.itemRepo.findOneBy({ id });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
