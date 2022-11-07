import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { IsNumber, IsString } from 'class-validator';
import { Role } from '../../role/entities/role.entity';

// 用户实体
@Entity({ name: "system_user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    comment: '用户ID',
    unsigned: true,
  })
  @IsNumber()
  id: number;

  // 用户名
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户名',
  })
  @IsString()
  username: string;

  // 密码
  @Column({
    type: 'varchar',
    length: 255,
    comment: '密码',
  })
  @IsString()
  password: string;

  // 账号状态
  @Column({
    comment: '帐号状态（0正常 1停用）',
    type: 'int',
    default: 0,
  })
  @IsNumber()
  status: number;

  @ManyToOne(type => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}