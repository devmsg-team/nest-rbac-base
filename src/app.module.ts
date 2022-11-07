import { ResourceModule } from './modules/system/resource/resource.module';
import { RoleModule } from './modules/system/role/role.module';
import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './modules/login/login.module';
import { AuthModule } from './modules/system/auth/auth.module';
import { UserModule } from './modules/system/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SharedModule,
    // 系统模块
    AuthModule,
    LoginModule,
    UserModule,
    ResourceModule,
    RoleModule,
    // 业务模块
  ],
})
export class AppModule { }
