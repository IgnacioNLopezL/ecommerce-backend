import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  name: string;

  @ApiPropertyOptional()
  @IsEmail()
  @Column({ nullable: true })
  email: string;

  @DeleteDateColumn()
  deletedAt?: Date
}
