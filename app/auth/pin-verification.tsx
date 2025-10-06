import { useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PinVerificationScreen() {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();
  const { dispatch } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function handlePinChange(value: string, index: number): void {
    if (value.length > 1) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every(digit => digit !== '') && newPin.length === 6) {
      verifyPin(newPin.join(''));
    }
  }

  function handleKeyPress(e: any, index: number): void {
    if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function verifyPin(pinCode: string): Promise<void> {
    setIsVerifying(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUserData = {
      phoneNumber: '505 701 28 74',
      coffeeCount: 8,
      qrCode: 'USER-' + Date.now(),
      orders: [
        {
          id: '1',
          date: new Date(Date.now() - 86400000).toISOString(),
          items: ['Cappuccino'],
          total: 4.5,
        },
        {
          id: '2',
          date: new Date(Date.now() - 172800000).toISOString(),
          items: ['Latte', 'Croissant'],
          total: 7.0,
        },
      ],
    };

    dispatch({ type: 'login', payload: mockUserData });
    router.replace('/(tabs)');
  }

  function handleResend(): void {
    setPin(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Feather name="lock" size={48} color={isDark ? '#ffffff' : '#000000'} />
          </View>
          <Text style={[styles.title, isDark && styles.titleDark]}>Enter PIN Code</Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            We've sent a 6-digit code to your phone
          </Text>
        </View>

        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={[
                styles.pinInput,
                isDark && styles.pinInputDark,
                digit !== '' && styles.pinInputFilled,
                digit !== '' && isDark && styles.pinInputFilledDark,
              ]}
              value={digit}
              onChangeText={value => handlePinChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <Pressable onPress={handleResend} style={styles.resendButton}>
          <Text style={[styles.resendText, isDark && styles.resendTextDark]}>
            Didn't receive the code? Resend
          </Text>
        </Pressable>

        {isVerifying && (
          <Text style={[styles.verifyingText, isDark && styles.verifyingTextDark]}>
            Verifying...
          </Text>
        )}
      </View>
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
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 32,
  },
  pinInput: {
    width: 52,
    height: 56,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  pinInputDark: {
    borderColor: '#262626',
    color: '#ffffff',
    backgroundColor: '#0a0a0a',
  },
  pinInputFilled: {
    borderColor: '#000000',
    backgroundColor: '#fafafa',
  },
  pinInputFilledDark: {
    borderColor: '#ffffff',
    backgroundColor: '#171717',
  },
  resendButton: {
    alignItems: 'center',
    padding: 12,
  },
  resendText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  resendTextDark: {
    color: '#ffffff',
  },
  verifyingText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#737373',
    marginTop: 16,
  },
  verifyingTextDark: {
    color: '#a3a3a3',
  },
});

