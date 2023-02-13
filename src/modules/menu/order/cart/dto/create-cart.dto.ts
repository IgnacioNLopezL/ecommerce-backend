import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { Cart } from '../entities/cart.entity'
import { CartProducts } from '../entities/cartProducts.entity'

export class CreateCartDto extends OmitType(Cart, ['id']) {
  @ApiProperty({ type: [CartProducts], isArray: true })
  @ValidateNested({ each: true })
  @Type(() => CartProducts)
  @IsArray()
  products: CartProducts[]

  totalPrice: number
}
