import * as Device from "expo-device";
import { axiosInstance } from "./api-client";
import { storageService } from "./storage-service";
import type { CreateDeviceDto } from "./types/api-types";

/**
 * Device Service
 * Handles device registration and management
 */
export class DeviceService {
  /**
   * Get device information
   */
  private async getDeviceInfo(): Promise<CreateDeviceDto> {
    const deviceId = await storageService.getDeviceId();

    return {
      deviceId,
      type: Device.deviceType?.toString() || null,
      name: Device.deviceName,
      os: Device.osName,
      osVersion: Device.osVersion,
      model: Device.modelName,
      brand: Device.brand,
      isSimulator: Device.isDevice === false,
    };
  }

  /**
   * Register device if not already registered
   */
  async registerDeviceIfNeeded(): Promise<boolean> {
    try {
      // Check if device is already registered
      const isRegistered = await storageService.isDeviceRegistered();
      if (isRegistered) {
        console.log("Device already registered, skipping...");
        return true;
      }

      // Get device info and register
      const deviceInfo = await this.getDeviceInfo();
      await this.createDevice(deviceInfo);

      // Mark as registered
      await storageService.setDeviceRegistered(true);
      console.log("Device registered successfully");
      return true;
    } catch (error) {
      console.error("Failed to register device:", error);
      return false;
    }
  }

  /**
   * Register a new device
   * POST /devices
   */
  async createDevice(data: CreateDeviceDto): Promise<void> {
    const response = await axiosInstance.post("/devices", data);
    return response.data;
  }
}

// Export singleton instance
export const deviceService = new DeviceService();
