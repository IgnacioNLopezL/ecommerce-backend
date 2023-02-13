import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './db/db-config';
import { AppConfigModule } from './app-config/app-config.module';
import { MenuModule } from './modules/menu/menu.module';
import { Connection } from 'typeorm';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot({ ...dbConfig() }),
    MenuModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
