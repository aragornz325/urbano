import { Module } from '@nestjs/common';
import { EnrollmentService } from './services/enrollment.service';
import { EnrollmentController } from './controller/enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { UserModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [TypeOrmModule.forFeature([Enrollment]), UserModule, CourseModule, MailerModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
