import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { CartProducts } from '../entities/cartProducts.entity'

export class CartDto {
  @ApiProperty({ type: [CartProducts], isArray: true })
  @ValidateNested({ each: true })
  @Type(() => CartProducts)
  @IsArray()
  products: CartProducts[]

  totalPrice: number
}
