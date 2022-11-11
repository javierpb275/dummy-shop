import { IProduct } from "../interface/product.interface";
import { IUser } from "../interface/user.interface";
import { CategoriesListType } from "../types";

//TYPES

export type BodyType = string | object;

export type HeadersType = HeadersInit | undefined;

//TOKEN

export interface IDataForLocalStorage {
  token?: string;
  id?: number;
}

export enum LocalStorageItems {
  ACCESS_TOKEN = "access_token_nextjs_ts_1",
  REFRESH_TOKEN = "refresh_token_nextjs_ts_1",
  USER_ID = "user_id_nextjs_ts_1",
}

export interface IPayload extends IUser {
  iat: number;
  exp: number;
}

//BODY
export interface IBodySignIn {
  username: string;
  password: string;
}

//RESPONSE

//error
export interface IResponseError {
  message: string;
}

//USERS
export interface IResponseSignIn extends IUser {
  token: string;
}

export interface IResponseGetSingleUser extends IUser {}

//PRODUCTS
export interface IResponseGetSingleProduct extends IProduct {}

export interface IResponseGetAllProducts {
  products: IProduct[];
}

export interface IResponseGetProductsOfCategory
  extends IResponseGetAllProducts {
  total: number;
  skip: number;
  limit: number;
}

export type ResponseGetProductsCategoriesType = CategoriesListType;
