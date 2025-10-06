import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { UserMenu } from "@/components/user-menu";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? "#ffffff" : "#000000",
        tabBarInactiveTintColor: isDark ? "#737373" : "#a3a3a3",
        headerShown: true,
        headerTitle: "",
        headerRight: () => <UserMenu />,
        headerStyle: {
          backgroundColor: isDark ? "#000000" : "#fafafa",
          borderBottomWidth: 0,
        },
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
          borderTopColor: isDark ? "#262626" : "#e5e5e5",
          borderTopWidth: 1,
          height: 90,
          paddingTop: 8,
          paddingBottom: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qr-code"
        options={{
          title: "QR Code",
          tabBarIcon: ({ color }) => (
            <Feather name="maximize" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-bag" size={22} color={color} />
          ),
        }}
      />

      {/* Hidden tabs - not shown in tab bar */}
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          headerShown: true,
          href: null,
        }}
      />
    </Tabs>
  );
}
