import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/ExceptionFilter';
import { Role } from './enums/role.enum';
import { User } from './user/entity/user.entity';

async function createAdminOnFirstUse() {
  const admin = await User.findOne({ where: { username: 'admin' } });

  if (!admin) {
    await User.create({
      firstName: 'admin',
      lastName: 'admin',
      isActive: true,
      username: 'admin',
      role: Role.Admin,
      email: 'admin@admin.com',
      password: await bcrypt.hash('admin123', 10),
    }).save();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(morgan('combined'));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Carna Project API')
    .setDescription('Carna Project API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await createAdminOnFirstUse();

  await app.listen(5000);
}
bootstrap();
