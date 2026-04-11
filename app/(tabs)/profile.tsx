import AccountsSection from "@/components/accountsSection";
import ProfileCard from "@/components/profileCard";
import SettingsSection from "@/components/settingSection";
import { useGetUser } from "@/hooks/useGetUser";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditUser from "../modals/editUser";

export default function Profile() {
  const { user } = useGetUser();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
          <ProfileCard name={user ? user.name : ""} />
        </View>

        <AccountsSection limits="none" />
        <SettingsSection />
      </ScrollView>

      <EditUser isVisible={isEditModalVisible} onClose={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 32,
    color: "#FFFFFF",
  },
  contentPadding: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
});
