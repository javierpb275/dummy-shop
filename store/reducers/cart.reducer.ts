import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculatePercentage } from "helpers/helpers";
import { IProduct } from "interface/product.interface";

export interface IProductInCart extends IProduct {
  quantity: number;
  newPrice: number;
}

export interface CartState {
  products: IProductInCart[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productInCart = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (productInCart) {
        productInCart.quantity++;
      } else {
        state.products.push({
          ...action.payload,
          quantity: 1,
          newPrice: calculatePercentage(
            action.payload.price,
            action.payload.discountPercentage
          ),
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      const productInCart = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!productInCart) {
        return;
      }
      if (productInCart.quantity > 1) {
        productInCart.quantity--;
      } else {
        const filteredProducts = state.products.filter(
          (product) => product.id !== action.payload.id
        );
        state.products = filteredProducts;
      }
    },
    removeAllFromCart: (state, action: PayloadAction<IProduct>) => {
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.products = filteredProducts;
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, removeAllFromCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
