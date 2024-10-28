import { Content } from '../../content/entity/content.entity';
import { Favorite } from '../../course/favorites/favorites.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { User } from '../../user/entity/user.entity';

export interface ICourse {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  createdBy: User;
  contents: Content[];
  favorites: Favorite[];
  enrollments: Enrollment[];
  dateCreated: Date;
}
