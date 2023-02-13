import { Injectable } from '@nestjs/common';
import { CreateProteinDto as CreateProteinDto } from './dto/create-protein.dto';
import { UpdateProteinDto } from './dto/update-protein.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Protein } from './entities/protein.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProteinService {
  constructor(
    @InjectRepository(Protein)
      private repo: Repository<Protein>
  ){}

  async getTotalPrice(proteinInput: Protein) {
    return proteinInput.price
  }
  async create(dto: CreateProteinDto) {
    let extra = new Protein()
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

  async update(id: number, dto: UpdateProteinDto) {
    return await this.repo.update(id, dto)
  }

  async remove(id: number) {
    return await this.repo.softDelete(id)
  }
}
