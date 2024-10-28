import { CreateDateColumn, Entity, ManyToOne, Unique } from 'typeorm';

import { Course } from '../../course/entity/course.entity';
import { User } from '../../user/entity/user.entity';
import { IEnrollment } from '../../common/interfaces/Enrollment.interface';
import { BaseEntityCustom } from '../../common/entity/BaseEntityCustom';

@Entity('enrollments')
@Unique(['user', 'course'])
export class Enrollment extends BaseEntityCustom implements IEnrollment {
  @ManyToOne(() => User, (user) => user.enrollments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: 'CASCADE',
  })
  course: Course;

  @CreateDateColumn()
  dateCreated: Date;

  @CreateDateColumn()
  enrolledAt: Date;
}
