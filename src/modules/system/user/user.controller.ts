import { Body, Controller, Param, Post, Req, Request } from '@nestjs/common';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SystemUserListDto } from './dto/system-user';
import { UserService } from './user.service';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { User } from './entities/user.entity';

// 用户管理
@Controller('system/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('add')
  async add(
    @Body() body: Omit<User, 'id'>,
  ) {
    const user = await this.userService.findOneByUsername(body.username);
    if (user) throw new ApiException('用户名已存在');
    return await this.userService.add(body);
  }

  @Post('list')
  async list(
    @Body(PaginationPipe) systemUserListDto: SystemUserListDto,
  ) {
    return await this.userService.list(systemUserListDto);
  }

  @Post('update')
  async update(
    @Body() body: Omit<User, 'password'>,
    @Req() req: Request
  ) {
    return await this.userService.update(body.id, body, parseInt(req['user'].id, 10));
  }

  @Post('delete')
  async delete(
    @Body('id') id: User['id'],
    @Req() req: Request
  ) {
    return await this.userService.delete(id, parseInt(req['user'].id, 10));
  }
}
