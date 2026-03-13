import { StyleSheet, Text, View } from "react-native";

type HomeGreetingProps = {
  name: string;
};

export default function HomeGreeting({ name }: HomeGreetingProps) {
  return (
    <View style={[styles.greetingContainer]}>
      <Text style={[styles.greetingNameText]}>Hi, {name}</Text>
      <Text>Today is {Date.now()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  greetingContainer: {
    height: 80,
    backgroundColor: "white",
    padding: 12,
  },
  greetingNameText: {
    fontWeight: "bold",
  },
});
