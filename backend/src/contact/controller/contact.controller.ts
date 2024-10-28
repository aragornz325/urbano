import {
  Body,
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  HttpException,
} from '@nestjs/common';

import { ContactService } from '../services/contact.service';
import { CreateContactDto } from '../dto/contact.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createContactDto: CreateContactDto) {
  try {
    return this.contactService.create(createContactDto);
    } catch (error) {
      new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
