import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode, Req } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post(':courseId')
  @UseGuards(JwtGuard)
  @Roles(Role.User)
  @HttpCode(HttpStatus.CREATED)
  create(@Param('courseId') courseId: string, @Req() req: Request) {
    const userId = req.user['userId'];  
    return this.enrollmentService.enroll({userId, courseId});
  }

  @Get('/check/:courseId')
  @UseGuards(JwtGuard)
  @Roles(Role.User)
  isEnrolled(@Param('courseId') courseId: string, @Req() req: Request) {
    const userId = req.user['userId'];
    return this.enrollmentService.checkEnrollment(userId, courseId);
  }
}
