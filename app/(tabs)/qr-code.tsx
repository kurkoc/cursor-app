import { useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QrCodeScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const qrValue = state.userData?.qrCode ?? 'NO-USER';

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['bottom']}>
      <View style={styles.content}>
        <View style={[styles.qrCard, isDark && styles.qrCardDark]}>
          <QRCode
            value={qrValue}
            size={220}
            backgroundColor={isDark ? '#0a0a0a' : '#ffffff'}
            color={isDark ? '#ffffff' : '#000000'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  qrCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  qrCardDark: {
    backgroundColor: '#0a0a0a',
    shadowColor: '#000',
    shadowOpacity: 0.5,
  },
});
