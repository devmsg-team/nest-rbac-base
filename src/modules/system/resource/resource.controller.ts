/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { Resource } from './entities/resource.entity';
import { ResourceService } from './resource.service';

@Controller('system/resource')
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly sharedService: SharedService
  ) { }

  @Post('list')
  async list() {
    return this.resourceService.list()
  }

  @Post('tree')
  async getListTree(
    @Body('type') type?: Resource['type']
  ) {
    const resources = await this.resourceService.list(type);
    const list = this.sharedService.arrToTree(resources, 0);
    return {
      list
    }
  }

  @Post('add')
  async add(
    @Body('name') name: Resource['name'],
    @Body('type') type: Resource['type'],
    @Body('parentId') parentId: Resource['parentId'],
    @Body('path') path: Resource['path'],
    @Body('remark') remark: Resource['remark'],
    @Body('sort') sort: Resource['sort'],
  ) {
    return this.resourceService.add(name, type, parentId, path, remark, sort);
  }

  @Post('delete')
  async delete(
    @Body('id') id: Resource['id'],
  ) {
    return this.resourceService.delete(id);
  }

  @Post('update')
  async update(
    @Body('id') id: Resource['id'],
    @Body('name') name: Resource['name'],
    @Body('type') type: Resource['type'],
    @Body('parentId') parentId: Resource['parentId'],
    @Body('path') path: Resource['path'],
    @Body('remark') remark: Resource['remark'],
    @Body('sort') sort: Resource['sort'],
  ) {
    return this.resourceService.update(id, name, type, parentId, path, remark, sort);
  }
}
