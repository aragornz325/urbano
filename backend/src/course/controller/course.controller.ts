import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Logger } from '@nestjs/common';

import { JwtGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateContentDto, UpdateContentDto } from '../../content/DTO/content.dto';
import { Content } from '../../content/entity/content.entity';
import { ContentQuery } from '../../content/content.query';
import { ContentService } from '../../content/services/content.service';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { CreateCourseDto, UpdateCourseDto } from '../DTO/course.dto';
import { Course } from '../course.entity';
import { CourseQueryDto } from '../DTO/course.query.dto';
import { CourseService } from '../services/course.service';
import { FavoriteService } from '../favorites/favorites.service';

@Controller('courses')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly contentService: ContentService,
    private readonly favoriteService: FavoriteService,
  ) {}

  private readonly logger = new Logger(CourseController.name);

  /**
   * create a new course
   * @param createCourseDto
   * @returns {Promise<Course>}
   * @throws {HttpException}
   */
  @Post()
  @Roles(Role.Admin, Role.Editor)
  async save(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      return await this.courseService.save(createCourseDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * find all courses
   * @param courseQuery
   * @returns {Promise<Course[]>}
   */
  @Get()
  async findAll(@Query() courseQuery: CourseQueryDto): Promise<Course[]> {
    try {
      return await this.courseService.findAll(courseQuery);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * find a course by id
   * @param courseId
   * @returns {Promise<Course>}
   */
  @Get('/:courseId')
  async findOne(@Param('courseId') courseId: string): Promise<Course> {
    try {
      return await this.courseService.findById(courseId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * update a course
   * @param courseId
   * @param updateCourseDto
   * @returns {Promise<Course>}
   */
  @Put('/:courseId')
  @Roles(Role.Admin, Role.Editor)
  async update(
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return await this.courseService.update(courseId, updateCourseDto);
  }

  /**
   * delete a course
   * @param courseId
   * @returns {Promise<string>}
   */
  @Delete('/:courseId')
  @Roles(Role.Admin)
  async delete(@Param('courseId') courseId: string): Promise<string> {
    try {
      return await this.courseService.delete(courseId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * save a content to a course
   * @param courseId
   * @param createContentDto
   * @returns {Promise<Content>}
   */
  @Post('/:courseId/contents')
  @Roles(Role.Admin, Role.Editor)
  async saveContent(
    @Param('courseId') courseId: string,
    @Body() createContentDto: CreateContentDto,
  ): Promise<Content> {
    try {
      return await this.contentService.save(courseId, createContentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * find all contents by course id
   * @param courseId
   * @param contentQuery
   * @returns {Promise<Content[]>}
   */
  @Get('/:courseId/contents')
  async findAllContentsByCourseId(
    @Param('courseId') courseId: string,
    @Query() contentQuery: ContentQuery,
  ): Promise<Content[]> {
    try {
      return await this.contentService.findAllByCourseId(
        courseId,
        contentQuery,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * delete the image url of a course
   * @param courseId
   * @returns {Promise<void>}
   */
  @Delete('/:courseId/image')
  @Roles(Role.Admin, Role.Editor)
  @HttpCode(HttpStatus.OK)
  async deleteUrlImageByCourseId(
    @Param('courseId') courseId: string,
  ): Promise<void> {
    try {
      await this.courseService.deleteImageUrl(courseId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * add a favorite to a course
   * @param courseId
   * @param req
   * @returns {Promise<void>}
   */
  @Post('/:courseId/favorite')
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(@Param('courseId') courseId: string, @Req() req: Request) {
    try {
      const userId = req.user['userId'];
      const course = await this.courseService.findById(courseId);
      return this.favoriteService.addFavorite(userId, course);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * remove a favorite from a course
   * @param courseId
   * @param request
   * @returns {Promise<void>}
   */
  @Delete('/:courseId/favorite')
  @HttpCode(HttpStatus.OK)
  async removeFavorite(
    @Param('courseId') courseId: string,
    @Req() request: Request,
  ) {
    try {
      const userId = request.user['userId'];
      const course = await this.courseService.findById(courseId);
      return this.favoriteService.removeFavorite(userId, course);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * check if a course is a favorite of a user
   * @param courseId
   * @param req
   * @returns {Promise<boolean>}
   */
  @Get('/:courseId/isFavorite')
  @HttpCode(HttpStatus.OK)
  async isFavorite(@Param('courseId') courseId: string, @Req() req: Request) {
    const userId = req.user['userId'];
    const course = await this.courseService.findById(courseId);
    return this.favoriteService.isFavorite(userId, course);
  }
  catch(error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /**
   * update a content of a course
   * @param courseId
   * @param contentId
   * @param updateContentDto
   * @returns {Promise<Content>}
   */
  @Put('/:courseId/contents/:contentId')
  @Roles(Role.Admin, Role.Editor)
  async updateContent(
    @Param('courseId') courseId: string,
    @Param('contentId') contentId: string,
    @Body() updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    try {
      return await this.contentService.update(
        courseId,
        contentId,
        updateContentDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * delete a content of a course
   * @param courseId
   * @param contentId
   * @returns {Promise<string>}
   */
  @Delete('/:courseId/contents/:contentId')
  @Roles(Role.Admin)
  async deleteContent(
    @Param('courseId') courseId: string,
    @Param('contentId') contentId: string,
  ): Promise<string> {
    try {
      return await this.contentService.delete(courseId, contentId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
