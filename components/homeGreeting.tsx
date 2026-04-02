import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HomeGreetingProps = {
  name: string;
};

export default function HomeGreeting({ name }: HomeGreetingProps) {
  const currentHour = new Date().getHours();
  const firstName = name.split(" ")[0];

  let greeting = "Good Morning";
  let iconName: keyof typeof Ionicons.glyphMap = "sunrise-outline";
  let iconColor = "#FDB813";

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
    iconName = "sunny-outline";
    iconColor = "#FF8C00";
  } else if (currentHour >= 18 || currentHour < 4) {
    greeting = "Good Evening";
    iconName = "moon-outline";
    iconColor = "#94A3B8";
  }

  return (
    <View style={styles.container}>
      <Ionicons
        name={iconName}
        size={32}
        color={iconColor}
        style={styles.icon}
      />
      <Text style={styles.greetText}>{greeting}, </Text>
      <Text style={styles.nameText}>{firstName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  greetText: {
    fontSize: 24,
    fontWeight: "800",
    color: "black",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
  },
});
