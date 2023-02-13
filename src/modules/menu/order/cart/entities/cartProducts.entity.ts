import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Extra } from '../../../extra/entities/extra.entity';
import { Product } from '../../../product/entities/product.entity';
import { Protein } from '../../../protein/entities/protein.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @Column()
  productId: number;

  @Column()
  cartId: number;

  @ApiProperty()
  @Type(() => Product)
  @ValidateNested()
  @IsOptional()
  @ManyToOne(() => Product)
  product?: Product;

  @ManyToOne(() => Cart)
  cart: Cart;

  @Type(() => Extra)
  @ValidateNested()
  @IsOptional()
  @OneToMany(() => Extra, (extra) => extra.cartProduct, { cascade: true, eager: true })
  extra?: Extra[];

  @Type(() => Protein)
  @ValidateNested()
  @IsOptional()
  @ManyToOne(() => Protein)
  protein?: Protein;

  @Column('boolean', { default: false })
  hasExtra: boolean;

  @Column('boolean', { default: false })
  hasProtein: boolean;

  @Column('boolean', { default: false })
  hasOnlyExtra: boolean;
}
