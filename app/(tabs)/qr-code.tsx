import { useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QrCodeScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();

  const qrValue = state.userData?.qrCode ?? 'NO-USER';

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-black" edges={['bottom']}>
      <View className="flex-1 p-5 justify-center">
        <View className="bg-white dark:bg-neutral-900 rounded-2xl p-10 items-center mb-6 shadow-2xl shadow-black/20 dark:shadow-black/50">
          <QRCode
            value={qrValue}
            size={220}
            backgroundColor={colorScheme === 'dark' ? '#0a0a0a' : '#ffffff'}
            color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
