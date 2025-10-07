import { axiosInstance } from './api-client';

/**
 * Health Service
 * Health check and environment info endpoints
 */
export class HealthService {
  /**
   * Check API health status
   * GET /health
   */
  async checkHealth(): Promise<void> {
    const response = await axiosInstance.get('/health');
    return response.data;
  }

  /**
   * Get environment information
   * GET /env
   */
  async getEnvironment(): Promise<void> {
    const response = await axiosInstance.get('/env');
    return response.data;
  }

  /**
   * Get root endpoint
   * GET /
   */
  async getRoot(): Promise<string> {
    const response = await axiosInstance.get<string>('/');
    return response.data;
  }
}

// Export singleton instance
export const healthService = new HealthService();

