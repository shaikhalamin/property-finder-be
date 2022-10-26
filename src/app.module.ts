import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyTypeModule } from './property-type/property-type.module';
import { MailModule } from './common/mail/mail.module';
import { CityModule } from './city/city.module';
import { PropertyModule } from './property/property.module';
import { UserModule } from './user/user.module';
import { AgentModule } from './agent/agent.module';
import { DataSource } from 'typeorm';
import { StorageFileModule } from './storage-file/storage-file.module';
import { AuthModule } from './auth/auth.module';

const dbDriver = process.env.DB_DRIVER == 'mysql' ? 'mysql' : 'postgres';
const dbUrl = process.env.DATABASE_URL || process.env.DB_LOCAL_URL
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbDriver,
      url: dbUrl,
      entities: [`${__dirname}/**/entities/*.{ts,js}`],
      synchronize: true,
    }),
    PropertyTypeModule,
    MailModule,
    CityModule,
    PropertyModule,
    UserModule,
    AgentModule,
    StorageFileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
