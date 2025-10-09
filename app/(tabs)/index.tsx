import { useAuth } from "@/contexts/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const coffeeCount = state.userData?.currentCoffees ?? 0;
  const progress = coffeeCount % 10;
  const freeEarned = Math.floor(coffeeCount / 10);

  // Drink recommendations data
  const drinkRecommendations = [
    {
      id: "1",
      name: "Pumpkin Spice Latte",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: "2",
      name: "Iced Pumpkin Spice Latte",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: "3",
      name: "Pumpkin Spice Frappuccino®",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: "4",
      name: "Pumpkin Spice Cream Frappuccino®",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: "5",
      name: "Caramel Macchiato",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: "6",
      name: "Iced Caramel Macchiato",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: "7",
      name: "Cappuccino",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: "8",
      name: "Americano",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: "9",
      name: "Mocha",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: "10",
      name: "Espresso",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center",
    },
  ];

  const renderDrinkItem = ({
    item,
  }: {
    item: (typeof drinkRecommendations)[0];
  }) => (
    <View className="items-center mr-6">
      <View className="w-16 h-16 rounded-xl overflow-hidden mb-3 bg-neutral-100 dark:bg-neutral-800">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <Text
        className="text-sm text-center text-black dark:text-white font-medium"
        numberOfLines={2}
        style={{ maxWidth: 80 }}
      >
        {item.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-50 dark:bg-black"
      edges={["bottom"]}
    >
      <ScrollView
        contentContainerClassName="px-4 pt-6 pb-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                Hoşgeldiniz! 👋
              </Text>
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

        {/* Drink Recommendations Section */}
        <View className="bg-white dark:bg-neutral-900 rounded-xl p-6 mb-6 border border-neutral-200 dark:border-neutral-800">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-black dark:text-white">
              Bunları denedin mi?
            </Text>
            <Pressable onPress={() => router.push("/menu")}>
              <Text className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                Tümü →
              </Text>
            </Pressable>
          </View>

          <FlatList
            data={drinkRecommendations}
            renderItem={renderDrinkItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
