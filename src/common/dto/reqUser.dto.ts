
import { User } from 'src/modules/system/user/entities/user.entity';

export class ReqUserDto {
  id: User['id']
  username: User['username']
}