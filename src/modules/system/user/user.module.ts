import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/auth.config';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => RoleModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
