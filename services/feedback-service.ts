import { axiosInstance } from './api-client';
import type { FeedbackSaveDto } from './types/api-types';

/**
 * Feedback Service
 * Handles customer feedback operations
 */
export class FeedbackService {
  /**
   * Submit customer feedback
   * POST /feedbacks
   */
  async createFeedback(data: FeedbackSaveDto): Promise<void> {
    const response = await axiosInstance.post('/feedbacks', data);
    return response.data;
  }
}

// Export singleton instance
export const feedbackService = new FeedbackService();

