import { router } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Add() {
  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView>
      <Text>Add</Text>
      <Button
        title="X"
        onPress={() => {
          handleClose();
        }}
      />
    </SafeAreaView>
  );
}
