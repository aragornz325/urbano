import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ILike, FindManyOptions } from 'typeorm';

import { CreateCourseDto, UpdateCourseDto } from '../DTO/course.dto';
import { Course } from '../entity/course.entity';
import { CourseQueryDto } from '../DTO/course.query.dto';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class CourseService {
  constructor(private readonly userService: UserService) {}
 private readonly logger = new Logger(CourseService.name);

  async save(createCourseDto: CreateCourseDto, userId: string): Promise<Course> {
   try {
    const now = new Date();
    this.logger.log('check user id', userId);
    const user = await this.userService.findById(userId);
    this.logger.log('user found, create course');
    return await Course.create({
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
   * @param courseQuery - An object containing query parameters for filtering and sorting courses.
   *   - name: Optional. Filters courses by name.
   *   - description: Optional. Filters courses by description.
   *   - sortBy: Optional. Specifies the field to sort by. Defaults to 'name'.
   *   - sortOrder: Optional. Specifies the order of sorting ('ASC' or 'DESC'). Defaults to 'ASC'.
   *   - page: Optional. Specifies the page number for pagination.
   *   - perPage: Optional. Specifies the number of items per page for pagination. Defaults to 10.
   * 
   * @returns A promise that resolves to an object containing:
   *   - courses: An array of Course objects that match the query.
   *   - totalItems: The total number of courses that match the query.
   * 
   * @throws HttpException - If an error occurs during the retrieval process.
   */
  async findAll(courseQuery: CourseQueryDto): Promise<{ courses: Course[], totalItems: number }> {
    try {
      this.logger.log(`retrieving courses with query: ${JSON.stringify(courseQuery)}`);
      const { name, description, sortBy, sortOrder, page, perPage } = courseQuery;
  
      const whereClause: any = {};
      if (name) whereClause.name = name;
      if (description) whereClause.description = description;
      const totalItems = await Course.count({ where: whereClause });
      
      this.logger.log(`creating query for courses`);
      const courses = await Course.createQueryBuilder('course')
        .leftJoinAndSelect('course.createdBy', 'createdBy')
        .select([
          'course.id',
          'course.name',
          'course.description',
          'course.imageUrl',
          'createdBy.id',
        ])
        .where(whereClause)
        .orderBy(sortBy || 'course.name', sortOrder || 'ASC')
        .take(perPage || 10)
        .skip(page ? (page - 1) * (perPage || 10) : 0)
        .getMany();
  
      this.logger.log(`courses found: ${courses.length}`);
      return { courses, totalItems };
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
      await Course.delete(id);
      return id;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async count(): Promise<number> {
    try { 
      return await Course.count();
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
