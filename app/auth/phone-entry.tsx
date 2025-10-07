import { useColorScheme } from '@/hooks/use-color-scheme';
import { accountService } from '@/services/account-service';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhoneEntryScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  function handlePhoneChange(text: string): void {
    // Only allow digits
    const digits = text.replace(/\D/g, '');
    if (digits.length <= 10) {
      setPhoneNumber(digits);
    }
  }

  function isValidPhone(): boolean {
    const turkishPhoneRegex = /^5\d{9}$/;
    return turkishPhoneRegex.test(phoneNumber);
  }

  async function handleContinue(): Promise<void> {
    if (!isValidPhone() || isLoading) return;
    
    setIsLoading(true);
    
    try {
      await accountService.register({ phone: phoneNumber });
      router.push({
        pathname: '/auth/pin-verification',
        params: { phone: phoneNumber }
      });
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert(
        'Registration Failed',
        'Unable to register phone number. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-8 justify-center max-w-[440px] w-full self-center">
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full border-2 border-black dark:border-white items-center justify-center">
              <Feather name="coffee" size={40} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-black dark:text-white mb-2">
              Phone Number
            </Text>
            <TextInput
              className="h-14 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 text-base text-black dark:text-white bg-white dark:bg-neutral-900"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              placeholder="5XXXXXXXXX"
              placeholderTextColor={colorScheme === 'dark' ? '#6b7280' : '#9ca3af'}
              keyboardType="phone-pad"
              maxLength={10}
              autoFocus
            />
          </View>

          <Pressable
            className={`h-14 rounded-lg items-center justify-center ${
              isValidPhone() && !isLoading
                ? 'bg-black dark:bg-white' 
                : 'bg-neutral-100 dark:bg-neutral-800'
            }`}
            onPress={handleContinue}
            disabled={!isValidPhone() || isLoading}
          >
            <Text className={`text-[15px] font-medium ${
              isValidPhone() && !isLoading
                ? 'text-white dark:text-black' 
                : 'text-neutral-400 dark:text-neutral-600'
            }`}>
              {isLoading ? 'Registering...' : 'Continue'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
