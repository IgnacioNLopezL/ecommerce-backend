import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get('SERVER_PORT'))
  }

  get jwtSecret(): string {
    return this.configService.get('JWT_SECRET')
  }

  get panelUrl() {
    return this.configService.get('PANEL_URL')
  }

  get isDemo() {
    return process.env.NODE_ENV === 'development'
  }
}
