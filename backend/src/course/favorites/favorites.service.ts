import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorites.entity';
import { Course } from '../course.entity';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/services/user.service';

@Injectable() // Asegúrate de que esté aquí
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private userService: UserService,
  ) {}
  private readonly logger = new Logger(FavoriteService.name);

  /**
   * Add a favorite to the database
   * @param user - The user to add the favorite to
   * @param course - The course to add to the favorite
   * @returns The favorite that was added
   */
  async addFavorite(userId: string, course: Course): Promise<Favorite> {
    const user = await this.userService.findById(userId);
    const favorite = await this.favoriteRepository.upsert(
      { user, course },
      { conflictPaths: ['user', 'course'] }
    );
    this.logger.log(
      `added favorite for user ${user.id} and course ${course.id}`,
    );
    return favorite.generatedMaps[0] as Favorite;
  }

  /**
   * Remove a favorite from the database
   * @param user - The user to remove the favorite from
   * @param course - The course to remove from the favorite
   */
  async removeFavorite(userId: string, course: Course): Promise<void> {
    const user = await this.userService.findById(userId);
    await this.favoriteRepository.delete({ user, course });
    this.logger.log(
      `removed favorite for user ${user.id} and course ${course.id}`,
    );
  }

  /**
 * Check if a course is a favorite of a user
 * @param userId - The id of the user
 * @param course - The course to check if it is a favorite
 * @returns True if the course is a favorite, false otherwise
 */
async isFavorite(userId: string, course: Course): Promise<{ isFavorite: boolean }> {
  this.logger.log(`Checking if course ${course.id} is a favorite for user ${userId}`);

  const favorite = await Favorite.createQueryBuilder('favorite')
    .leftJoinAndSelect('favorite.user', 'user')
    .leftJoinAndSelect('favorite.course', 'course')
    .where('user.id = :userId', { userId })
    .andWhere('course.id = :courseId', { courseId: course.id })
    .getOne();

  this.logger.log(`Favorite found: ${favorite ? 'Yes' : 'No'}`);
  return { isFavorite: !!favorite };
}


  
}
