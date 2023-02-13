import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCategory } from '../../product-category/entities/product-category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Column()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  recipe: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  image: string;

  @ManyToOne(() => ProductCategory, { nullable: true, cascade: true })
  category: ProductCategory;

  @Column('boolean', { default: true })
  stock: boolean;

  @DeleteDateColumn()
  deletedAt?: Date;
}
