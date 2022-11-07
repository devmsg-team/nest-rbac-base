/*
https://docs.nestjs.com/providers#services
*/

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IConfig } from 'src/config/configuration';
import { USER_TOKEN_KEY } from 'src/common/contants/redis.contant';
import { UserService } from '../system/user/user.service';
import { User } from '../system/user/entities/user.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) { }

  // 登录
  async login(userInfo: any) {
    const jwtSign = this.jwtService.sign(userInfo);
    const redisConfigExpiresIn = this.configService.get<IConfig['redisExpiresIn']>('redisExpiresIn');
    await this.redis.set(
      `${USER_TOKEN_KEY}:${userInfo.id}`,
      jwtSign,
      'EX',
      redisConfigExpiresIn,
    );
    return {
      token: jwtSign,
    };
  }

  // 获取用户信息
  async getUserInfo(userId: User['id']) {
    const { username } = await this.userService.findOneUserAllById(userId);
    return {
      username,
    }
  }

  // 退出登录
  async logout(userId: User['id']) {
    await this.redis.del(`${USER_TOKEN_KEY}:${userId}`);
    return {
      message: '退出成功',
    }
  }
}
