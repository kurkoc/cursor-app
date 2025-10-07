import * as SecureStore from "expo-secure-store";

/**
 * Secure storage service using Expo SecureStore
 * Provides secure key-value storage for sensitive data
 */
class StorageService {
  /**
   * Store a value securely
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log(`Stored ${key} securely`);
    } catch (error) {
      console.error(`Failed to store ${key}:`, error);
      throw error;
    }
  }

  /**
   * Retrieve a value
   */
  async getItem(key: string): Promise<string | null> {
    try {
      const value = await SecureStore.getItemAsync(key);
      console.log(`Retrieved ${key}:`, value ? "found" : "not found");
      return value;
    } catch (error) {
      console.error(`Failed to retrieve ${key}:`, error);
      return null;
    }
  }

  /**
   * Remove a value
   */
  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log(`Removed ${key} securely`);
    } catch (error) {
      console.error(`Failed to remove ${key}:`, error);
      throw error;
    }
  }

  /**
   * Clear all stored values
   */
  async clear(): Promise<void> {
    try {
      // For SecureStore, we need to remove items individually
      // as there's no clear method
      const keys = ["accessToken", "refreshToken"];
      await Promise.all(keys.map((key) => SecureStore.deleteItemAsync(key)));
      console.log("Cleared all secure storage");
    } catch (error) {
      console.error("Failed to clear storage:", error);
      throw error;
    }
  }

  /**
   * Check if a key exists
   */
  async hasItem(key: string): Promise<boolean> {
    const value = await this.getItem(key);
    return value !== null;
  }
}

// Export singleton instance
export const storageService = new StorageService();

// Export class for testing
export { StorageService };
