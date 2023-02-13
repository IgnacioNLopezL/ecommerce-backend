import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const appConfig: AppConfigService = app.get(AppConfigService);
  const allowedOrigins = [
    'http://localhost:8000',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:4200',
    'http://localhost:62438'
  ]
  app.enableCors({ credentials: true, origin: allowedOrigins })
  const swaggerOptions = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Beta docs')
    .setVersion('1.0')
    .addTag('menu')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  console.log(`Binding :${appConfig.port}`);
  await app.listen(appConfig.port);
}
bootstrap();
