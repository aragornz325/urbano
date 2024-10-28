import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ILike, FindManyOptions } from 'typeorm';

import { CreateCourseDto, UpdateCourseDto } from '../DTO/course.dto';
import { Course } from '../course.entity';
import { CourseQueryDto } from '../DTO/course.query.dto';

@Injectable()
export class CourseService {
 private readonly logger = new Logger(CourseService.name);

  async save(createCourseDto: CreateCourseDto): Promise<Course> {
    return await Course.create({
      ...createCourseDto,
      dateCreated: new Date(),
    }).save();
  }

  async findAll(courseQuery: CourseQueryDto): Promise<Course[]> {
    try {
      const { name, description, sortBy, sortOrder, page, perPage } = courseQuery;
    this.logger.debug(courseQuery);

    const whereClause: any = {};
    if (name) whereClause.name = name;
    if (description) whereClause.description = description;
    this.logger.debug(whereClause);

    const findOptions: FindManyOptions<Course> = {
      where: whereClause,
      order: {
        [sortBy || 'name']: sortOrder || 'ASC', 
      },
    };
    this.logger.debug(findOptions);
    
    const take = parseInt(perPage) || 10; 
    const skip = page ? (parseInt(page) - 1) * take : 0;
    findOptions.take = take;
    findOptions.skip = skip;
      this.logger.debug(findOptions);
      return await Course.find(findOptions);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findById(id: string): Promise<Course> {
    const course = await Course.findOne(id);
    if (!course) {
      throw new HttpException(
        `Could not find course with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findById(id);
    return await Course.create({ id: course.id, ...updateCourseDto }).save();
  }

  /**
   * Removes the image URL from a specific course.
   * 
   * @param id - The unique identifier of the course from which the image URL will be removed.
   * @throws HttpException - If no course is found with the provided id.
   */
  async deleteImageUrl(id: string): Promise<void> {
    const course = await this.findById(id);
    course.imageUrl = null;
    await course.save();
  }

  async delete(id: string): Promise<string> {
    const course = await this.findById(id);
    await Course.delete(course);
    return id;
  }

  async count(): Promise<number> {
    return await Course.count();
  }
}
