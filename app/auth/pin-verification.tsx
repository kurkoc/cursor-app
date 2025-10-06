import { useAuth } from "@/contexts/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PinVerificationScreen() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const { dispatch } = useAuth();
  const colorScheme = useColorScheme();

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
    setIsVerifying(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUserData = {
      phoneNumber: "505 701 28 74",
      coffeeCount: 15,
      qrCode: "USER-" + Date.now(),
      orders: [
        {
          id: "1",
          date: new Date(Date.now() - 86400000).toISOString(),
          items: ["Cappuccino"],
          total: 4.5,
        },
        {
          id: "2",
          date: new Date(Date.now() - 172800000).toISOString(),
          items: ["Latte", "Croissant"],
          total: 7.0,
        },
        {
          id: "3",
          date: new Date(Date.now() - 259200000).toISOString(),
          items: ["Americano", "Espresso", "Muffin"],
          total: 8.5,
        },
        {
          id: "4",
          date: new Date(Date.now() - 345600000).toISOString(),
          items: ["Cappuccino", "Latte", "Croissant", "Sandwich"],
          total: 12.0,
        },
        {
          id: "5",
          date: new Date(Date.now() - 432000000).toISOString(),
          items: ["Macchiato", "Frappuccino"],
          total: 9.5,
        },
        {
          id: "6",
          date: new Date(Date.now() - 518400000).toISOString(),
          items: ["Espresso", "Cappuccino", "Latte", "Americano", "Mocha"],
          total: 15.0,
        },
        {
          id: "7",
          date: new Date(Date.now() - 604800000).toISOString(),
          items: ["Cold Brew", "Iced Latte"],
          total: 7.5,
        },
        {
          id: "8",
          date: new Date(Date.now() - 691200000).toISOString(),
          items: [
            "Cappuccino",
            "Latte",
            "Americano",
            "Espresso",
            "Macchiato",
            "Frappuccino",
            "Mocha",
            "Cold Brew",
            "Iced Latte",
            "Flat White",
          ],
          total: 25.0,
        },
        {
          id: "9",
          date: new Date(Date.now() - 777600000).toISOString(),
          items: ["Cortado", "Ristretto"],
          total: 6.0,
        },
      ],
    };

    dispatch({ type: "login", payload: mockUserData });
    router.replace("/(tabs)");
  }

  function handleResend(): void {
    setPin(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
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
