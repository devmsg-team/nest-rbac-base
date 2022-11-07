import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { noAuth, noPermission } from 'src/common/decorators/no-auth';
import { LoginService } from './login.service';
import { ReqUserDto } from 'src/common/dto/reqUser.dto';
import { SharedService } from 'src/shared/shared.service';
import { RoleService } from '../system/role/role.service';

@Controller()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly sharedService: SharedService,
    private readonly roleService: RoleService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @noAuth()
  @noPermission()
  async login(@Req() req: Request): Promise<any> {
    return await this.loginService.login(req.user);
  }

  @Get('checkAuth')
  @noPermission()
  async checkAuth(@Req() req: Request) {
    return this.loginService.getUserInfo((req.user as ReqUserDto).id);
  }

  @Get('getMenus')
  @noPermission()
  async getMenus(@Req() req: Request) {
    const userId = parseInt((req.user as ReqUserDto).id.toString(), 10);
    const resources = await this.roleService.getCurrentResourcesByUserId(userId, 0)
    if (resources) {
      return this.sharedService.arrToTree(resources.resources, 0);
    }
    return []
  }

  @Get('logout')
  @noPermission()
  async logout(@Req() req: Request) {
    const userId = parseInt((req.user as ReqUserDto).id.toString(), 10);
    return this.loginService.logout(userId);
  }
}