import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid";
import "react-native-get-random-values";

export async function saveUserName(name: string) {
  try {
    const randomId = nanoid();
    await AsyncStorage.setItem("user_name", name);
    await AsyncStorage.setItem("user_id", randomId);
    await AsyncStorage.setItem("user_string", `${name}-${randomId}`);
  } catch (e) {
    console.error(e);
  }
}

export async function getUserName() {
  try {
    return await AsyncStorage.getItem("user_name");
  } catch (e) {
    return null;
  }
}
