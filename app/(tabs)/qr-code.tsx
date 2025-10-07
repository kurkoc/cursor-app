import { useAuth } from "@/contexts/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QrCodeScreen() {
  const { state } = useAuth();
  const colorScheme = useColorScheme();

  const qrValue = state.userData?.qrCode ?? "NO-USER";

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-black"
      edges={["top", "bottom"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 py-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mb-4">
            <Feather
              name="smartphone"
              size={32}
              color={colorScheme === "dark" ? "#60a5fa" : "#3b82f6"}
            />
          </View>
          <Text className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Loyalty Card
          </Text>
          <Text className="text-base text-slate-600 dark:text-slate-400 text-center">
            Show this QR code to earn points with every purchase
          </Text>
        </View>

        {/* QR Code Section */}
        <View className="bg-white dark:bg-slate-800 rounded-3xl p-8 items-center mb-8 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20">
          <View className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 mb-6">
            <QRCode
              value={qrValue}
              size={200}
              backgroundColor={colorScheme === "dark" ? "#1e293b" : "#f8fafc"}
              color={colorScheme === "dark" ? "#ffffff" : "#000000"}
            />
          </View>

          <Text className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Scan to Earn Points
          </Text>
          <Text className="text-sm text-slate-500 dark:text-slate-400 text-center">
            Present this code at checkout to collect loyalty points
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
