import { useAuth } from "@/contexts/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { accountService } from "@/services";
import Feather from "@expo/vector-icons/Feather";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { state, dispatch } = useAuth();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [firstName, setFirstName] = useState(state.userData?.firstName || "");
  const [lastName, setLastName] = useState(state.userData?.lastName || "");
  const [email, setEmail] = useState(state.userData?.email || "");
  const [birthDate, setBirthDate] = useState(
    state.userData?.birthDate ? new Date(state.userData.birthDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function formatDate(date: Date): string {
    return format(date, "dd.MM.yyyy", { locale: tr });
  }

  async function handleSave() {
    if (!state.userData) return;

    setIsLoading(true);
    try {
      const updatedData = {
        firstName: firstName || null,
        lastName: lastName || null,
        email: email || null,
        birthDate: birthDate.toISOString().split("T")[0] || null,
      };

      await accountService.updateCustomer(updatedData);

      // Update context with new data
      dispatch({
        type: "login",
        payload: { ...state.userData, ...updatedData },
      });

      Alert.alert("Başarılı", "Profil bilgileriniz güncellendi.");
    } catch (error) {
      console.error("Profile update failed:", error);
      Alert.alert("Hata", "Profil güncellenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDateConfirm(selectedDate: Date) {
    setBirthDate(selectedDate);
    setShowDatePicker(false);
  }

  function handleDateCancel() {
    setShowDatePicker(false);
  }

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-50 dark:bg-black pt-6"
      edges={["bottom"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center mb-4">
          <View className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mb-2">
            <Feather
              name="user"
              size={32}
              color={colorScheme === "dark" ? "#60a5fa" : "#3b82f6"}
            />
          </View>
          <Text className="text-2xl font-bold text-black dark:text-white">
            Profil Bilgileri
          </Text>
          <Text className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Kişisel bilgilerinizi güncelleyin
          </Text>
        </View>

        {/* Form Container */}
        <View className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
          <View className="space-y-8">
            {/* First Name */}
            <View>
              <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Ad
              </Text>
              <TextInput
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-black dark:text-white"
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Adınızı girin"
                placeholderTextColor={
                  colorScheme === "dark" ? "#9ca3af" : "#6b7280"
                }
              />
            </View>

            {/* Last Name */}
            <View className="mt-4">
              <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Soyad
              </Text>
              <TextInput
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-black dark:text-white"
                value={lastName}
                onChangeText={setLastName}
                placeholder="Soyadınızı girin"
                placeholderTextColor={
                  colorScheme === "dark" ? "#9ca3af" : "#6b7280"
                }
              />
            </View>

            {/* Email */}
            <View className="mt-4">
              <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                E-posta
              </Text>
              <TextInput
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-black dark:text-white"
                value={email}
                onChangeText={setEmail}
                placeholder="E-posta adresinizi girin"
                placeholderTextColor={
                  colorScheme === "dark" ? "#9ca3af" : "#6b7280"
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Birth Date */}
            <View className="mt-4">
              <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Doğum Tarihi
              </Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-3 flex-row items-center justify-between"
              >
                <Text className="text-black dark:text-white">
                  {formatDate(birthDate)}
                </Text>
                <Feather
                  name="calendar"
                  size={20}
                  color={colorScheme === "dark" ? "#9ca3af" : "#6b7280"}
                />
              </Pressable>
            </View>
          </View>

          {/* Save Button */}
          <Pressable
            onPress={handleSave}
            disabled={isLoading}
            className={`mt-8 py-4 rounded-lg ${
              isLoading
                ? "bg-neutral-300 dark:bg-neutral-700"
                : "bg-blue-500 active:bg-blue-600"
            }`}
          >
            <Text className="text-white font-semibold text-center text-lg">
              {isLoading ? "Kaydediliyor..." : "Kaydet"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        date={birthDate}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
        maximumDate={new Date()}
        locale="tr"
      />
    </SafeAreaView>
  );
}
