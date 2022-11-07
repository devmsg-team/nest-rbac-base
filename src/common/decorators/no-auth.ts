import { SetMetadata } from '@nestjs/common';
import { NO_AUTH, NO_PERMISSION } from 'src/common/contants/decorator.contant';

// 设置不进行 jwt 校验
export const noAuth = () => SetMetadata(NO_AUTH, true);

// 不进行权限校验
export const noPermission = () => SetMetadata(NO_PERMISSION, true);
