/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { ApiException } from 'src/common/exceptions/api.exception';
import { Reflector } from '@nestjs/core';
import { NO_AUTH } from 'src/common/contants/decorator.contant';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const noAuthInterception = this.reflector.getAllAndOverride(NO_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (noAuthInterception) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new ApiException('登录状态已过期', 401);
    }
    return user;
  }
}