import * as SecureStore from "expo-secure-store";

/**
 * Storage keys
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  DEVICE_REGISTERED: "deviceRegistered",
  DEVICE_ID: "deviceId",
} as const;

/**
 * Secure storage service using Expo SecureStore
 * Provides secure key-value storage for sensitive data
 */
class StorageService {
  /**
   * Store a string value securely
   */
  async setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  /**
   * Store an object as JSON
   */
  async setObject<T>(key: string, value: T): Promise<void> {
    const jsonString = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonString);
  }

  /**
   * Retrieve a string value
   */
  async getItem(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  /**
   * Retrieve and deserialize an object from JSON
   */
  async getObject<T>(key: string): Promise<T | null> {
    const jsonString = await SecureStore.getItemAsync(key);
    if (jsonString === null) {
      return null;
    }

    try {
      return JSON.parse(jsonString) as T;
    } catch {
      return null;
    }
  }

  /**
   * Remove a value
   */
  async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  /**
   * Clear all stored values
   */
  async clear(): Promise<void> {
    // For SecureStore, we need to remove items individually
    // as there's no clear method
    const keys = Object.values(STORAGE_KEYS);
    await Promise.all(keys.map((key) => SecureStore.deleteItemAsync(key)));
  }

  /**
   * Check if a key exists
   */
  async hasItem(key: string): Promise<boolean> {
    const value = await this.getItem(key);
    return value !== null;
  }

  /**
   * Token management methods
   */
  async setToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  async getToken(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  async removeToken(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  async setRefreshToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  async getRefreshToken(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async removeRefreshToken(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Device registration flag methods
   */
  async setDeviceRegistered(registered: boolean): Promise<void> {
    await this.setItem(STORAGE_KEYS.DEVICE_REGISTERED, registered.toString());
  }

  async isDeviceRegistered(): Promise<boolean> {
    const value = await this.getItem(STORAGE_KEYS.DEVICE_REGISTERED);
    return value === "true";
  }

  /**
   * Device ID management methods
   */
  async getDeviceId(): Promise<string> {
    let deviceId = await this.getItem(STORAGE_KEYS.DEVICE_ID);

    if (!deviceId) {
      // Generate a new random device ID
      deviceId = this.generateDeviceId();
      await this.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }

    return deviceId;
  }

  private generateDeviceId(): string {
    // Generate a random UUID-like string
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    const randomPart2 = Math.random().toString(36).substring(2, 15);
    return `device_${timestamp}_${randomPart}${randomPart2}`;
  }
}

// Export singleton instance
export const storageService = new StorageService();

// Export class for testing
export { StorageService };
