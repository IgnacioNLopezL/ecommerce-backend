import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { ApiResponseProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Column()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
