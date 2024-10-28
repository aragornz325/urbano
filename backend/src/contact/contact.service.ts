import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { CreateContactDto } from './dto/contact.dto';
import { ContactMessage } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(ContactMessage)
    private contactMessageRepository: Repository<ContactMessage>,
    private configService: ConfigService,
  ) {}

  async create(createContactDto: CreateContactDto) {
    this.logger.log('Creating contact message');
    try {
      const contact = this.contactMessageRepository.create(createContactDto);
      await this.contactMessageRepository.save(contact);
      await this.sendEmail(contact);
      return contact;
    } catch (error) {
      this.logger.error(`Error creating contact message: ${error.message}`);
      throw new HttpException('Failed to create contact message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async sendEmail(contact: ContactMessage) {
    try {
      console.log(contact);
      const sentMail = await this.mailerService.sendMail({
        to: this.configService.get('ADMIN_EMAIL'),
        subject: 'New Contact Message from Web',
        html: `
          <h3>New Contact Message Received</h3>
          <p><strong>Name:</strong> ${contact.name.trim()}</p>
          <p><strong>Email:</strong> ${contact.email.trim()}</p>
          <p><strong>Message:</strong> ${contact.message.trim()}</p>
        `,
      });
      this.logger.debug(sentMail);
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
      throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
