import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from '../../role/entities/role.entity';

// 资源实体
@Entity({ name: "system_resource" })
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    comment: '资源id',
    unsigned: true,
  })
  @IsNumber()
  id: number;

  @Column({
    name: "parent_id",
    type: 'bigint',
    comment: '父资源id',
  })
  @IsNumber()
  parentId: number;

  @Column({
    name: "name",
    type: 'varchar',
    length: 50,
    comment: '资源名称',
  })
  @IsString()
  name: string;

  @Column({
    name: "path",
    type: 'varchar',
    comment: '资源路径',
  })
  @IsString()
  path: string;

  @Column({
    name: "type",
    type: 'tinyint',
    comment: '资源类型(0菜单 1按钮)',
  })
  @IsNumber()
  type: number;

  @Column({
    name: "icon",
    type: 'varchar',
    length: 50,
    comment: '资源图标',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @Column({
    name: "sort",
    type: 'int',
    comment: '资源排序',
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  sort?: number;
}