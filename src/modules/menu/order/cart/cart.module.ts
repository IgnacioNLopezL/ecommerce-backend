import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartProducts } from './entities/cartProducts.entity';
import { ProductModule } from '../../product/product.module';
import { ExtraModule } from '../../extra/extra.module';
import { ProteinModule } from '../../protein/protein.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [ProductModule, TypeOrmModule.forFeature([Cart, CartProducts]), ExtraModule, ProteinModule],
  exports: [CartService],
})
export class CartModule {}
