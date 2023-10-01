import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from 'src/entities/Item';
import { CategoryEntity } from 'src/entities/Category';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ItemEntity])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
