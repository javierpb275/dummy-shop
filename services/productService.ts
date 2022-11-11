import { API_URL } from "../config/constants";
import { getQuery } from "../helpers/query.helper";
import { FetchService } from "./fetchService";
import {
  IResponseGetAllProducts,
  IResponseGetProductsOfCategory,
  IResponseGetSingleProduct,
  ResponseGetProductsCategoriesType,
} from "./serviceTypes";

export class ProductService {
  static async getProducts(
    queryObject?: any
  ): Promise<IResponseGetAllProducts> {
    try {
      let url = API_URL.PRODUCTS.GET.ALL.URL;
      if (queryObject) {
        url += getQuery(queryObject);
      }
      const responseJson = await FetchService.callApi(
        url,
        API_URL.PRODUCTS.GET.ALL.METHOD
      );
      let response: IResponseGetAllProducts = await responseJson.json();
      return response;
    } catch (err) {
      throw err;
    }
  }
  static async getProductById(id: number): Promise<IResponseGetSingleProduct> {
    try {
      const responseJson = await FetchService.callApi(
        API_URL.PRODUCTS.GET.BY_ID.URL + id,
        API_URL.PRODUCTS.GET.BY_ID.METHOD
      );
      let response: IResponseGetSingleProduct = await responseJson.json();
      return response;
    } catch (err) {
      throw err;
    }
  }
  static async getCategories(): Promise<ResponseGetProductsCategoriesType> {
    try {
      const responseJson = await FetchService.callApi(
        API_URL.PRODUCTS.CATEGORIES.GET.ALL.URL,
        API_URL.PRODUCTS.CATEGORIES.GET.ALL.METHOD
      );
      let response: ResponseGetProductsCategoriesType =
        await responseJson.json();
      return response;
    } catch (err) {
      throw err;
    }
  }
  static async getProductsByCategory(
    category: string,
    queryObject?: any
  ): Promise<IResponseGetProductsOfCategory> {
    try {
      let url = API_URL.PRODUCTS.GET.ALL.BY_CATEGORY.URL + category;
      if (queryObject) {
        url += getQuery(queryObject);
      }
      const responseJson = await FetchService.callApi(
        url,
        API_URL.PRODUCTS.GET.ALL.BY_CATEGORY.METHOD
      );
      let response: IResponseGetProductsOfCategory = await responseJson.json();
      return response;
    } catch (err) {
      throw err;
    }
  }
  static async searchProductsByText(
    text: string,
    queryObject?: any
  ): Promise<IResponseGetProductsOfCategory> {
    try {
      let url = API_URL.PRODUCTS.SEARCH.BY_TEXT.URL + text;
      if (queryObject) {
        url += getQuery(queryObject);
      }
      const responseJson = await FetchService.callApi(
        url,
        API_URL.PRODUCTS.SEARCH.BY_TEXT.METHOD
      );
      let response: IResponseGetProductsOfCategory = await responseJson.json();
      return response;
    } catch (err) {
      throw err;
    }
  }
}
