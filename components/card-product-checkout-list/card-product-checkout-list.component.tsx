import React from "react";
import Grid from "@mui/material/Grid";
import CardProductCheckout from "@components/card-product-checkout/card-product-checkout.component";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducers";

export default function CardProductCheckoutList() {
  const products = useSelector((state: RootState) => state.cart.products);
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {products.map((product, index) => (
        <Grid item key={index}>
          <CardProductCheckout product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
