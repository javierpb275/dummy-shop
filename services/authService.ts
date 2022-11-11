import { API_URL } from "../config/constants";
import { FetchService } from "./fetchService";
import {
  IBodySignIn,
  IResponseSignIn,
  IDataForLocalStorage,
  LocalStorageItems,
  IPayload,
  IResponseGetSingleUser,
} from "./serviceTypes";

export class AuthService {
  //LOCAL STORAGE:
  static saveInLocalStorage(data: IDataForLocalStorage) {
    if (data.token) {
      localStorage.setItem(LocalStorageItems.ACCESS_TOKEN, data.token);
    }
    if (data.id) {
      localStorage.setItem(LocalStorageItems.USER_ID, data.id.toString());
    }
  }

  static clearLocalStorage() {
    localStorage.removeItem(LocalStorageItems.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageItems.USER_ID);
  }

  //TOKEN
  static getPayloadFromToken(token: string): IPayload {
    const payload = JSON.parse(atob(token.split(".")[1])) as IPayload;
    return payload;
  }

  //SIGN IN
  static async signIn(user: IBodySignIn): Promise<IResponseSignIn> {
    try {
      const responseJson = await FetchService.callApi(
        API_URL.USERS.SIGN_IN.URL,
        API_URL.USERS.SIGN_IN.METHOD,
        user
      );
      let response: IResponseSignIn = await responseJson.json();
      AuthService.saveInLocalStorage({
        id: response.id,
        token: response.token,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  //GET PROFILE:
  static async getProfile(token: string): Promise<IResponseGetSingleUser> {
    const payload: IPayload = AuthService.getPayloadFromToken(token);
    try {
      const responseJson = await FetchService.callApi(
        API_URL.USERS.GET.BY_ID.URL + payload.id,
        API_URL.USERS.GET.BY_ID.METHOD,
        undefined,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      let response: IResponseGetSingleUser = await responseJson.json();
      return response;
    } catch (err) {
      throw err;
    }
  }
}
