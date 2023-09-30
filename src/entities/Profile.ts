/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile' })
export class ProfileEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  address: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ nullable: true })
  avatar: string;
}
