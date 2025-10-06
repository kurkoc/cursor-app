import { useAuth } from "@/contexts/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();

  function handleLogout(): void {
    setIsOpen(false);
    dispatch({ type: "logout" });
    router.replace("/auth/phone-entry");
  }

  function handleProfile(): void {
    setIsOpen(false);
    router.push("/profile");
  }

  function handleContact(): void {
    setIsOpen(false);
    router.push("/contact");
  }

  return (
    <View>
      <Pressable onPress={() => setIsOpen(true)} className="px-2 py-1">
        <View className="flex-row items-center gap-1.5">
          <View className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 items-center justify-center">
            <Feather
              name="user"
              size={18}
              color={colorScheme === "dark" ? "#a3a3a3" : "#737373"}
            />
          </View>
          <Feather
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={14}
            color={colorScheme === "dark" ? "#a3a3a3" : "#737373"}
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
          className="flex-1 bg-black/40 justify-start items-end pt-20 pr-4"
          onPress={() => setIsOpen(false)}
        >
          <View className="min-w-[220px]">
            <View className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xl shadow-black/20">
              <Pressable
                className="flex-row items-center gap-3 px-4 py-3.5"
                onPress={handleProfile}
              >
                <Feather
                  name="user"
                  size={18}
                  color={colorScheme === "dark" ? "#ffffff" : "#000000"}
                />
                <Text className="text-[15px] font-medium text-black dark:text-white">
                  Profil Bilgileri
                </Text>
              </Pressable>

              <View className="h-px bg-neutral-100 dark:bg-neutral-800" />

              <Pressable
                className="flex-row items-center gap-3 px-4 py-3.5"
                onPress={handleContact}
              >
                <Feather
                  name="mail"
                  size={18}
                  color={colorScheme === "dark" ? "#ffffff" : "#000000"}
                />
                <Text className="text-[15px] font-medium text-black dark:text-white">
                  İletişim Formu
                </Text>
              </Pressable>

              <View className="h-px bg-neutral-100 dark:bg-neutral-800" />

              <Pressable
                className="flex-row items-center gap-3 px-4 py-3.5"
                onPress={handleLogout}
              >
                <Feather
                  name="log-out"
                  size={18}
                  color={colorScheme === "dark" ? "#ef4444" : "#dc2626"}
                />
                <Text className="text-[15px] font-medium text-red-600 dark:text-red-500">
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
