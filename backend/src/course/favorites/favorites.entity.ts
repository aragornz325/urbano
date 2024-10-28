import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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
