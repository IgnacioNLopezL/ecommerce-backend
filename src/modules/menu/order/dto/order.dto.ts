import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Customer } from '../../customer/entities/customer.entity';
import { Extra } from '../../extra/entities/extra.entity';
import { CartDto } from '../cart/dto/cart.dto';
import { OrderStatus } from '../entities/order.entity';

export class OrderDto {
  id?: number;

  @ApiResponseProperty()
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional()
  @Type(() => Customer)
  @ValidateNested()
  @IsOptional()
  customer: Customer;

  timestamp: Date;

  @Type(() => CartDto)
  @ValidateNested()
  cart: CartDto;

  totalPrice: number;

}
