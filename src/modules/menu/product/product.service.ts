import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  getTotalPrice(product: Product, quantity: number) {
    return product.price * quantity;
  }

  async create(dto: CreateProductDto) {
    let product = new Product();
    product.stock = true;
    product = await this.repo.save(dto);
    return product;
  }

  async findAll() {
    return await this.repo.find({
      relations: ['category']
    });
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async update(id: number, dto: UpdateProductDto) {
    return await this.repo.update(id, dto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
