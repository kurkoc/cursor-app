import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Platform-specific storage service
 * Uses SecureStore on mobile, AsyncStorage on web
 */
class StorageService {
  /**
   * Store a value securely
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        await AsyncStorage.setItem(key, value);
      } else {
        // Use SecureStore for mobile platforms
        const { setItemAsync } = await import('expo-secure-store');
        await setItemAsync(key, value);
      }
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
      if (Platform.OS === 'web') {
        return await AsyncStorage.getItem(key);
      } else {
        // Use SecureStore for mobile platforms
        const { getItemAsync } = await import('expo-secure-store');
        return await getItemAsync(key);
      }
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
      if (Platform.OS === 'web') {
        await AsyncStorage.removeItem(key);
      } else {
        // Use SecureStore for mobile platforms
        const { deleteItemAsync } = await import('expo-secure-store');
        await deleteItemAsync(key);
      }
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
      if (Platform.OS === 'web') {
        await AsyncStorage.clear();
      } else {
        // For SecureStore, we need to remove items individually
        // as there's no clear method
        const { deleteItemAsync } = await import('expo-secure-store');
        const keys = ['accessToken', 'refreshToken'];
        await Promise.all(keys.map(key => deleteItemAsync(key)));
      }
    } catch (error) {
      console.error('Failed to clear storage:', error);
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

