import { Order, useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  function renderOrder({ item }: { item: Order }): JSX.Element {
    return (
      <View className="bg-white dark:bg-neutral-900 rounded-xl p-5 mb-3 border border-neutral-200 dark:border-neutral-800">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <Text className="text-base font-semibold text-black dark:text-white mb-1">
              {formatDate(item.date)}
            </Text>
            <Text className="text-[13px] text-neutral-400 dark:text-neutral-600">
              Order #{item.id}
            </Text>
          </View>
          <Text className="text-lg font-semibold text-black dark:text-white -tracking-tight">
            ${item.total.toFixed(2)}
          </Text>
        </View>
        
        <View className="h-px bg-neutral-100 dark:bg-neutral-800 mb-4" />
        
        <View className="gap-2">
          {item.items.map((itemName, index) => (
            <View key={index} className="flex-row items-center gap-3">
              <Feather 
                name="coffee" 
                size={16} 
                color={colorScheme === 'dark' ? '#a3a3a3' : '#737373'} 
              />
              <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                {itemName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  function renderEmptyState(): JSX.Element {
    return (
      <View className="items-center justify-center pt-20">
        <View className="w-20 h-20 rounded-full bg-neutral-50 dark:bg-neutral-900 items-center justify-center mb-5 border border-neutral-200 dark:border-neutral-800">
          <Feather 
            name="coffee" 
            size={40} 
            color={colorScheme === 'dark' ? '#404040' : '#d4d4d4'} 
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
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-black" edges={['bottom']}>
      <View className="p-5 pb-4">
        <Text className="text-2xl font-semibold text-black dark:text-white mb-1 -tracking-tight">
          Order History
        </Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400">
          {state.userData?.orders.length ?? 0} {(state.userData?.orders.length ?? 0) === 1 ? 'order' : 'orders'}
        </Text>
      </View>

      <FlatList
        data={state.userData?.orders ?? []}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerClassName="p-5 pt-2"
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
