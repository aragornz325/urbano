import { forwardRef, Module } from '@nestjs/common';

import { CourseModule } from '../course/course.module';
import { ContentService } from './services/content.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => CourseModule), forwardRef(() => UserModule)],
  controllers: [],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
