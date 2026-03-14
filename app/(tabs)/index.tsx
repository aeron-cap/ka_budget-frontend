import BalanceHome from "@/components/balanceHome";
import HomeGreeting from "@/components/homeGreeting";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={[styles.screenContainer]}>
        <HomeGreeting name={"Aeron Caponpon"} />
        <BalanceHome />
        {/* TODO: Add Budget Goals */}
        {/* TODO: Add Recent transactions */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "slate",
    padding: 24,
  },
});
