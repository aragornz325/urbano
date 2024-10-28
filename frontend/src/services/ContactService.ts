import { CreateContactDto } from '../common/type/contact.type';
import apiService from './ApiService';
class ContactService {
  async createContact(data: CreateContactDto) {
    return apiService.post('api/contact', data);
  }
}

export default new ContactService();
