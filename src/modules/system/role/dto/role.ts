import { IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class SystemRoleDto {
  // 角色名称
  @IsString()
  name: string;
}

export class SystemRoleListDto extends PaginationDto { }

