import apiService from './ApiService';

class EnrollmentService {
  /**
   * Enroll in a course
   * @param courseId - The id of the course to enroll in
   * @returns {Promise<void>}
   */
  async enroll(courseId: string): Promise<void> {
    await apiService.post(`/api/enrollment/${courseId}`);
  }

  /**
   * Check if a user is enrolled in a course
   * @param courseId - The id of the course to check
   * @returns {Promise<boolean>}
   */
  async isEnrolled(courseId: string): Promise<boolean> {
    try {
      const response = await apiService.get(
        `/api/enrollment/check/${courseId}`,
      );
      return response.data.isEnrolled;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  }
}

export default new EnrollmentService();
