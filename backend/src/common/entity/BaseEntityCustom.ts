import { BaseEntity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IBaseEntityCustom } from '../interfaces/BaseEntityCustom.interface';

export abstract class BaseEntityCustom
  extends BaseEntity
  implements IBaseEntityCustom
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
