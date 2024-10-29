import { Course } from '../course/Course';
import User from '../user/User';

export interface IFavorite {
  id: number;
  user: User;
  course: Course;
}
