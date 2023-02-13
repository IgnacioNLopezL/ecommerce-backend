import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn
} from 'typeorm'
import { Product } from '../../product/entities/product.entity'


@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @IsString()
  @Column()
  @IsNotEmpty()
  name: string

  @OneToMany(() => Product, product => product.category)
  products: Product[]

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date
}
