// 数据实体基类
import { IsOptional, IsString } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn, Column, Timestamp } from 'typeorm';

export abstract class BaseEntity {
  // 创建时间
  @CreateDateColumn({
    name: "create_at",
    comment: "创建时间",
    type: "timestamp",
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  createAt: Date

  // 更新时间
  @UpdateDateColumn({
    name: "update_at",
    comment: "更新时间",
    type: "timestamp",
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  updateAt: Date

  // 创建人
  @Column({ name: "create_by", comment: "创建人", default: "", nullable: true, })
  createBy: string;

  // 更新人
  @Column({ name: "update_by", comment: "更新人", default: "", nullable: true, })
  updateBy: string;

  // 备注
  @Column({ name: "remark", comment: "备注", default: "", nullable: true, })
  @IsOptional()
  @IsString()
  remark?: string;
}
