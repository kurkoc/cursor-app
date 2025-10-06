import { useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();
  
  const coffeeCount = state.userData?.coffeeCount ?? 0;
  const progress = coffeeCount % 10;
  const freeEarned = Math.floor(coffeeCount / 10);

  function renderCoffeeCups(): JSX.Element[] {
    const cups = [];
    for (let i = 0; i < 10; i++) {
      const isFilled = i < progress;
      cups.push(
        <View
          key={i}
          className={`w-[52px] h-[52px] rounded-lg items-center justify-center border ${
            isFilled
              ? 'bg-neutral-100 dark:bg-neutral-800 border-black dark:border-white'
              : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
          }`}
        >
          <Feather 
            name="coffee" 
            size={24} 
            color={
              isFilled 
                ? (colorScheme === 'dark' ? '#ffffff' : '#000000')
                : (colorScheme === 'dark' ? '#404040' : '#d4d4d4')
            }
          />
        </View>
      );
    }
    return cups;
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-black" edges={['bottom']}>
      <ScrollView contentContainerClassName="p-5" showsVerticalScrollIndicator={false}>
        <View className="bg-white dark:bg-neutral-900 rounded-xl p-6 mb-4 border border-neutral-200 dark:border-neutral-800">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-sm font-medium text-black dark:text-white">
              Progress
            </Text>
            <Text className="text-3xl font-semibold text-black dark:text-white -tracking-tight">
              {progress}/10
            </Text>
          </View>

          <View className="mb-6">
            <View className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mb-2">
              <View 
                className="h-full bg-black dark:bg-white rounded-full"
                style={{ width: `${(progress / 10) * 100}%` }} 
              />
            </View>
            <Text className="text-[13px] text-neutral-500 dark:text-neutral-400">
              {10 - progress} more to earn your free coffee
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-center gap-2.5">
            {renderCoffeeCups()}
          </View>
        </View>

        {freeEarned > 0 && (
          <View className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200 dark:border-neutral-800">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-base font-semibold text-black dark:text-white mb-1">
                  Free Coffee Available
                </Text>
                <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                  You have {freeEarned} free {freeEarned === 1 ? 'coffee' : 'coffees'} ready
                </Text>
              </View>
              <Text className="text-3xl font-bold">
                {freeEarned}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
