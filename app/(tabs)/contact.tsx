import { useColorScheme } from "@/hooks/use-color-scheme";
import { feedbackService } from "@/services";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONTACT_SUBJECTS = [
  "Genel Bilgi",
  "Sipariş Sorunu",
  "Uygulama Hatası",
  "Hesap Sorunu",
  "Öneri & Şikayet",
  "Diğer",
];

export default function ContactScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [selectedSubject, setSelectedSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (!selectedSubject && !customSubject) {
      Alert.alert("Hata", "Lütfen bir konu seçin veya yazın.");
      return;
    }

    if (!message.trim()) {
      Alert.alert("Hata", "Lütfen mesajınızı yazın.");
      return;
    }

    setIsLoading(true);

    try {
      const feedback = {
        subject: selectedSubject === "Diğer" ? customSubject : selectedSubject,
        content: message.trim(),
      };

      await feedbackService.createFeedback(feedback);

      Alert.alert(
        "Başarılı",
        "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
        [
          {
            text: "Tamam",
            onPress: () => {
              setSelectedSubject("");
              setCustomSubject("");
              setMessage("");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Feedback submission failed:", error);
      Alert.alert(
        "Hata",
        "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-50 dark:bg-black pt-6"
      edges={["bottom"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="p-5"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mb-4">
              <Feather
                name="mail"
                size={32}
                color={colorScheme === "dark" ? "#60a5fa" : "#3b82f6"}
              />
            </View>
            <Text className="text-2xl font-bold text-black dark:text-white">
              İletişim
            </Text>
            <Text className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Sorularınızı ve önerilerinizi bizimle paylaşın
            </Text>
          </View>

          {/* Form Container */}
          <View className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
            {/* Subject Selection */}
            <View className="mb-8">
              <Text className="text-lg font-semibold text-black dark:text-white mb-4">
                Konu Seçin
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {CONTACT_SUBJECTS.map((subject) => (
                  <Pressable
                    key={subject}
                    onPress={() => {
                      setSelectedSubject(subject);
                      if (subject !== "Diğer") {
                        setCustomSubject("");
                      }
                    }}
                    className={`px-4 py-2 rounded-full border ${
                      selectedSubject === subject
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        selectedSubject === subject
                          ? "text-white"
                          : "text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      {subject}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {/* Custom Subject Input */}
              {selectedSubject === "Diğer" && (
                <View className="mt-4">
                  <TextInput
                    className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-black dark:text-white"
                    placeholder="Konu başlığını yazın..."
                    value={customSubject}
                    onChangeText={setCustomSubject}
                    maxLength={100}
                    placeholderTextColor={
                      colorScheme === "dark" ? "#9ca3af" : "#6b7280"
                    }
                  />
                </View>
              )}
            </View>

            {/* Message Input */}
            <View className="mb-8">
              <Text className="text-lg font-semibold text-black dark:text-white mb-4">
                Mesajınız
              </Text>
              <TextInput
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-black dark:text-white min-h-[120px]"
                placeholder="Mesajınızı buraya yazın..."
                value={message}
                onChangeText={setMessage}
                multiline={true}
                numberOfLines={6}
                textAlignVertical="top"
                maxLength={1000}
                placeholderTextColor={
                  colorScheme === "dark" ? "#9ca3af" : "#6b7280"
                }
              />
              <Text className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 text-right">
                {message.length}/1000 karakter
              </Text>
            </View>

            {/* Submit Button */}
            <Pressable
              onPress={handleSubmit}
              disabled={isLoading}
              className={`py-4 rounded-lg flex-row items-center justify-center ${
                isLoading
                  ? "bg-neutral-300 dark:bg-neutral-700"
                  : "bg-blue-500 active:bg-blue-600"
              }`}
            >
              {isLoading ? (
                <Text className="text-white font-semibold text-lg">
                  Gönderiliyor...
                </Text>
              ) : (
                <>
                  <MaterialIcons name="send" size={20} color="#fff" />
                  <Text className="text-white font-semibold text-lg ml-2">
                    Mesajı Gönder
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
