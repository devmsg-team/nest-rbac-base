import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any) {
    const skip = value.current ? (value.current - 1) * value.pageSize : 0;
    const take = value.pageSize ?? 0;
    value.skip = skip;
    value.take = take;
    delete value.current
    delete value.pageSize
    return value;
  }
}
