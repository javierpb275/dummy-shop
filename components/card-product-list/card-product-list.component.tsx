import React from "react";
import Grid from "@mui/material/Grid";
import { IProduct } from "interface/product.interface";
import CardProduct from "@components/card-product/card-product.component";
import { Box } from "@mui/material";

type CardProductListProps = {
  products: IProduct[];
};

export default function CardProductList(props: CardProductListProps) {
  return (
    <Box sx={{ margin: "0px 0px 40px 0px" }}>
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {props.products.map((product, index) => (
        <Grid item xs={3} sm={4} md={3} key={index}>
          <CardProduct product={product} />
        </Grid>
      ))}
    </Grid>
    </Box>
  );
}
