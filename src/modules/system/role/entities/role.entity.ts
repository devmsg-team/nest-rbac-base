import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { IsNumber, IsString } from 'class-validator';
import { Resource } from '../../resource/entities/resource.entity';

// 角色实体
@Entity({ name: "system_role" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    comment: '角色id',
    unsigned: true,
  })
  @IsNumber()
  id: number;

  @Column({
    name: "name",
    type: 'varchar',
    length: 50,
    comment: '角色名称',
  })
  @IsString()
  name: string;


  @ManyToMany(type => Resource)
  @JoinTable({
    name: 'system_role_resource_relation',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'resource_id',
      referencedColumnName: 'id',
    },
  })
  resources: Resource[];
}