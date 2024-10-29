import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ILike, FindManyOptions } from 'typeorm';

import { CreateCourseDto, UpdateCourseDto } from '../DTO/course.dto';
import { Course } from '../entity/course.entity';
import { CourseQueryDto } from '../DTO/course.query.dto';
import { UserService } from 'src/user/services/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(private readonly userService: UserService,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}
 private readonly logger = new Logger(CourseService.name);

  async save(createCourseDto: CreateCourseDto, userId: string): Promise<Course> {
   try {
    const now = new Date();
    this.logger.log('check user id', userId);
    const user = await this.userService.findById(userId);
    this.logger.log('user found, create course');
    return await this.courseRepository.create({
      ...createCourseDto,
      createdBy: user,
      dateCreated:now,
    }).save();
   } catch (error) {
    this.logger.error(error.message);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);

   }
  }

  /**
   * Retrieves a list of courses based on the provided query parameters.
   * 
   * @param data - An object containing query parameters for filtering and pagination:
   *   - name: Optional. A string to filter courses by name using a LIKE query.
   *   - description: Optional. A string to filter courses by description using a LIKE query.
   *   - sortBy: Optional. A string indicating the field to sort the results by.
   *   - sortOrder: Optional. A string indicating the order of sorting (e.g., 'ASC' or 'DESC').
   *   - page: Optional. A number indicating the page of results to retrieve.
   *   - perPage: Optional. A number indicating the number of results per page.
   * 
   * @returns A promise that resolves to an object containing:
   *   - courses: An array of Course objects that match the query parameters.
   *   - totalItems: The total number of courses that match the query parameters.
   */
  async findAll(data: CourseQueryDto): Promise<{ courses: Course[], totalItems: number }> {
    const { name, description, sortBy, sortOrder, page, perPage } = data;
    const queryBuilder = this.courseRepository.createQueryBuilder('course');
    if (name) {
      queryBuilder.andWhere('course.name LIKE :name', { name: `%${name}%` });
    }
    if (description) {
      queryBuilder.andWhere('course.description LIKE :description', { description: `%${description}%` });
    }
    if (page) {
      queryBuilder.skip((page - 1) * perPage);
    }
    if (perPage) {
      queryBuilder.take(perPage);
    }
    const [courses, totalItems] = await queryBuilder.getManyAndCount();
    return { courses, totalItems };
  }

  async findById(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne(id);
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
    return await this.courseRepository.create({ id: course.id, ...updateCourseDto }).save();
  }

  /**
   * Removes the image URL from a specific course.
   * 
   * @param id - The unique identifier of the course from which the image URL will be removed.
   * @throws HttpException - If no course is found with the provided id.
   */
  async deleteImageUrl(id: string): Promise<void> {
    try {
      const course = await this.findById(id);
      course.imageUrl = null;
      await course.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const course = await this.findById(id);
      if (!course) {
       this.logger.error(`Could not find course with matching id ${id}`);
       return
      }
      await this.courseRepository.delete(id);
      return id;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async count(): Promise<number> {
    try { 
      return await this.courseRepository.count();
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
