/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { SystemRoleListDto } from './dto/role';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('system/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
  ) { }

  @Post('list')
  async list(
    @Body(PaginationPipe) systemRoleListDto: SystemRoleListDto,
  ) {
    return await this.roleService.list(systemRoleListDto);
  }

  @Post('add')
  async add(
    @Body() role: Omit<Role, 'id'>,
  ) {
    return await this.roleService.add(role);
  }

  @Post('update')
  async update(
    @Body('id') id: Role['id'],
    @Body() role: Omit<Role, 'id'>,
  ) {
    return await this.roleService.update(id, role);
  }

  @Post('delete')
  async delete(
    @Body('id') id: Role['id'],
  ) {
    return await this.roleService.delete(id);
  }
}
