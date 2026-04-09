import { saveLocalUser, setLocalUser } from "@/service/local/service";
import {
  createUser,
  getUserUsingName,
} from "@/service/repositories/userRepository";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen(): React.JSX.Element {
  const [name, setName] = useState<string>("");

  const handleLogin = async (): Promise<void> => {
    const trimmedName = name.trim();
    if (trimmedName) {
      const savedUser = await getUserUsingName(trimmedName);
      if (savedUser) {
        const savedLocalUser = await setLocalUser(
          savedUser.name,
          savedUser.rand_id,
          savedUser.user_string,
        );
        if (savedLocalUser) {
          router.replace("/(tabs)");
        }
      } else {
        const savedLocalUser = await saveLocalUser(trimmedName);
        if (savedLocalUser) {
          const response = await createUser(savedLocalUser);
          if (response) {
            router.replace("/(tabs)");
          }
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.logoBadge}>
              <Ionicons name="wallet-outline" size={48} color="#FFFFFF" />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.hiText}>Hi,</Text>
              <TextInput
                style={styles.nameInput}
                placeholder="Your Name"
                placeholderTextColor="#78716C"
                value={name}
                onChangeText={setName}
                autoFocus={true}
                maxLength={10}
                selectionColor="#FFFFFF"
                underlineColorAndroid="transparent"
                cursorColor="#FFFFFF"
              />
            </View>

            <Text style={styles.subtitle}>
              Securely access your personal finance dashboard to track your
              wealth and manage your accounts.
            </Text>
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={[styles.button, !name.trim() && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={!name.trim()}
              activeOpacity={0.9}
            >
              <Text
                style={[
                  styles.buttonText,
                  !name.trim() && styles.buttonTextDisabled,
                ]}
              >
                Get started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1C1816",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === "ios" ? 20 : 32,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  logoBadge: {
    width: 96,
    height: 96,
    borderRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 60,
  },
  textContainer: {
    gap: 4,
  },
  hiText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 60,
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  nameInput: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 60,
    color: "#FFFFFF",
    padding: 0,
    margin: 0,
    height: 70,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: "PlayfairDisplay_400Regular_Italic",
    fontSize: 18,
    color: "#A39B95",
    lineHeight: 28,
    marginTop: 16,
  },
  bottomSection: {
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#FFFFFF",
    height: 60,
    borderRadius: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  buttonText: {
    color: "#1C1816",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.3,
    fontFamily: "PlayfairDisplay_600SemiBold",
  },
  buttonTextDisabled: {
    color: "#78716C",
  },
});
