import { useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
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
          style={[
            styles.cup,
            isFilled && styles.cupFilled,
            isDark && styles.cupDark,
            isFilled && isDark && styles.cupFilledDark,
          ]}
        >
          <Feather 
            name="coffee" 
            size={24} 
            color={
              isFilled 
                ? (isDark ? '#ffffff' : '#000000')
                : (isDark ? '#404040' : '#d4d4d4')
            }
          />
        </View>
      );
    }
    return cups;
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, isDark && styles.progressLabelDark]}>
              Progress
            </Text>
            <Text style={[styles.progressCount, isDark && styles.progressCountDark]}>
              {progress}/10
            </Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, isDark && styles.progressBarDark]}>
              <View 
                style={[
                  styles.progressBarFill,
                  isDark && styles.progressBarFillDark,
                  { width: `${(progress / 10) * 100}%` }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, isDark && styles.progressTextDark]}>
              {10 - progress} more to earn your free coffee
            </Text>
          </View>

          <View style={styles.cupsGrid}>
            {renderCoffeeCups()}
          </View>
        </View>

        {freeEarned > 0 && (
          <View style={[styles.rewardCard, isDark && styles.rewardCardDark]}>
            <View style={styles.rewardContent}>
              <View>
                <Text style={[styles.rewardTitle, isDark && styles.rewardTitleDark]}>
                  Free Coffee Available
                </Text>
                <Text style={[styles.rewardText, isDark && styles.rewardTextDark]}>
                  You have {freeEarned} free {freeEarned === 1 ? 'coffee' : 'coffees'} ready
                </Text>
              </View>
              <Text style={styles.rewardBadge}>{freeEarned}</Text>
            </View>
          </View>
        )}
      </ScrollView>
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
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  cardDark: {
    backgroundColor: '#0a0a0a',
    borderColor: '#262626',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  progressLabelDark: {
    color: '#ffffff',
  },
  progressCount: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.5,
  },
  progressCountDark: {
    color: '#ffffff',
  },
  progressBarContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarDark: {
    backgroundColor: '#171717',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 4,
  },
  progressBarFillDark: {
    backgroundColor: '#ffffff',
  },
  progressText: {
    fontSize: 13,
    color: '#737373',
  },
  progressTextDark: {
    color: '#a3a3a3',
  },
  cupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  cup: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  cupDark: {
    backgroundColor: '#0a0a0a',
    borderColor: '#262626',
  },
  cupFilled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#000000',
  },
  cupFilledDark: {
    backgroundColor: '#171717',
    borderColor: '#ffffff',
  },
  rewardCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  rewardCardDark: {
    backgroundColor: '#0a0a0a',
    borderColor: '#262626',
  },
  rewardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  rewardTitleDark: {
    color: '#ffffff',
  },
  rewardText: {
    fontSize: 14,
    color: '#737373',
  },
  rewardTextDark: {
    color: '#a3a3a3',
  },
  rewardBadge: {
    fontSize: 28,
    fontWeight: '700',
  },
});
