import AccountCardContainer from "@/components/accounts/accountCardContainer";
import HomeGreeting from "@/components/homeGreeting/homeGreeting";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={[styles.screenContainer]}>
        <HomeGreeting name={"Aeron"} />
        <AccountCardContainer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "black",
  },
});
