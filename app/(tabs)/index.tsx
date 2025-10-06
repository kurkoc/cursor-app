import { useAuth } from "@/contexts/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();

  const coffeeCount = state.userData?.coffeeCount ?? 0;
  const progress = coffeeCount % 10;
  const freeEarned = Math.floor(coffeeCount / 10);

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-50 dark:bg-black"
      edges={["top", "bottom"]}
    >
      <ScrollView
        contentContainerClassName="px-4 pb-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                Hoşgeldiniz! 👋
              </Text>
              <Text className="text-base text-blue-700 dark:text-blue-300">
                Kahve keyfiniz için buradayız
              </Text>
            </View>
            <View className="w-16 h-16 rounded-full bg-blue-200 dark:bg-blue-800/30 items-center justify-center">
              <Feather
                name="coffee"
                size={28}
                color={colorScheme === "dark" ? "#60a5fa" : "#3b82f6"}
              />
            </View>
          </View>
        </View>
        <View className="bg-white dark:bg-neutral-900 rounded-xl p-6 mb-6 border border-neutral-200 dark:border-neutral-800">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <Text className="text-2xl font-medium text-black dark:text-white -tracking-tight mb-3">
                {progress}/10
              </Text>
            </View>

            {freeEarned > 0 && (
              <View className="flex-row items-center bg-amber-100 dark:bg-amber-900/30 rounded-full px-3 py-2">
                <Text className="text-lg font-bold text-amber-900 dark:text-amber-100 mr-1">
                  {freeEarned}
                </Text>
                <Feather
                  name="gift"
                  size={16}
                  color={colorScheme === "dark" ? "#fbbf24" : "#d97706"}
                />
              </View>
            )}
          </View>

          <View className="mb-4">
            <Text className="text-base font-medium text-neutral-600 dark:text-neutral-400 mb-3">
              {10 - progress > 0
                ? `Hadi yeni ikram için ${10 - progress} içecek daha! ☕`
                : "Tebrikler! Yeni ikram kazandınız! 🎉"}
            </Text>
            <View className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <View
                className="h-full bg-black dark:bg-white rounded-full"
                style={{ width: `${(progress / 10) * 100}%` }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
