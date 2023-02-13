import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Customer } from '../../customer/entities/customer.entity';
import { ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { Cart } from '../cart/entities/cart.entity';
import LocalFile from '../local-file/entities/local-file.entity';

export enum OrderStatus {
  Pending,
  Confirmed,
  Paid,
  Canceled,
}

export interface OrderImage {
  customerId: number;
  image: Express.Multer.File;
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
  @Type(() => Customer)
  @ValidateNested()
  @IsOptional()
  @OneToOne(() => Customer, { cascade: true, nullable: true })
  @JoinColumn()
  customer: Customer;

  @ApiResponseProperty()
  @IsOptional()
  @IsEnum(OrderStatus)
  @Column('enum', {
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  status: OrderStatus;

  @Type(() => Cart)
  @ValidateNested()
  @OneToOne(() => Cart, { cascade: true })
  @JoinColumn()
  cart: Cart;

  @Column()
  totalPrice: number;

  @Type(() => LocalFile)
  @ValidateNested()
  @OneToOne(() => LocalFile, { cascade: true, nullable: true })
  @JoinColumn()
  paidCheck: LocalFile;

  @Column()
  timestamp: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
