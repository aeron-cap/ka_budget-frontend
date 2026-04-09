import { saveLocalUser, setLocalUser } from "@/service/local/service";
import { getAllAccounts } from "@/service/repositories/accountRepository";
import {
  createUser,
  getUserUsingName,
} from "@/service/repositories/userRepository";
import { Account } from "@/types/accounts/accounts.type";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddAccount from "./modals/addAccount";

export default function LoginScreen(): React.JSX.Element {
  const [name, setName] = useState<string>("");
  const [showInitialAddAccountModal, setShowInitialAddAccountModal] =
    useState<boolean>(false);

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
          // TODO: fix the keyboard avoiding for add account Modal
          // TODO: when reloading, the login is shown for a brief moment
          // TODO: the fix was in the _layout file, add the checker there, but make it as a helper
          const hasAccount = await getAllAccounts(savedUser.rand_id, "none");
          if (!hasAccount || hasAccount.length === 0) {
            setShowInitialAddAccountModal(true);
          } else {
            setShowInitialAddAccountModal(false);
            router.replace("/(tabs)");
          }
        }
      } else {
        const savedLocalUser = await saveLocalUser(trimmedName);
        if (savedLocalUser) {
          const response = await createUser(savedLocalUser);
          if (response) {
            await openInitialAddAccountModal(savedLocalUser.id);
          }
        }
      }
    }
  };

  const openInitialAddAccountModal = async (userId: string): Promise<void> => {
    const hasAccount = await getAllAccounts(userId, "none");
    if (!hasAccount || hasAccount.length === 0) {
      setShowInitialAddAccountModal(true);
    } else {
      setShowInitialAddAccountModal(false);
      router.replace("/(tabs)");
    }
  };

  const handleSaveAccount = async (accountData: Account): Promise<void> => {
    setShowInitialAddAccountModal(false);
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.logoBadge}>
              <Ionicons name="wallet-outline" size={48} color="#FFFFFF" />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.hiText}>Hi,</Text>
              <TextInput
                style={styles.nameInput}
                placeholder="..."
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
      </SafeAreaView>

      <AddAccount
        isVisible={showInitialAddAccountModal}
        isEdit={false}
        onClose={() => setShowInitialAddAccountModal(false)}
        onSave={handleSaveAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1C1816",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 20 : 32,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  logoBadge: {
    width: 96,
    height: 96,
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
