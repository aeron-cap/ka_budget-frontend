import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

type HomeGreetingProps = {
  name: string;
};

export default function HomeGreeting({ name }: HomeGreetingProps) {
  const currentHour = new Date().getHours();
  const firstName = name.split(" ")[0];

  const getGreeting = () => {
    if (currentHour >= 12 && currentHour < 18) {
      return {
        greeting: "Good Afternoon",
        iconName: "sunny-outline",
        iconColor: "#FF8C00",
      };
    } else if (currentHour >= 18 || currentHour < 4) {
      return {
        greeting: "Good Evening",
        iconName: "moon-outline",
        iconColor: "#94A3B8",
      };
    }
  };

  const [data, setData] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getGreeting());
      // 10 mins
    }, 600000);

    return () => clearInterval(interval);
  });

  return (
    <View style={styles.container}>
      <Ionicons
        name={
          (data?.iconName as keyof typeof Ionicons.glyphMap) ?? "sunny-outline"
        }
        size={32}
        color={data?.iconColor}
        style={styles.icon}
      />
      <Text style={styles.greetText}>
        {data?.greeting}, {firstName}{" "}
      </Text>
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
