import AsyncStorage from "@react-native-async-storage/async-storage";

export default class StorageUtil {
  static async get(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }

  static async set(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }
}
