import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';

import { Favorite } from '../../course/favorites/favorites.entity';
import { Role } from '../../enums/role.enum';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { Course } from '../../course/entity/course.entity';
import { Content } from '../../content/entity/content.entity';
import { IUser } from '../../common/interfaces/User.interface';
import { BaseEntityCustom } from '../../common/entity/BaseEntityCustom';

@Entity()
export class User extends BaseEntityCustom implements IUser {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @CreateDateColumn()
  dateCreated: Date;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ unique: true }) 
  email: string;

  @Column({ default: false }) 
  isEmailVerified: boolean;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Course, (course) => course.createdBy)
  courses: Course[];
}

