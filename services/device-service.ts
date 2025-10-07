import { axiosInstance } from './api-client';
import type { CreateDeviceDto } from './types/api-types';

/**
 * Device Service
 * Handles device registration and management
 */
export class DeviceService {
  /**
   * Register a new device
   * POST /devices
   */
  async createDevice(data: CreateDeviceDto): Promise<void> {
    const response = await axiosInstance.post('/devices', data);
    return response.data;
  }
}

// Export singleton instance
export const deviceService = new DeviceService();

