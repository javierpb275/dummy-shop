import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IProduct } from "interface/product.interface";
import { Button, Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "@store/reducers/cart.reducer";
import { calculatePercentage, strikeThrough } from "helpers/helpers";
import CustomPopover from "@components/custom-popover/custom-popover.component";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type CardProductDetailsProps = {
  product: IProduct;
};

export default function CardProductDetails(props: CardProductDetailsProps) {
  const dispatch = useDispatch();

  const addProduct = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 1000,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Img
            sx={{ width: 300, height: 300 }}
            alt={props.product.title}
            src={props.product.images[0]}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.product.title}
              </Typography>
              {props.product.discountPercentage &&
              props.product.discountPercentage > 0 ? (
                <Typography variant="body2" gutterBottom>
                  {props.product.discountPercentage}% Discount
                </Typography>
              ) : null}
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {props.product.description}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Brand: {props.product.brand}
              </Typography>
              <Rating name="read-only" value={props.product.rating} readOnly />
              <Grid item display="flex">
                <CustomPopover text="Add To Cart">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => addProduct(props.product)}
                  >
                    +
                  </Button>
                </CustomPopover>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {props.product.discountPercentage &&
            props.product.discountPercentage > 0 ? (
              <div>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ opacity: "0.5" }}
                >
                  {`$${strikeThrough(props.product.price.toString())}`}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  $
                  {calculatePercentage(
                    props.product.price,
                    props.product.discountPercentage
                  )}
                </Typography>
              </div>
            ) : (
              <Typography variant="subtitle1" component="div">
                ${props.product.price}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
