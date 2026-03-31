import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid";
import "react-native-get-random-values";

export async function saveUserName(name: string) {
  try {
    const randomId = nanoid();
    const userData = {
      id: randomId,
      name: name,
      userString: `${name}-${randomId}`,
    };
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  } catch (e) {
    console.error(e);
  }
}

export async function getUserName() {
  try {
    return await AsyncStorage.getItem("user");
  } catch (e) {
    return null;
  }
}
