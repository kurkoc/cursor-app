import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { storageService } from './storage-service';

// Base URL - can be configured via app.json extra config or environment
const BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5050';

export interface ApiError {
  message: string;
  errors?: string[];
  statusCode?: number;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await storageService.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );


    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        if (error.response) {
          // Handle 401 - refresh token or redirect to login
          if (error.response.status === 401) {
            // Implement token refresh logic here
            // For now, just reject
            // You might want to clear tokens and redirect to auth screen
          }

          // Transform error response
          const apiError: ApiError = {
            message: error.message,
            errors: error.response.data as string[] | undefined,
            statusCode: error.response.status,
          };

          return Promise.reject(apiError);
        }

        return Promise.reject({
          message: error.message || 'Network error occurred',
          statusCode: 0,
        } as ApiError);
      }
    );
  }


  // Expose the axios instance
  public getInstance(): AxiosInstance {
    return this.client;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export const axiosInstance = apiClient.getInstance();

