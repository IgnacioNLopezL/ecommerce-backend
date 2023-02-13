import { Controller, Get } from '@nestjs/common'

@Controller('restaurant')
export class MenuController {
  @Get()
  getDashboard() {
    // const openSalesPeriod = await this.salesPeriodService.findOpen
    return 'dash'
  }
}
