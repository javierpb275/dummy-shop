import { API_BASE_URL } from "../config/constants";
import { BodyType, HeadersType } from "./serviceTypes";

export class FetchService {
  static async callApi(
    url: string,
    method: string,
    body?: BodyType,
    headers?: HeadersType
  ): Promise<Response> {
    try {
      const sendBody = typeof body === "object" ? JSON.stringify(body) : body;
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: sendBody,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
}
