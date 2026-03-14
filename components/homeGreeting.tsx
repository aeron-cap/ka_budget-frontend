import { StyleSheet, Text, View } from "react-native";

type HomeGreetingProps = {
  name: string;
};

export default function HomeGreeting({ name }: HomeGreetingProps) {
  return (
    <View style={[styles.greetingContainer]}>
      <Text style={[styles.greetingGreetText]}>Good Morning!</Text>
      <Text style={[styles.greetingNameText]}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  greetingContainer: {
    height: 80,
    padding: 8,
    // borderWidth: 2,
    borderRadius: 12,
    marginBottom: 8,
  },
  greetingGreetText: {
    fontWeight: "medium",
    color: "gray",
  },
  greetingNameText: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
