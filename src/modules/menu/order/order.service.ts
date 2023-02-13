import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { CartService } from './cart/cart.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import LocalFile from './local-file/entities/local-file.entity';
import { Order, OrderImage, OrderStatus } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import LocalFileService from './local-file/local-file.service';

let imageCatched: Express.Multer.File;
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private repo: OrderRepository,
    private cartService: CartService,
    private customerService: CustomerService,
    private localFilesService: LocalFileService,
  ) {}
  async create(dto: CreateOrderDto) {
    let order = new Order();
    order.status = OrderStatus.Pending;

    order.timestamp = new Date();

    if (dto.customer)
      order.customer = await this.customerService.create(dto.customer);
    order.cart = await this.cartService.create(dto.cart);

    order.totalPrice = order.cart.totalPrice;
    if (order.totalPrice != dto.totalPrice) {
      console.error(
        `wrong orderPrice ${order.totalPrice} !== ${dto.totalPrice}`,
      );
      throw new BadRequestException('Wrong displayedPrice');
    }
    order = await this.repo.save(order);
    return order;
  }

  async cancelStatus(orderId: number) {
    let order = await this.findOne(orderId);
    order.status = OrderStatus.Canceled;
    order = await this.repo.save(order);
    return order;
  }

  async findAll() {
    return await this.repo.findWithFilters();
  }

  async findOne(id: number) {
    return await this.repo.findOneFull(id);
  }

  async findOneByCustomer(customerId: number) {
    return await this.repo.findOneByCustomer(customerId);
  }

  async update(id: number, dto: UpdateOrderDto) {
    return await this.repo.update(id, dto);
  }

  async uploadImage(imageCatched: Express.Multer.File) {
    const lastOrderId = await this.repo.findLastId();
    const order = await this.findOne(lastOrderId);
    console.log(imageCatched);

    let fileData: LocalFileDto = {
      filename: imageCatched.originalname,
      path: imageCatched.path,
      mimetype: imageCatched.mimetype,
    };
    const image = await this.localFilesService.saveLocalFileData(fileData);
    await this.update(lastOrderId, {
      paidCheck: image,
    });
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
