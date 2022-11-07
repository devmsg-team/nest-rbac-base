import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from 'src/modules/system/role/role.service';
import { UserService } from 'src/modules/system/user/user.service';
import { NO_PERMISSION } from '../contants/decorator.contant';
import { ReqUserDto } from '../dto/reqUser.dto';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly roleService: RoleService,
  ) { }
  async canActivate(context: ExecutionContext) {
    const noPermission = this.reflector.getAllAndOverride(NO_PERMISSION, [
      context.getHandler(),
      context.getClass()
    ]);
    if (noPermission) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user as ReqUserDto;
    const isAdmin = parseInt(user.id.toString(), 10) === 1;
    if (isAdmin) return true;
    let result = false;
    const currResourcesModel = await this.roleService.permissionResourcesByUserId(user.id);
    if (!currResourcesModel) {
      result = false;
    } else {
      const { resources } = currResourcesModel;
      const resource = resources.find(item => item.path === request.url);
      result = !!resource;
    }
    if (!result) {
      throw new ApiException('暂无权限访问', 403);
    }
    return result;
  }
}
