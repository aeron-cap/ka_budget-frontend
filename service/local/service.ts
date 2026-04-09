import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid";
import "react-native-get-random-values";

export async function saveLocalUser(name: string) {
  try {
    const randomId = nanoid();
    const userData = {
      id: randomId,
      name: name,
      userString: `${name}-${randomId}`,
    };
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    return userData;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getLocalUser() {
  try {
    return await AsyncStorage.getItem("user");
  } catch (e) {
    return null;
  }
}

export async function setLocalUser(
  name: string,
  randomId: string,
  userString: string,
) {
  try {
    const userData = {
      id: randomId,
      name: name,
      userString: userString,
    };
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    return userData;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function clearLocalUser() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
}
