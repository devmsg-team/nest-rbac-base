import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { USER_TOKEN_KEY } from 'src/common/contants/redis.contant';
import { ReqUserDto } from 'src/common/dto/reqUser.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SharedService } from 'src/shared/shared.service';
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly userService: UserService,
    private readonly sharedService: SharedService,
  ) { }

  async checkUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && this.sharedService.aesDecrypt(user.password) === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async checkToken(user: ReqUserDto, curToken: string) {
    const token = await this.redis.get(`${USER_TOKEN_KEY}:${user.id}`);
    if (curToken !== token) throw new ApiException('登录状态已过期', 401);
  }
}
