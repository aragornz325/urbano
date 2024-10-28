import { Column, Entity } from 'typeorm';

import { BaseEntityCustom } from '../../common/entity/BaseEntityCustom';
import { IContactMessage } from '../../common/interfaces/ContactMessage.interface';

@Entity('contact_messages')
export class ContactMessage
  extends BaseEntityCustom
  implements IContactMessage
{
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dateCreated: Date;

  @Column('text')
  message: string;

  @Column({ default: 'pending' })
  status: string;
}
