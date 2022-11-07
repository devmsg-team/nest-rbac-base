
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  /* 当前页 */
  @IsOptional()
  @Type()
  @IsNumber()
  public current?: number;

  /* 每页条数 */
  @IsOptional()
  @Type()
  @IsNumber()
  public pageSize?: number;

  public skip: number;
  public take: number;
}
