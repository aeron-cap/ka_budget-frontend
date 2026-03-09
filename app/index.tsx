import { Text, View } from "react-native";
import Home from "./home";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello World!</Text>
      <Home />
    </View>
  );
}
