import { Course } from '../../course/entity/course.entity';
import { User } from '../../user/entity/user.entity';

export interface IEnrollment {
  id: string;
  user: User;
  course: Course;
  enrolledAt: Date;
}
