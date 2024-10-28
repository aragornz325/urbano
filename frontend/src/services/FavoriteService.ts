import { IFavorite } from '../models/Favorite/Favorite';
import apiService from './ApiService';

class FavoriteService {
  /**
   * Get all favorites
   * @returns {Promise<IFavorite[]>} All favorites
   */
  async findAll(): Promise<IFavorite[]> {
    return (await apiService.get<IFavorite[]>('/api/favorites')).data;
  }

  /**
   * Add a course to the favorites
   * @param courseId - The id of the course to add to the favorites
   * @returns {Promise<void>}
   */
  async addToFavorite(courseId: string): Promise<void> {
    await apiService.post(`/api/courses/${courseId}/favorite`);
  }

  /**
   * Remove a course from the favorites
   * @param courseId - The id of the course to remove from the favorites
   * @returns {Promise<void>}
   */
  async removeFromFavorite(courseId: string): Promise<void> {
    await apiService.delete(`/api/courses/${courseId}/favorite`);
  }

  /**
   * Check if a course is a favorite
   * @param courseId - The id of the course to check if it is a favorite
   * @returns {Promise<boolean>} True if the course is a favorite, false otherwise
   */
  async isFavorite(courseId: string): Promise<boolean> {
    const response = await apiService.get<{ isFavorite: boolean }>(
      `/api/courses/${courseId}/isFavorite`,
    );
    return response.data.isFavorite;
  }
}

export default new FavoriteService();
