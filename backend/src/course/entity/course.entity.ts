import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntityCustom } from '../../common/entity/BaseEntityCustom';
import { ICourse } from '../../common/interfaces/Course.interface';
import { Content } from '../../content/entity/content.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { User } from '../../user/entity/user.entity';
import { Favorite } from '../favorites/favorites.entity';

@Entity()
export class Course extends BaseEntityCustom implements ICourse {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dateCreated: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @OneToMany(() => Content, (content) => content.course)
  contents: Content[];

  @OneToMany(() => Favorite, (favorite) => favorite.course)
  favorites: Favorite[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
