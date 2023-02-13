import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsNotEmpty } from 'class-validator';
import { CartProducts } from '../../order/cart/entities/cartProducts.entity';

@Entity()
export class Extra {
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
  stock: boolean = true;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column({ default: '' })
  image: string;

  @ManyToOne(() => CartProducts)
  cartProduct: CartProducts;

  @DeleteDateColumn()
  deletedAt?: Date;
}
