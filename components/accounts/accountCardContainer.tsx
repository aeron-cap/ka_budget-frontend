import { View } from "react-native";
import AccountCard from "./accountCards";

type AccountCardContainerProps = {
  styles: object;
};

export default function AccountCardContainer({
  styles,
}: AccountCardContainerProps) {
  return (
    <View style={styles}>
      <AccountCard />
    </View>
  );
}
