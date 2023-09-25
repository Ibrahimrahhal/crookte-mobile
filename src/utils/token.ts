import StorageUtil from "home/utils/storage";

export default class TokenUtil {
  static async saveToken(token: string) {
    await StorageUtil.set("token", token);
  }

  static async getToken(): Promise<string | null> {
    return await StorageUtil.get("token");
  }
}
