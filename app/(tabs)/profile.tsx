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
    <View style={styles.mainBackground}>
      <SafeAreaView edges={["top"]} style={styles.headerCard}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.contentPadding}>
          <ProfileCard name={user ? user.name : ""} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
      >
        <AccountsSection limits="none" />
        <SettingsSection />
      </ScrollView>

      <EditUser isVisible={isEditModalVisible} onClose={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: "#232323",
  },
  headerCard: {
    backgroundColor: "#1C1816",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 32,
    color: "#FFFFFF",
  },
  listContainer: {
    flex: 1,
    paddingTop: 16,
  },
  contentPadding: {},
});
