import { Module } from '@nestjs/common';

import { ContentModule } from '../content/content.module';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { StatsController } from './controller/stats.controller';
import { StatsService } from './services/stats.service';

@Module({
  imports: [UserModule, ContentModule, CourseModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
