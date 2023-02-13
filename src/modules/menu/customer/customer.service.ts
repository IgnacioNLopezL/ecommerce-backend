import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private repo: Repository<Customer>,
  ) {}

  async create(dto: CreateCustomerDto) {
    return await this.repo.save(dto)
  }

  async findAll() {
    return await this.repo.find()
  }

  async findOne(id: number) {
    return await this.repo.findOne(id)
  }

  async update(id: number, dto: UpdateCustomerDto) {
    return await this.repo.update(id, dto)
  }

  async remove(id: number) {
    return await this.repo.softDelete(id)
  }
}
