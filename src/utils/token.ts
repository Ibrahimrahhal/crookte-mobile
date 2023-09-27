import StorageUtil from "home/utils/storage";
import jwt_decode from "jwt-decode";

export default class TokenUtil {
  static async saveToken(token: string) {
    await StorageUtil.set("token", token);
  }

  static async getToken(): Promise<string | null> {
    return await StorageUtil.get("token");
  }

  static decode(token: string): any {
    try {
      return JSON.parse((jwt_decode(token) as any).payload);
    } catch (e) {
      return null;
    }
  }
}
