import ProtrudingAddIcon from "@/components/protrudingAddIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { router, Tabs, useSegments } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

export default function HomeStackLayout() {
  const segments = useSegments();
  const isAddScreen = segments[segments.length - 1] === "add";

  const translateY = useRef(new Animated.Value(isAddScreen ? 150 : 0)).current;

  const opacity = translateY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
  });

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: isAddScreen ? 150 : 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 150,
    }).start();
  }, [isAddScreen, translateY]);

  return (
    <View style={styles.container}>
      <Tabs
        initialRouteName="index"
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#78716C",
          tabBarShowLabel: false,
          tabBarStyle: [
            styles.tabBar,
            { transform: [{ translateY }], opacity },
          ],
          tabBarItemStyle: {
            paddingHorizontal: 0,
            marginHorizontal: 0,
          },
          tabBarBackground: () => (
            <View style={styles.tabBarBackground}>
              <BlurView
                tint="dark"
                intensity={0}
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
              <Ionicons size={28} name="home-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="wallet-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="cash-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="person-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            href: null,
          }}
        />
      </Tabs>

      <Animated.View
        style={[styles.fabContainer, { transform: [{ translateY }], opacity }]}
        pointerEvents={isAddScreen ? "none" : "auto"}
      >
        <ProtrudingAddIcon
          onPress={() => {
            router.push("/modals/add");
          }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 32 : 24,
    height: 60,
    backgroundColor: "#1C1816",
    marginBottom: 18,
    marginRight: 100,
    marginLeft: 26,
    paddingTop: 10,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: "#1C1816",
  },
  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: Platform.OS === "ios" ? 32 : 24,
    zIndex: 10,
    elevation: 10,
    marginBottom: 18,
  },
});
