import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private repo: Repository<ProductCategory>,
  ) {}
  async create(dto: CreateProductCategoryDto) {
    return await this.repo.save(dto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async update(id: number, dto: UpdateProductCategoryDto) {
    return await this.repo.update(id, dto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
