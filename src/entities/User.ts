import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ProfileEntity } from './Profile';
import { CartEntity } from './CartEntity';
import { Exclude } from 'class-transformer';
@Entity({ name: 'user' })
export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToOne(() => CartEntity)
  @JoinColumn()
  cart: CartEntity;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: false, length: 100 })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
