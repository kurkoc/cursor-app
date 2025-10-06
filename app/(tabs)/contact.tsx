import { useColorScheme } from "@/hooks/use-color-scheme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-black">
      {/* Empty header - user menu will show */}
      <View className="h-16" />

      <View className="flex-1 justify-center items-center p-5">
        <View className="bg-white dark:bg-neutral-900 rounded-xl p-10 items-center border border-neutral-200 dark:border-neutral-800 max-w-[400px] w-full">
          <View className="w-24 h-24 rounded-full bg-neutral-50 dark:bg-neutral-900 items-center justify-center mb-6 border border-neutral-200 dark:border-neutral-800">
            <Feather
              name="mail"
              size={48}
              color={colorScheme === "dark" ? "#ffffff" : "#000000"}
            />
          </View>
          <Text className="text-2xl font-semibold text-black dark:text-white mb-2 -tracking-tight">
            İletişim
          </Text>
          <Text className="text-[15px] text-neutral-500 dark:text-neutral-400 text-center">
            İletişim formu yakında eklenecek
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
