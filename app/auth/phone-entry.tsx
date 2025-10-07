import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhoneEntryScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();

  function formatPhoneNumber(input: string): string {
    const digits = input.replace(/\D/g, '');
    
    // Turkish format: 5XX XXX XX XX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 8) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  }

  function handlePhoneChange(text: string): void {
    const formatted = formatPhoneNumber(text);
    if (formatted.replace(/\s/g, '').length <= 10) {
      setPhoneNumber(formatted);
    }
  }

  function isValidPhone(): boolean {
    const digits = phoneNumber.replace(/\s/g, '');
    const turkishPhoneRegex = /^5\d{9}$/;
    return turkishPhoneRegex.test(digits);
  }

  function handleContinue(): void {
    if (!isValidPhone()) return;
    const phoneDigits = phoneNumber.replace(/\s/g, '');
    router.push({
      pathname: '/auth/pin-verification',
      params: { phone: phoneDigits }
    });
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
              placeholder="5XX XXX XX XX"
              placeholderTextColor={colorScheme === 'dark' ? '#6b7280' : '#9ca3af'}
              keyboardType="phone-pad"
              maxLength={13}
              autoFocus
            />
          </View>

          <Pressable
            className={`h-14 rounded-lg items-center justify-center ${
              isValidPhone() 
                ? 'bg-black dark:bg-white' 
                : 'bg-neutral-100 dark:bg-neutral-800'
            }`}
            onPress={handleContinue}
            disabled={!isValidPhone()}
          >
            <Text className={`text-[15px] font-medium ${
              isValidPhone() 
                ? 'text-white dark:text-black' 
                : 'text-neutral-400 dark:text-neutral-600'
            }`}>
              Continue
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
