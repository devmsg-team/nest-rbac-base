import { Global, Module, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SharedService } from './shared.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import { ReponseTransformInterceptor } from 'src/common/interceptors/reponse-transform.interceptor';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RoleModule } from 'src/modules/system/role/role.module';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: configService.get<any>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        autoLoadModels: configService.get<boolean>('database.autoLoadModels'),
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get('database.logging'),
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get<any>('redis'),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('bullRedis.host'),
          port: configService.get<number>('bullRedis.port'),
          password: configService.get<string>('bullRedis.password'),
        },
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    RoleModule,
  ],
  controllers: [],
  providers: [
    SharedService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ReponseTransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  exports: [SharedService],
})
export class SharedModule {
}
