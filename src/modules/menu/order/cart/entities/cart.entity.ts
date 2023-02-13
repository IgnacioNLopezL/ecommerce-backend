import { Entity, OneToMany, OneToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, IsArray } from 'class-validator';
import { Type, Exclude } from 'class-transformer';
import { Order } from '../../entities/order.entity';
import { CartProducts } from './cartProducts.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: [CartProducts], isArray: true })
  @ValidateNested({ each: true })
  @Type(() => CartProducts)
  @IsArray()
  @OneToMany(() => CartProducts, (cartProduct) => cartProduct.cart, {
    cascade: true,
  })
  products: CartProducts[];

  @Exclude()
  @OneToOne(() => Order)
  order: Order;

  @Column()
  totalPrice: number;
}
