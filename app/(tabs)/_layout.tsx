import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs } from "expo-router";
import { Pressable } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000"
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size}/>
          ),
        }}
      />
      {/* Budget */}
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budget",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Add */}
      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarButton: () => (
            <Pressable
              onPress={() => router.push("/(modal)/add")}
              style={{
                top: -12,
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#000",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="add" size={32} color="#fff" />
            </Pressable>
          ),
        }}
      />
      {/* Finsights */}
      <Tabs.Screen
        name="finsights"
        options={{
          title: "Finsights",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}