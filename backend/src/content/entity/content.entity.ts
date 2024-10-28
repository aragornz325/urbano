import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from '../../course/entity/course.entity';
import { IContent } from '../../common/interfaces/Contetnt.interface';
import { BaseEntityCustom } from '../../common/entity/BaseEntityCustom';

@Entity()
export class Content extends BaseEntityCustom implements IContent {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dateCreated: Date;

  @ManyToOne(() => Course, (course) => course.contents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

}




