import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindManyOptions } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '../DTO/user.dto';
import { User } from '../entity/user.entity';
import { UserQueryDto } from '../DTO/user.query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async save(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByUsername(createUserDto.username);

    if (user) {
      throw new HttpException(
        `User with username ${createUserDto.username} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password } = createUserDto;
    createUserDto.password = await bcrypt.hash(password, 10);
    return this.userRepository.save(createUserDto);
  }

  async findAll(userQuery: UserQueryDto): Promise<{ users: User[], totalItems: number }> {
    try {
      const { page, perPage, role, ...searchFields } = userQuery;
      
      const whereClause: any = {};
      Object.keys(searchFields).forEach((key) => {
        whereClause[key] = ILike(`%${searchFields[key]}%`);
      });
      if (role) {
        this.logger.log('add role to where clause');
        whereClause.role = role;
      }
      
      this.logger.log('count total items');
      const totalItems = await User.count({ where: whereClause });
      this.logger.log('make find options');
      const findOptions: FindManyOptions<User> = {
        where: whereClause,
        take: perPage || 10,
        skip: page ? (page - 1) * (perPage || 10) : 0,
      };
  
      this.logger.log('find users');
      const users = await User.find(findOptions);
      return { users, totalItems };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      this.logger.error(`Could not find user with matching id ${id}`);
      throw new HttpException(
        `Could not find user with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } }); // Usa el repositorio inyectado
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const currentUser = await this.findById(id);

    if (currentUser.username === updateUserDto.username) {
      delete updateUserDto.username;
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.username) {
      if (await this.findByUsername(updateUserDto.username)) {
        throw new HttpException(
          `User with username ${updateUserDto.username} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.userRepository.save({ id, ...updateUserDto }); // Usa el repositorio inyectado
  }

  async delete(id: string): Promise<string> {
    const user = await this.findById(id);
    await this.userRepository.remove(user); // Usa el repositorio inyectado
    return id;
  }

  async count(): Promise<number> {
    return await this.userRepository.count(); // Usa el repositorio inyectado
  }

  async setRefreshToken(id: string, refreshToken: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.update(user.id, {
      refreshToken: refreshToken ? await bcrypt.hash(refreshToken, 10) : null,
    });
  }
}
