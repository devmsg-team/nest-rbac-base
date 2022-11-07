import { ResourceService } from './resource.service';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { RoleModule } from '../role/role.module';
import { ResourceController } from './resource.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource]),
    forwardRef(() => RoleModule),
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService]
})
export class ResourceModule { }
