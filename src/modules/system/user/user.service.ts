/*
https://docs.nestjs.com/providers#services
*/

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_TOKEN_KEY } from 'src/common/contants/redis.contant';
import { ApiException } from 'src/common/exceptions/api.exception';
import { IConfig } from 'src/config/configuration';
import { SharedService } from 'src/shared/shared.service';
import { Repository } from 'typeorm';
import { SystemUserListDto } from './dto/system-user';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRedis() private readonly redis: Redis,
    private readonly sharedService: SharedService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  // 通过用户名查询用户
  async findOneByUsername(username: User['username']) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.username')
      .addSelect('user.password')
      .where({
        username: username,
      })
      .getOne();
    return user;
  }

  // 新增用户
  async add(body: Omit<User, 'id'>) {
    return await this.userRepository.save({
      ...body,
      password: this.sharedService.aesEncrypt(body.password),
    });
  }

  async findOneUserAllById(userId: User['id']) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({
        id: userId,
      })
      .leftJoinAndMapOne('user.role', 'system_role', 'role', 'role.id = user.role_id')
      .getOne();
  }

  async list(systemUserListDto: SystemUserListDto) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .skip(systemUserListDto.skip)
      .take(systemUserListDto.take)
      .leftJoinAndMapOne('user.role', 'system_role', 'role', 'role.id = user.role_id')
      .select([
        'user.id',
        'user.username',
        'user.status',
        'user.createAt',
        'user.updateAt',
        "user.remark",
        'role.id',
        'role.name',
      ])
      .getManyAndCount();

    return {
      list: result[0],
      total: result[1],
    }
  }

  async update(id: User['id'], body: Omit<User, 'password'>, loginUserId: User['id']) {
    const user = await this.findOneUserAllById(id);
    if (!user) {
      throw new ApiException('用户不存在');
    }
    if (user.username !== body.username) {
      const isExist = await this.findOneByUsername(body.username);
      if (isExist) {
        throw new ApiException('用户名已存在');
      }

      const jwtSign = this.jwtService.sign({
        id,
        username: body.username,
      });
      const redisConfigExpiresIn = this.configService.get<IConfig['redisExpiresIn']>('redisExpiresIn');
      await this.redis.set(
        `${USER_TOKEN_KEY}:${id}`,
        jwtSign,
        'EX',
        redisConfigExpiresIn,
      );
    }

    const res = await this.userRepository.update(id, body);

    if (user.username !== body.username && loginUserId === id) {
      throw new ApiException('登录状态已过期', 401);
    }
    return res;
  }

  async delete(id: User['id'], loginUserId: User['id']) {
    const user = await this.findOneUserAllById(id);
    if (!user) {
      throw new ApiException('用户不存在');
    }
    if (+user.id === 1) {
      throw new ApiException('超级管理员不能删除');
    }
    await this.redis.del(`${USER_TOKEN_KEY}:${id}`);
    const res = await this.userRepository.delete(id);
    if (loginUserId === id) {
      throw new ApiException('登录状态已过期', 401);
    }
    return res;
  }

  async checkUserIsExistByRoleId(roleId: User['role']['id']) {
    const user = await this.userRepository.findOne({
      where: {
        role: {
          id: roleId,
        },
      },
    });
    return user;
  }
}


