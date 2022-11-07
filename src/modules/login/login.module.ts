import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/auth.config';
import { LoginController } from './login.controller'
import { LoginService } from './login.service';
import { UserModule } from '../system/user/user.module';
import { AuthModule } from '../system/auth/auth.module';
import { RoleModule } from '../system/role/role.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    UserModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule { }