import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={isDark ? '#ffffff' : '#000000'} />
        </Pressable>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          Profil Bilgileri
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
            <Feather name="user" size={48} color={isDark ? '#ffffff' : '#000000'} />
          </View>
          <Text style={[styles.title, isDark && styles.titleDark]}>
            Profil
          </Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            Profil bilgileri yakında eklenecek
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  headerTitleDark: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    maxWidth: 400,
    width: '100%',
  },
  cardDark: {
    backgroundColor: '#0a0a0a',
    borderColor: '#262626',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  iconContainerDark: {
    backgroundColor: '#0a0a0a',
    borderColor: '#262626',
  },
  title: {
    fontSize: 24,
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
    textAlign: 'center',
  },
  subtitleDark: {
    color: '#a3a3a3',
  },
});

