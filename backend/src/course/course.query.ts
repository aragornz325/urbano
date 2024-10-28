export class CourseQuery {
  name?: string;
  description?: string;
  imageUrl?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  limit?: number;
  page?: number;
  perPage?: number;
}
