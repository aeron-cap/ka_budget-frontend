import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

type AccountCardProps = {};

export default function AccountCard() {
  return (
    <TouchableOpacity style={[styles.accountCard]}>
      <Text>Test</Text>
      <Text>Account Name</Text>
    </TouchableOpacity>
  );
}

const padding = 8;
const gap = 8;
const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - padding * 2 - gap * 2) / 2;
const styles = StyleSheet.create({
  accountCard: {
    flexDirection: "column",
    height: 120,
    width: cardWidth,
    backgroundColor: "powderblue",
    padding: 8,
    borderRadius: 8,
  },
});
