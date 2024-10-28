import { Course } from '../models/course/Course';
import CourseQuery from '../models/course/CourseQuery';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import UpdateCourseRequest from '../models/course/UpdateCourseRequest';
import apiService from './ApiService';

class CourseService {
  async save(
    courseData: CreateCourseRequest & { file?: File; imageUrl: string },
  ): Promise<void> {
    const data = {
      name: courseData.name,
      description: courseData.description,
      imageUrl: courseData.imageUrl,
    };

    await apiService.post('/api/courses', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async findAll(
    data: CourseQuery,
  ): Promise<{ courses: Course[]; totalItems: number }> {
    return (
      await apiService.get<{ courses: Course[]; totalItems: number }>(
        '/api/courses',
        {
          params: data,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    ).data;
  }

  async findOne(id: string): Promise<Course> {
    return (await apiService.get<Course>(`/api/courses/${id}`)).data;
  }

  async update(
    id: string,
    updateCourseRequest: UpdateCourseRequest,
  ): Promise<void> {
    await apiService.put(`/api/courses/${id}`, updateCourseRequest);
  }

  async delete(id: string): Promise<void> {
    await apiService.delete(`/api/courses/${id}`);
  }

  async deleteImage({ url, id }: { url: string; id: string }): Promise<void> {
    try {
      await apiService.delete(`/api/image`, { data: { url } });
      await apiService.delete(`/api/courses/${id}/image`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CourseService();
