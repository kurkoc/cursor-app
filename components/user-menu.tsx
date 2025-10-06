import { useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  function handleLogout(): void {
    setIsOpen(false);
    dispatch({ type: 'logout' });
    router.replace('/auth/phone-entry');
  }

  function handleProfile(): void {
    setIsOpen(false);
    router.push('/profile');
  }

  function handleContact(): void {
    setIsOpen(false);
    router.push('/contact');
  }

  return (
    <View>
      <Pressable
        onPress={() => setIsOpen(true)}
        style={[styles.trigger, isDark && styles.triggerDark]}
      >
        <View style={styles.triggerContent}>
          <Feather name="user" size={22} color={isDark ? '#ffffff' : '#000000'} />
          <Feather 
            name={isOpen ? "chevron-up" : "chevron-down"} 
            size={16} 
            color={isDark ? '#737373' : '#a3a3a3'} 
          />
        </View>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.menuContainer}>
            <View style={[styles.menu, isDark && styles.menuDark]}>
              <Pressable
                style={[styles.menuItem, isDark && styles.menuItemDark]}
                onPress={handleProfile}
              >
                <Feather name="user" size={18} color={isDark ? '#ffffff' : '#000000'} />
                <Text style={[styles.menuText, isDark && styles.menuTextDark]}>
                  Profil Bilgileri
                </Text>
              </Pressable>

              <View style={[styles.divider, isDark && styles.dividerDark]} />

              <Pressable
                style={[styles.menuItem, isDark && styles.menuItemDark]}
                onPress={handleContact}
              >
                <Feather name="mail" size={18} color={isDark ? '#ffffff' : '#000000'} />
                <Text style={[styles.menuText, isDark && styles.menuTextDark]}>
                  İletişim Formu
                </Text>
              </Pressable>

              <View style={[styles.divider, isDark && styles.dividerDark]} />

              <Pressable
                style={[styles.menuItem, styles.menuItemDanger, isDark && styles.menuItemDark]}
                onPress={handleLogout}
              >
                <Feather name="log-out" size={18} color={isDark ? '#ef4444' : '#dc2626'} />
                <Text style={[styles.menuText, styles.menuTextDanger]}>
                  Çıkış Yap
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  triggerDark: {
    // no specific dark styles needed
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
  },
  menuContainer: {
    minWidth: 220,
  },
  menu: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  menuDark: {
    backgroundColor: '#0a0a0a',
    borderColor: '#262626',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    paddingHorizontal: 16,
  },
  menuItemDark: {
    // handled via text and icon colors
  },
  menuItemDanger: {
    // no background change
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  menuTextDark: {
    color: '#ffffff',
  },
  menuTextDanger: {
    color: '#dc2626',
  },
  divider: {
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  dividerDark: {
    backgroundColor: '#171717',
  },
});

