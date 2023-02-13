import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProteinService } from './protein.service';
import { CreateProteinDto } from './dto/create-protein.dto';
import { UpdateProteinDto } from './dto/update-protein.dto';

@Controller('protein')
export class ProteinController {
  constructor(private readonly proteinService: ProteinService) {}

  @Post()
  create(@Body() createProteinDto: CreateProteinDto) {
    return this.proteinService.create(createProteinDto);
  }

  @Get()
  findAll() {
    return this.proteinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proteinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProteinDto: UpdateProteinDto) {
    return this.proteinService.update(+id, updateProteinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proteinService.remove(+id);
  }
}
