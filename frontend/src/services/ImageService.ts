import apiService from './ApiService';

class ImageService {
  async uploadImage({ url, id }: { url: string; id: string }): Promise<void> {
    try {
      await apiService.delete(`/api/image`, { data: { url } });
      await apiService.delete(`/api/courses/${id}/image`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ImageService();
