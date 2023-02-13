import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { OrderModule } from "./order/order.module";
import { CustomerModule } from "./customer/customer.module";
import { CartModule } from "./order/cart/cart.module";
import { ProductModule } from "./product/product.module";
import { MenuController } from './menu.controller'
import { ProductCategoryModule } from "./product-category/product-category.module";
import { ExtraModule } from './extra/extra.module';
import { ProteinModule } from "./protein/protein.module";

@Module({
  imports: [
    UserModule,
    OrderModule,
    CustomerModule,
    CartModule,
    ProductModule,
    ProductCategoryModule,
    ExtraModule,
    ProteinModule
  ],
  controllers: [MenuController]
})
export class MenuModule {}
