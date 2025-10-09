import { useAuth } from "@/contexts/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { accountService } from "@/services";
import type { OrderListDto } from "@/services/types/api-types";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();
  const [orders, setOrders] = useState<OrderListDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Fetch orders when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  async function fetchOrders() {
    if (!state.isAuthenticated) return;

    setIsLoading(true);
    setHasError(false);

    try {
      const backendOrders = await accountService.getCustomerOrders();
      setOrders(backendOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function renderOrder({ item }: { item: OrderListDto }) {
    const hasReward = item.earnedReward > 0;

    return (
      <View className="bg-white dark:bg-neutral-900 rounded-xl px-2 py-3 mb-3 border border-neutral-200 dark:border-neutral-800 mx-0">
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Feather
                name="calendar"
                size={14}
                color={colorScheme === "dark" ? "#a3a3a3" : "#737373"}
              />
              <Text className="text-sm font-medium text-neutral-600 dark:text-neutral-400 ml-2">
                {formatDate(item.orderDate)}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-black dark:text-white mr-2">
                {item.coffeeCount}
              </Text>
              <Feather
                name="coffee"
                size={20}
                color={colorScheme === "dark" ? "#ffffff" : "#000000"}
              />
            </View>
          </View>

          {hasReward && (
            <View className="flex-row items-center bg-amber-100 dark:bg-amber-900/30 rounded-full px-3 py-2">
              <Text className="text-lg font-bold text-amber-900 dark:text-amber-100 mr-1">
                {item.earnedReward}
              </Text>
              <Feather
                name="gift"
                size={18}
                color={colorScheme === "dark" ? "#fbbf24" : "#d97706"}
              />
            </View>
          )}
        </View>
      </View>
    );
  }

  function renderLoadingState() {
    return (
      <View className="items-center justify-center pt-20">
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#ffffff" : "#000000"}
        />
        <Text className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
          Loading orders...
        </Text>
      </View>
    );
  }

  function renderErrorState() {
    return (
      <View className="items-center justify-center pt-20">
        <View className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 items-center justify-center mb-5 border border-red-200 dark:border-red-800">
          <Feather
            name="alert-circle"
            size={40}
            color={colorScheme === "dark" ? "#fca5a5" : "#dc2626"}
          />
        </View>
        <Text className="text-lg font-semibold text-black dark:text-white mb-2">
          Failed to load orders
        </Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          Please try again
        </Text>
        <Pressable
          onPress={fetchOrders}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-medium">Retry</Text>
        </Pressable>
      </View>
    );
  }

  function renderEmptyState() {
    return (
      <View className="items-center justify-center pt-20">
        <View className="w-20 h-20 rounded-full bg-neutral-50 dark:bg-neutral-900 items-center justify-center mb-5 border border-neutral-200 dark:border-neutral-800">
          <Feather
            name="coffee"
            size={40}
            color={colorScheme === "dark" ? "#404040" : "#d4d4d4"}
          />
        </View>
        <Text className="text-lg font-semibold text-black dark:text-white mb-2">
          No orders yet
        </Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400">
          Your order history will appear here
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-50 dark:bg-black"
      edges={["bottom"]}
    >
      <View className="px-5 pt-12 pb-4">
        <View className="mb-6">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-3">
              <Feather
                name="shopping-bag"
                size={16}
                color={colorScheme === "dark" ? "#60a5fa" : "#3b82f6"}
              />
            </View>
            <Text className="text-2xl font-bold text-black dark:text-white">
              Sipariş Geçmişi
            </Text>
          </View>
        </View>
        {isLoading ? (
          renderLoadingState()
        ) : hasError ? (
          renderErrorState()
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id}
            contentContainerClassName="px-0 pb-5"
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
