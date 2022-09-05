import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyTypeModule } from './property-type/property-type.module';
import { MailModule } from './common/mail/mail.module';
import { CityModule } from './city/city.module';
import { PropertyModule } from './property/property.module';

const driverType = 'mysql'; //'mysql';
const dbUrl = process.env.DB_URL; // 'mysql://root:12345678@localhost:3378/nest_ejobs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: driverType,
      url: dbUrl,
      entities: [`${__dirname}/**/entities/*.{ts,js}`],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      charset: 'utf8mb4_unicode_ci',
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    }),
    PropertyTypeModule,
    MailModule,
    CityModule,
    PropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
