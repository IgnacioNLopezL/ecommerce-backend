import {
  EntityRepository,
  FindConditions,
  FindOneOptions,
  ObjectID,
  Repository,
} from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';

const PAID_ORDER_STATUSES = [
  OrderStatus.Pending,
  OrderStatus.Confirmed,
  OrderStatus.Paid,
].map((s) => '' + s);

const fullOrderRelations = [
  'customer',
  'cart',
  'cart.products',
  'cart.products.product',
  'cart.products.extra.cartProduct',
  'cart.products.extra',
  'cart.products.protein',
];

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findWithFilters() {
    return this.find({
      relations: fullOrderRelations,
      order: {
        timestamp: 'ASC',
      },
    });
  }
  async findOneFull(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Order>,
  ): Promise<Order | undefined> {
    return super.findOne(id, { ...options, relations: fullOrderRelations });
  }

  async findOneByCustomer(
    id?: string | number,
    options?: FindOneOptions<Order>,
  ): Promise<Order | undefined> {
    return super.findOne({
      where: { customer: id },
      ...options,
      relations: fullOrderRelations,
    });
  }

  async findLastId() {
    const entry = await this.createQueryBuilder()
      .select()
      .orderBy('id', 'DESC')
      .limit(1)
      .getOne();
    return entry?.id;
  }
  // public async getTotalSales(salesPeriodId: number): Promise<number> {
  //   const response = await this.createQueryBuilder('order')
  //     .select('SUM(order.totalPrice) as sum')
  //     .where('order.salesPeriodId = :salesPeriodId', { salesPeriodId })
  //     .andWhere('order.status IN (:...validStatuses)', {
  //       validStatuses: PAID_ORDER_STATUSES
  //     })
  //     .getRawOne()
  //   return +response.sum
  // }
}
