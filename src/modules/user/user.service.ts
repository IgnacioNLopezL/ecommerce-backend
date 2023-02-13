import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}
  async create(dto: CreateUserDto) {
    return await this.repo.save(dto)
  }

  findAll() {
    return this.repo.find()
  }

  findOne(id: number) {
    return this.repo.findOne(id)
  }

  async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email } })
  }

  async update(id: number, dto: UpdateUserDto) {
    return await this.repo.update(id, dto)
  }

  async remove(id: number) {
    return await this.repo.softDelete(id)
  }
}
