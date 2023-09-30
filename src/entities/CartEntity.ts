/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { ItemEntity } from './Item';
import { UserEntity } from './User';

@Entity({ name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToMany(() => ItemEntity, (item) => item.cart)
  @JoinTable()
  item: ItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity;
}
