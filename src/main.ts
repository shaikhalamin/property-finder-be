import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
import { PropertyTypeService } from './property-type/property-type.service';
import { CityService } from './city/city.service';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, './public'));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  //app.setGlobalPrefix('v1');

  //run db seeder
  const propertyTypeService = app.get(PropertyTypeService);
  const cityService = app.get(CityService);
  const userService = app.get(UserService);

  await Promise.all([
    propertyTypeService.insertAll(),
    cityService.insertAll(),
    userService.insertAll(),
  ]);

  await app.listen(8080, () => Logger.log(`Application started on port 8080`));
}
bootstrap();
