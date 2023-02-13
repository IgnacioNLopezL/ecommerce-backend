import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from '../customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderCustomer } from './entities/order-customer.entity';
import { OrderRepository } from './order.repository';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { LocalFileModule } from './local-file/local-file.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    forwardRef(() => CartModule),
    forwardRef(() => CustomerModule),
    forwardRef(() => LocalFileModule),
    TypeOrmModule.forFeature([Order, OrderCustomer, OrderRepository]),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
  ],
  exports: [OrderService],
})
export class OrderModule {}
