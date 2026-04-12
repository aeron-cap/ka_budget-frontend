import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
        iconColor: "#F97316",
      };
    } else if (currentHour >= 18 || currentHour < 4) {
      return {
        greeting: "Good Evening",
        iconName: "moon-outline",
        iconColor: "#A39B95",
      };
    }
    return {
      greeting: "Good Morning",
      iconName: "sunny-outline",
      iconColor: "#FBBF24",
    };
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
        {data?.greeting}, {firstName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    marginRight: 12,
  },
  greetText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 22,
    color: "#FFFFFF",
    marginBottom: 4,
  },
});
