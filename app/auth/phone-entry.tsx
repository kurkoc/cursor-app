import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhoneEntryScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  function formatPhoneNumber(input: string): string {
    const digits = input.replace(/\D/g, '');
    
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
    return digits.length === 10;
  }

  function handleContinue(): void {
    if (!isValidPhone()) return;
    router.push('/auth/pin-verification');
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Feather name="coffee" size={48} color={isDark ? '#ffffff' : '#000000'} />
            </View>
            <Text style={[styles.title, isDark && styles.titleDark]}>Coffee Loyalty</Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Enter your phone number to get started
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Phone Number</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              placeholder="505 701 28 74"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              keyboardType="phone-pad"
              maxLength={13}
              autoFocus
            />
          </View>

          <Pressable
            style={[
              styles.button,
              isValidPhone() && styles.buttonActive,
              !isValidPhone() && styles.buttonInactive,
            ]}
            onPress={handleContinue}
            disabled={!isValidPhone()}
          >
            <Text style={[
              styles.buttonText,
              isValidPhone() && styles.buttonTextActive,
              !isValidPhone() && styles.buttonTextInactive,
            ]}>
              Continue
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginBottom: 48,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  titleDark: {
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 15,
    color: '#737373',
    lineHeight: 22,
  },
  subtitleDark: {
    color: '#a3a3a3',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  labelDark: {
    color: '#ffffff',
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  inputDark: {
    borderColor: '#262626',
    color: '#ffffff',
    backgroundColor: '#0a0a0a',
  },
  button: {
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#000000',
  },
  buttonInactive: {
    backgroundColor: '#f5f5f5',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  buttonTextActive: {
    color: '#ffffff',
  },
  buttonTextInactive: {
    color: '#a3a3a3',
  },
});

