import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Customer } from '../../customer/entities/customer.entity'
import { Order } from './order.entity'

@Entity()
export class OrderCustomer {
  @PrimaryColumn()
  customerId: number

  @PrimaryColumn()
  orderId: number

  @ManyToOne(() => Customer)
  customer: Customer

  @ManyToOne(() => Order)
  order: Order
}
