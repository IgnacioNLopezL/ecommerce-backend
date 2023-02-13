import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { registerAs } from '@nestjs/config'
import { config as setConfig } from 'dotenv'

setConfig()

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: ['build/**/*.entity.{ts,js}'],
    synchronize: true,
    cli: {
      migrationsDir: 'src/db/migration'
    },
    migrations: ['build/db/migration/**/*.js']
  })
)
