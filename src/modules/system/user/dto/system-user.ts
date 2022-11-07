import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { Role } from "../../role/entities/role.entity";

export class SystemUserListDto extends PaginationDto { }

