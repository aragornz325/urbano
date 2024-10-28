import { Injectable, Logger } from '@nestjs/common';
import { Enrollment } from './entities/enrollment.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private readonly userService: UserService,
    private readonly courseService: CourseService,
  ) {}
  private readonly logger = new Logger(EnrollmentService.name);

  /**
   * Enroll a user in a course
   * @param userId - The id of the user
   * @param courseId - The id of the course
   * @returns The enrollment that was created
   */
  async enroll({
    userId,
    courseId,
  }: {
    userId: string;
    courseId: string;
  }): Promise<Enrollment> {
    const user = await this.userService.findById(userId);
    const course = await this.courseService.findById(courseId);
    const enrollment = new Enrollment();
    enrollment.user = user;
    enrollment.course = course;
    const isEnrolled = await this.checkEnrollment(userId, courseId);
    if (isEnrolled.isEnrolled) {
      this.logger.log(
        `User ${user.id} is already enrolled in course ${course.id}`,
      );
      return enrollment;
    }
    this.logger.log(
      `User ${user.id} is not enrolled in course ${course.id}, enrolling...`,
    );
    await this.enrollmentRepository.upsert(enrollment, {
      conflictPaths: ['user', 'course'],
    });

    // Dispara un correo de confirmación
    this.logger.log(`Sending confirmation email to user ${user.id}`);
    await this.sendConfirmationEmail(user, course);
    this.logger.log(`User ${user.id} enrolled in course ${course.id}`);
    return enrollment;
  }

  /**
   * Unenroll a user from a course
   * @param user - The user to unenroll
   * @param course - The course to unenroll from
   */
  async unenroll(user: User, course: Course): Promise<void> {
    this.logger.log(`Unenrolling user ${user.id} from course ${course.id}`);
    await this.enrollmentRepository.delete({ user, course });
    this.logger.log(`User ${user.id} unenrolled from course ${course.id}`);
  }

  /**
   * Check if a user is enrolled in a course
   * @param userId - The id of the user to check
   * @param courseId - The id of the course to check
   * @returns An object containing a boolean indicating if the user is enrolled
   */
  async checkEnrollment(
    userId: string,
    courseId: string,
  ): Promise<{ isEnrolled: boolean }> {
    this.logger.log(
      `Checking enrollment for user ${userId} and course ${courseId}`,
    );

    const enrollment = await this.enrollmentRepository.findOne({
      where: {
        user: userId,
        course: courseId,
      },
    });

    this.logger.debug(`Enrollment found: ${enrollment}`);
    return { isEnrolled: enrollment !== null && enrollment !== undefined };
  }

  /**
   * Send a confirmation email to a user
   * @param user - The user to send the email to
   * @param course - The course to send the email about
   */
  private async sendConfirmationEmail(user: User, course: Course) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `Confirmación de inscripción al curso ${course.name}`,
      template: './confirmation', // Plantilla en la carpeta de templates
      context: {
        userName: user.firstName,
        courseName: course.name,
      },
    });
  }
}
