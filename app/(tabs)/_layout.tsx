import ProtrudingAddIcon from "@/components/protrudingAddIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs, useSegments } from "expo-router";

export default function HomeStackLayout() {
  const segments = useSegments();
  const isAddScreen = segments[segments.length - 1] === "add";

  return (
    <Tabs
      initialRouteName={undefined}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarShowLabel: false,
        tabBarStyle: {
          display: isAddScreen ? "none" : "flex",
          position: "absolute",
          borderRadius: 40,
          backgroundColor: "white",
          borderTopWidth: 0,
          height: 60,
          margin: 40,
          marginBottom: 40,
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          paddingHorizontal: 0,
          marginHorizontal: 0,
        },
        tabBarIconStyle: {
          marginTop: 8,
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={30} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={30} name="analytics" color={color} />
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
            <Ionicons size={30} name="time" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={30} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
