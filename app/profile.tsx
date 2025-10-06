import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-black">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Feather name="chevron-left" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
        </Pressable>
        <Text className="text-lg font-semibold text-black dark:text-white">
          Profil Bilgileri
        </Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 justify-center items-center p-5">
        <View className="bg-white dark:bg-neutral-900 rounded-xl p-10 items-center border border-neutral-200 dark:border-neutral-800 max-w-[400px] w-full">
          <View className="w-24 h-24 rounded-full bg-neutral-50 dark:bg-neutral-900 items-center justify-center mb-6 border border-neutral-200 dark:border-neutral-800">
            <Feather name="user" size={48} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
          </View>
          <Text className="text-2xl font-semibold text-black dark:text-white mb-2 -tracking-tight">
            Profil
          </Text>
          <Text className="text-[15px] text-neutral-500 dark:text-neutral-400 text-center">
            Profil bilgileri yakında eklenecek
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
