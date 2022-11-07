/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { ApiException } from 'src/common/exceptions/api.exception';
import { Repository } from 'typeorm';
import { Resource } from '../resource/entities/resource.entity';
import { ResourceService } from '../resource/resource.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SystemRoleListDto } from './dto/role';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly resourceService: ResourceService,
    private readonly userService: UserService,
  ) { }


  async permissionResourcesByUserId(userId: User['id']) {
    return await this.roleRepository
      .createQueryBuilder('role')
      .innerJoin(User, 'user', 'user.role_id = role.id')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('role.resources', 'resource')
      .getOne();
  }

  async list(systemRoleListDto: SystemRoleListDto) {
    const result = await this.roleRepository
      .createQueryBuilder('role')
      .skip(systemRoleListDto.skip)
      .take(systemRoleListDto.take)
      .leftJoinAndSelect('role.resources', 'resource')
      .getManyAndCount();

    return {
      list: result[0],
      total: result[1],
    }
  }

  async getCurrentResourcesByUserId(userId: User['id'], type?: Resource['type']) {
    if (userId === 1) {
      const resources = await this.resourceService.list(type);
      return {
        resources: resources
      }
    }
    return await this.roleRepository
      .createQueryBuilder('role')
      .innerJoin(User, 'user', 'user.role_id = role.id')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('role.resources', 'resource', 'resource.type = :type', { type })
      .getOne();
  }

  async add(role: Omit<Role, 'id'>) {
    console.log(role);
    return await this.roleRepository.save(role);
  }

  async update(id: Role['id'], rolePayload: Omit<Role, 'id'>) {
    const data = await this.roleRepository.findOne({
      where: {
        id,
      },
      relations: ['resources'],
    },);

    if (!data) throw new ApiException('该数据不存在');
    const { resources, ...payload } = rolePayload;

    await this.roleRepository
      .createQueryBuilder('role')
      .relation(Role, 'resources')
      .of(id)
      .addAndRemove(resources.map(item => item.id), data.resources.map(item => item.id));
    return await this.roleRepository.update(id, payload);
  }

  async delete(id: Role['id']) {
    const data = await this.roleRepository.findOne({
      where: {
        id,
      },
    });

    if (!data) throw new ApiException('该数据不存在');

    const role = await this.userService.checkUserIsExistByRoleId(id);
    if (role) throw new ApiException('该角色下存在用户，无法删除');
    return await this.roleRepository.delete(id);
  }
}
