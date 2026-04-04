import { saveLocalUser, setLocalUser } from "@/service/local/service";
import {
  createUser,
  getUser,
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

export default function LoginScreen() {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (name.trim()) {
      // temporary solution for multiple users in one device, or relogging in after clearing cache
      const savedUser = await getUserUsingName(name.trim());
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
        const savedLocalUser = await saveLocalUser(name.trim());
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.inner}>
          <View style={styles.logoBadge}>
            <Ionicons name="wallet-outline" size={48} color="#2563EB" />
          </View>

          <View style={styles.greetingRow}>
            <Text style={styles.hiText}>Hi!</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="..."
              placeholderTextColor="#CBD5E1"
              value={name}
              onChangeText={setName}
              autoFocus={true}
              maxLength={12}
              selectionColor="#2563EB"
              underlineColorAndroid="transparent"
              cursorColor="#2563EB"
            />
          </View>

          <Text style={styles.subtitle}>
            Enter your name to access your personal finance dashboard.
          </Text>

          <TouchableOpacity
            style={[styles.button, !name.trim() && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!name.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Enter</Text>
            <Ionicons name="arrow-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 40,
    justifyContent: "center",
  },
  logoBadge: {
    marginBottom: 32,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  hiText: {
    fontSize: 56,
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: -1,
  },
  nameInput: {
    flex: 1,
    fontSize: 56,
    fontWeight: "800",
    color: "#2563EB",
    padding: 0,
    margin: 0,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 12,
    lineHeight: 24,
    marginBottom: 48,
  },
  button: {
    backgroundColor: "#2563EB",
    height: 64,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#E2E8F0",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
