import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber } from 'class-validator';

@Entity()
export class Protein {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Column({ nullable: true })
  price: number;

  @Column('boolean', { default: true })
  stock: boolean = true

  @DeleteDateColumn()
  deletedAt?: Date;
}
