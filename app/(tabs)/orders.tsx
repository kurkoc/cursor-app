import { Order, useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
      <View style={[styles.orderCard, isDark && styles.orderCardDark]}>
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={[styles.orderDate, isDark && styles.orderDateDark]}>
              {formatDate(item.date)}
            </Text>
            <Text style={[styles.orderId, isDark && styles.orderIdDark]}>
              Order #{item.id}
            </Text>
          </View>
          <Text style={[styles.price, isDark && styles.priceDark]}>
            ${item.total.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.itemsContainer}>
          {item.items.map((itemName, index) => (
            <View key={index} style={styles.itemRow}>
              <Feather 
                name="coffee" 
                size={16} 
                color={isDark ? '#a3a3a3' : '#737373'} 
              />
              <Text style={[styles.itemName, isDark && styles.itemNameDark]}>
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
      <View style={styles.emptyContainer}>
        <View style={[styles.emptyIcon, isDark && styles.emptyIconDark]}>
          <Feather 
            name="coffee" 
            size={40} 
            color={isDark ? '#404040' : '#d4d4d4'} 
          />
        </View>
        <Text style={[styles.emptyTitle, isDark && styles.emptyTitleDark]}>
          No orders yet
        </Text>
        <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
          Your order history will appear here
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]}>
          Order History
        </Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          {state.userData?.orders.length ?? 0} {(state.userData?.orders.length ?? 0) === 1 ? 'order' : 'orders'}
        </Text>
      </View>

      <FlatList
        data={state.userData?.orders ?? []}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
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
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  titleDark: {
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#737373',
  },
  subtitleDark: {
    color: '#a3a3a3',
  },
  listContent: {
    padding: 20,
    paddingTop: 4,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  orderCardDark: {
    backgroundColor: '#0a0a0a',
    borderColor: '#262626',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  orderDateDark: {
    color: '#ffffff',
  },
  orderId: {
    fontSize: 13,
    color: '#a3a3a3',
  },
  orderIdDark: {
    color: '#737373',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.5,
  },
  priceDark: {
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
  },
  itemsContainer: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemName: {
    fontSize: 14,
    color: '#737373',
  },
  itemNameDark: {
    color: '#a3a3a3',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  emptyIconDark: {
    backgroundColor: '#0a0a0a',
    borderColor: '#262626',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  emptyTitleDark: {
    color: '#ffffff',
  },
  emptyText: {
    fontSize: 14,
    color: '#737373',
  },
  emptyTextDark: {
    color: '#a3a3a3',
  },
});
