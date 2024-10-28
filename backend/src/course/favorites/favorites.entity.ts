import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { Course } from '../course.entity';

@Entity('favorites')
//unique restriction
@Unique(['user', 'course'])
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, (course) => course.favorites, {
    onDelete: 'CASCADE',
  })
  course: Course;
}
