import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
import { Customer } from '../../customer/entities/customer.entity';
import { CreateExtraDto } from '../../extra/dto/create-extra.dto';
import { Extra } from '../../extra/entities/extra.entity';
import { CreateCartDto } from '../cart/dto/create-cart.dto';
import { OrderStatus } from '../entities/order.entity';
import { CreateLocalFileDto } from '../local-file/dto/create-local-file.dto';
import LocalFile from '../local-file/entities/local-file.entity';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateCartDto)
  cart: CreateCartDto;

  @ApiResponseProperty()
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional()
  @Type(() => Customer)
  @ValidateNested()
  @IsOptional()
  customer?: CreateCustomerDto;

  @ApiPropertyOptional()
  @IsOptional()
  paidCheck?: CreateLocalFileDto;
}
