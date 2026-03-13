import { StyleSheet, View } from "react-native";
import AccountCard from "./accountCards";

type AccountCardContainerProps = {};

export default function AccountCardContainer() {
  return (
    <View style={[styles.cardContainer]}>
      {[1, 2, 3, 4].map((x, idx) => {
        return <AccountCard key={idx} />;
      })}
    </View>
  );
}

const gap = 12;
const padding = 8;
const paddingTop = 16;
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "teal",
    height: 290,
    padding: padding,
    paddingTop: paddingTop,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
    justifyContent: "center",
    alignContent: "flex-start",
  },
});
