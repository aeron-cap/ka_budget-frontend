import { useCreateAccount } from "@/hooks/useCreateAccount";
import { saveLocalUser, setLocalUser } from "@/service/local/service";
import { getAllAccounts } from "@/service/repositories/accountRepository";
import {
    createUser,
    getUserUsingName,
} from "@/service/repositories/userRepository";
import { Account } from "@/types/accounts/accounts.type";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Image,
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
  const { mutate: processAccount, isPending } = useCreateAccount();

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
          await openInitialAddAccountModal(savedLocalUser.id);
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
      router.replace("/(tabs)");
      setShowInitialAddAccountModal(false);
    }
  };

  const handleSaveAccount = async (accountData: Account): Promise<void> => {
    processAccount(accountData, {
      onSuccess: async () => {
        setShowInitialAddAccountModal(false);

        setTimeout(() => {
          router.replace("/(tabs)");
        }, 150);
      },
    });
  };

  const handleSkipAddAccount = (): void => {
    setShowInitialAddAccountModal(false);
    setTimeout(() => {
      router.replace("/(tabs)");
    }, 150);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.logoBadge}>
              <Image
                source={require("@/assets/images/Montra-white-transparent.png")}
                style={{ width: 150, height: 150 }}
              />
              <Text style={styles.appNameText}>Montra</Text>
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
                Let&apos;s Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <AddAccount
        isVisible={showInitialAddAccountModal}
        isEdit={false}
        onClose={() => handleSkipAddAccount()}
        onSave={handleSaveAccount}
        isOnboarding={true}
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
    width: 120,
    height: 96,
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
  appNameText: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 30,
    color: "#da9827",
    letterSpacing: 0.5,
    marginTop: -12,
  },
});
