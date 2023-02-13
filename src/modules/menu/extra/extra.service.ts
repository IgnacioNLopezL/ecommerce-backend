import { Injectable } from '@nestjs/common';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Extra } from './entities/extra.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExtraService {
  constructor(
    @InjectRepository(Extra)
      private repo: Repository<Extra>
  ){}

  async getTotalPrice(extraInput: Extra[]) {
    let totalPrice = 0;
    extraInput.map((extra) => {
      totalPrice = totalPrice + extra.price
    })
    return totalPrice;
  }
  async findByName(extraName: string) {
    return await this.repo.findOne({
      where: {
        name: extraName
      }
    })
  }
  async create(dto: CreateExtraDto) {
    let extra = new Extra()
    extra.stock = true
    extra = await this.repo.save(dto)
    return extra;
  }

  async findAll() {
    return await this.repo.find()
  }

  async findOne(id: number) {
    return await this.repo.findOne(id)
  }

  async update(id: number, dto: UpdateExtraDto) {
    return await this.repo.update(id, dto)
  }

  async remove(id: number) {
    return await this.repo.softDelete(id)
  }
}
