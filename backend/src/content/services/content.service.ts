import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { getRepository, ILike } from 'typeorm';

import { CourseService } from '../../course/services/course.service';
import { CreateContentDto, UpdateContentDto } from '../DTO/content.dto';
import { Content } from '../entity/content.entity';
import { ContentQuery } from '../content.query';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ContentService {
  constructor(private readonly courseService: CourseService, private readonly userService: UserService) {}

  private readonly logger = new Logger(ContentService.name);

  async save(
    courseId: string,
    data: CreateContentDto,
    userId: string
  ): Promise<Content> {
    try {
      const now = new Date();
      this.logger.log('save content');
      
      // check if course exists
      this.logger.log('find course');
      const course = await this.courseService.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      this.logger.log('create content');
  
      // create content and save
      const content = Content.create({
        ...data,
        course,
        updatedAt: now,
        dateCreated: now,
      });
      
      return await content.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async findAll(contentQuery: ContentQuery): Promise<Content[]> {
    try {
      Object.keys(contentQuery).forEach((key) => {
        contentQuery[key] = ILike(`%${contentQuery[key]}%`);
    });

    
  
    return await Content.find({
      where: contentQuery,
      order: {
        name: 'ASC',
        description: 'ASC',
      },
      }) as Content[];
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

  async findById(id: string): Promise<Content> {
    try {
      const content = await Content.findOne(id);

    if (!content) {
      throw new HttpException(
        `Could not find content with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }


      return content;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByCourseIdAndId(courseId: string, id: string): Promise<Content> {
    try {
      const content = await Content.findOne({ where: { courseId, id } });
      if (!content) {
      throw new HttpException(
        `Could not find content with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
      return content;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByCourseId(courseId: string, contentQuery: ContentQuery): Promise<Content[]> {
    try { 
    const contentRepository = getRepository(Content);
  
    this.logger.log('find all by course id');
    const whereClause: any = { course: { id: courseId } };
    if (contentQuery.name) whereClause.name = ILike(`%${contentQuery.name}%`);
    if (contentQuery.description) whereClause.description = ILike(`%${contentQuery.description}%`);
  
    this.logger.log('find contents');
    const contents = await contentRepository.find({
      where: whereClause,
      order: {
        name: 'ASC',
        description: 'ASC',
      },
    });
  

    this.logger.log('contents found');
    return contents;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }




  async update(
    courseId: string,
    id: string,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    try { 
      const content = await this.findByCourseIdAndId(courseId, id);
      return await Content.create({ id: content.id, ...updateContentDto }).save();
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(courseId: string, id: string): Promise<string> {
    try {
      const content = await this.findByCourseIdAndId(courseId, id);
      await Content.delete(content);
      return id;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async count(): Promise<number> {
    try {     
      return await Content.count();
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
