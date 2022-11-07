/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'class-validator';
import { ApiException } from 'src/common/exceptions/api.exception';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>,
  ) { }

  async list(type?: Resource['type']) {
    const nextRepository = this.resourceRepository
      .createQueryBuilder('resource');
    if (isNumber(type) && [0, 1].includes(type)) {
      nextRepository.where('resource.type = :type', { type });
    }

    return await nextRepository.orderBy(
      'resource.sort',
      'DESC',
    ).getMany();
  }

  async get(id: Resource['id']) {
    return await this.resourceRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getByName(name: Resource['name']) {
    return await this.resourceRepository.findOne({
      where: {
        name,
      },
    });
  }

  async delete(id: Resource['id']) {
    const data = await this.get(id);
    if (!data) throw new ApiException('该数据不存在');
    const children = await this.resourceRepository.find({
      where: {
        parentId: data.id, // 有子节点
      },
    })
    if (children.length > 0) throw new ApiException('该数据存在子节点，无法删除');
    return await this.resourceRepository.delete(id);
  }

  async update(
    id: Resource['id'],
    name: Resource['name'],
    type: Resource['type'],
    parentId: Resource['parentId'],
    path: Resource['path'],
    remark: Resource['remark'],
    sort: Resource['sort'],
  ) {

    const data = await this.get(id);
    if (!data) throw new ApiException('该数据不存在');
    if (type === 1) {
      const children = await this.resourceRepository.find({
        where: {
          parentId: data.id, // 有子节点
        },
      })
      if (children.length > 0) throw new ApiException('权限节点下无法添加菜单节点');
    }

    return await this.resourceRepository.update(id, {
      name,
      type,
      parentId,
      path,
      remark,
      sort: !!sort ? sort : null,
    });
  }


  async add(
    name: Resource['name'],
    type: Resource['type'],
    parentId: Resource['parentId'],
    path: Resource['path'],
    remark: Resource['remark'],
    sort: Resource['sort'],
  ) {
    const resource = new Resource();
    resource.name = name;
    resource.type = type;
    resource.parentId = parentId;
    resource.path = path;
    resource.remark = remark;
    if (sort) {
      resource.sort = sort;
    }
    return await this.resourceRepository.save(resource);
  }
}
