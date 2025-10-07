import { useAuth } from "@/contexts/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { accountService, storageService } from "@/services";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PinVerificationScreen() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const { dispatch } = useAuth();
  const colorScheme = useColorScheme();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function handlePinChange(value: string, index: number): void {
    if (value.length > 1) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "") && newPin.length === 6) {
      verifyPin(newPin.join(""));
    }
  }

  function handleKeyPress(e: any, index: number): void {
    if (e.nativeEvent.key === "Backspace" && pin[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function verifyPin(pinCode: string): Promise<void> {
    if (!phone) return;

    setIsVerifying(true);

    try {
      // Verify with backend
      const tokens = await accountService.verify({
        phone,
        code: pinCode,
      });

      console.log("Tokens:", tokens);

      // Store tokens securely
      await storageService.setItem("accessToken", tokens.accessToken);
      await storageService.setItem("refreshToken", tokens.refreshToken);

      // Get user profile from backend
      const userProfile = await accountService.getCustomerDetail();
      const orders = await accountService.getCustomerOrders();

      // Transform backend data to match our context structure
      const userData = {
        phoneNumber: phone,
        coffeeCount: userProfile.currentCoffees || 0,
        qrCode: `USER-${userProfile.id}`,
        orders: orders.map((order) => ({
          id: order.id,
          date: order.orderDate,
          items: [`${order.coffeeCount} Coffee(s)`],
          total: order.earnedReward || 0,
        })),
        profile: userProfile,
      };

      dispatch({ type: "login", payload: userData });
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Verification failed:", error);
      Alert.alert("Error", "Invalid verification code. Please try again.");
      setPin(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend(): Promise<void> {
    if (!phone) return;

    setPin(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();

    try {
      await accountService.register({ phone });
      console.log("Resend successful");
    } catch (error) {
      console.error("Resend failed:", error);
      Alert.alert(
        "Error",
        "Failed to resend verification code. Please try again."
      );
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 px-8 justify-center max-w-[440px] w-full self-center">
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full border-2 border-black dark:border-white items-center justify-center">
            <Feather
              name="lock"
              size={40}
              color={colorScheme === "dark" ? "#ffffff" : "#000000"}
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-center text-lg font-semibold text-black dark:text-white mb-2">
            Enter Verification Code
          </Text>
          <Text className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            We sent a code to ****{phone?.slice(-4)}
          </Text>
        </View>

        <View className="flex-row justify-center gap-2.5 mb-8">
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              className={`w-[52px] h-14 border rounded-lg text-xl font-semibold text-center ${
                digit !== ""
                  ? "border-black dark:border-white bg-neutral-50 dark:bg-neutral-800"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
              } text-black dark:text-white`}
              value={digit}
              onChangeText={(value) => handlePinChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <Pressable onPress={handleResend} className="items-center p-3">
          <Text className="text-sm text-black dark:text-white font-medium underline">
            Didn&apos;t receive the code? Resend
          </Text>
        </Pressable>

        {isVerifying && (
          <Text className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-4">
            Verifying...
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
