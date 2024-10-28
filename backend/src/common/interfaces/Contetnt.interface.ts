import { Course } from '../../course/entity/course.entity';

export interface IContent {
  id: string;
  name: string;
  description: string;
  course: Course;
}
