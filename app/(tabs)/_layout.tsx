import ProtrudingAddIcon from "@/components/protrudingAddIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { router, Tabs, useSegments } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function HomeStackLayout() {
  const segments = useSegments();
  const isAddScreen = segments[segments.length - 1] === "add";

  return (
    <Tabs
      initialRouteName={undefined}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2B60E9",
        tabBarShowLabel: false,
        tabBarStyle: {
          display: isAddScreen ? "none" : "flex",
          position: "absolute",
          borderRadius: 40,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          height: 60,
          margin: 48,
          marginBottom: 40,
          paddingBottom: 0,
          elevation: 8,
        },
        tabBarItemStyle: {
          paddingHorizontal: 0,
          marginHorizontal: 0,
        },
        tabBarIconStyle: {
          marginTop: 8,
          marginBottom: 0,
        },
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              borderRadius: 40,
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <BlurView
              tint="light"
              intensity={80}
              style={StyleSheet.absoluteFill}
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="analytics" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarButton: (props) => (
            <ProtrudingAddIcon
              {...props}
              onPress={() => router.push("/(tabs)/add")}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
          },
        })}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="time" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
