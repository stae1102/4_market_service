import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SellersModule } from './sellers/sellers.module';
import { ProductsModule } from './products/products.module';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            level:
              configService.get<string>('NODE_ENV') === 'production'
                ? 'http'
                : 'silly',
            format:
              configService.get<string>('NODE_ENV') === 'production'
                ? winston.format.simple()
                : winston.format.combine(
                    winston.format.timestamp(),
                    utilities.format.nestLike('Market'),
                  ),
          }),
          new winstonDaily({
            level: 'info',
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'MM-DD-YYYY HH:mm:ss',
              }),
              winston.format.printf(
                (info) =>
                  `[${info.timestamp}] ${process.env.NODE_ENV}.${info.level}: ${info.message}`,
              ),
            ),
            filename: 'logs/%DATE%.log',
            datePattern: 'MM-DD-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    SellersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
