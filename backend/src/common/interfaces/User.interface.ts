import { Content } from 'src/content/entity/content.entity';
import { Course } from 'src/course/entity/course.entity';

import { Favorite } from '../../course/favorites/favorites.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { Role } from '../../enums/role.enum';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: Role;
  refreshToken?: string;
  isActive: boolean;
  email: string;
  isEmailVerified: boolean;
  favorites: Favorite[];
  enrollments: Enrollment[];
  courses: Course[];
}
