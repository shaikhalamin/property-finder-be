import { Logger, RequestMethod } from '@nestjs/common';
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

  app.enable('trust proxy');

  app.setGlobalPrefix('v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  //run db seeder
  const propertyTypeService = app.get(PropertyTypeService);
  const cityService = app.get(CityService);
  const userService = app.get(UserService);

  await Promise.all([
    propertyTypeService.insertAll(),
    cityService.insertAll(),
    userService.insertAll(),
  ]);

  await app.listen(8080, '0.0.0.0', async () => {
    return Logger.log(`Application started on port ${await app.getUrl()}`);
  });
}
bootstrap();
