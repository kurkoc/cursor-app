import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DrinkItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Tümü" },
    { id: "hot", name: "Sıcak İçecekler" },
    { id: "cold", name: "Soğuk İçecekler" },
    { id: "frappuccino", name: "Frappuccino" },
    { id: "espresso", name: "Espresso" },
  ];

  const drinks: DrinkItem[] = [
    {
      id: "1",
      name: "Pumpkin Spice Latte",
      description: "Pumpkin spice aroması ile sıcak latte",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center",
      category: "hot",
    },
    {
      id: "2",
      name: "Iced Pumpkin Spice Latte",
      description: "Pumpkin spice aroması ile soğuk latte",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop&crop=center",
      category: "cold",
    },
    {
      id: "3",
      name: "Pumpkin Spice Frappuccino®",
      description: "Pumpkin spice aroması ile frappuccino",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      category: "frappuccino",
    },
    {
      id: "4",
      name: "Caramel Macchiato",
      description: "Karamel aroması ile macchiato",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center",
      category: "hot",
    },
    {
      id: "5",
      name: "Iced Caramel Macchiato",
      description: "Karamel aroması ile soğuk macchiato",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop&crop=center",
      category: "cold",
    },
    {
      id: "6",
      name: "Cappuccino",
      description: "Geleneksel cappuccino",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      category: "espresso",
    },
    {
      id: "7",
      name: "Americano",
      description: "Sade americano",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center",
      category: "espresso",
    },
    {
      id: "8",
      name: "Mocha",
      description: "Çikolata aroması ile mocha",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop&crop=center",
      category: "hot",
    },
    {
      id: "9",
      name: "Espresso",
      description: "Güçlü espresso",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      category: "espresso",
    },
    {
      id: "10",
      name: "Iced Coffee",
      description: "Soğuk kahve",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center",
      category: "cold",
    },
  ];

  const filteredDrinks =
    selectedCategory === "all"
      ? drinks
      : drinks.filter((drink) => drink.category === selectedCategory);

  const renderCategoryItem = ({ item }: { item: (typeof categories)[0] }) => (
    <Pressable
      onPress={() => setSelectedCategory(item.id)}
      className={`px-4 py-2 rounded-full mr-3 ${
        selectedCategory === item.id
          ? "bg-black dark:bg-white"
          : "bg-neutral-100 dark:bg-neutral-800"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          selectedCategory === item.id
            ? "text-white dark:text-black"
            : "text-neutral-700 dark:text-neutral-300"
        }`}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  const renderDrinkItem = ({ item }: { item: DrinkItem }) => (
    <View className="bg-white dark:bg-neutral-900 rounded-xl p-4 mb-4 border border-neutral-200 dark:border-neutral-800">
      <View className="flex-row items-center">
        <View className="w-16 h-16 rounded-lg overflow-hidden mr-4 bg-neutral-100 dark:bg-neutral-800">
          <Image
            source={{ uri: item.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-black dark:text-white mb-1">
            {item.name}
          </Text>
          <Text
            className="text-sm text-neutral-600 dark:text-neutral-400"
            numberOfLines={2}
          >
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-50 dark:bg-black"
      edges={["bottom"]}
    >
      <ScrollView
        contentContainerClassName="px-4 pt-12 pb-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View className="mb-6">
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>

        {/* Drinks */}
        <FlatList
          data={filteredDrinks}
          renderItem={renderDrinkItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
