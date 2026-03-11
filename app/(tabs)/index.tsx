import AccountCardContainer from "@/components/accounts/accountCardContainer";
import TransactionList from "@/components/transactions/transactionList";
import { transactions } from "@/constants/sampleData";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = { snap: ["10%", "90%"] };

  // TODO: Make the Card Container and Cards for Accounts (Create Mock Data from Backend Entity)
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={[styles.screenContainer]}>
        <AccountCardContainer styles={[styles.cardContainer]} />

        <GestureHandlerRootView>
          <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints.snap}>
            <BottomSheetView>
              <TransactionList
                styles={[styles.transactionContainer]}
                transactions={transactions}
              />
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  cardContainer: {
    backgroundColor: "teal",
  },
  transactionContainer: {
    backgroundColor: "cyan",
  },
});
