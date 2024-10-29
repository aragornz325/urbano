import { forwardRef, Module } from '@nestjs/common';

import { ContentModule } from '../content/content.module';
import { CourseController } from './controller/course.controller';
import { CourseService } from './services/course.service';
import { FavoriteService } from './favorites/favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorites/favorites.entity';
import { UserModule } from 'src/user/user.module';
import { Course } from './entity/course.entity';

@Module({
  imports: [forwardRef(() => ContentModule), TypeOrmModule.forFeature([Favorite, Course]), UserModule],
  controllers: [CourseController],
  providers: [CourseService, FavoriteService],
  exports: [CourseService],
})
export class CourseModule {}
