/**
 * Services barrel export
 * Central export point for all API services
 */

// API Client
export { apiClient, axiosInstance } from './api-client';
export type { ApiError } from './api-client';

// Storage Service
export { storageService, StorageService } from './storage-service';

// Types
export * from './types/api-types';

// Services
export { AccountService, accountService } from './account-service';
export { DeviceService, deviceService } from './device-service';
export { FeedbackService, feedbackService } from './feedback-service';
export { HealthService, healthService } from './health-service';

