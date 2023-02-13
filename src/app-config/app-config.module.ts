import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppConfigService as AppConfigService } from './app-config.service'
import dbConfig from '../db/db-config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [dbConfig]
    })
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService]
})
export class AppConfigModule {}
