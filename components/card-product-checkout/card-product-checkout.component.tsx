import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import {
  addToCart,
  IProductInCart,
  removeAllFromCart,
  removeFromCart,
} from "@store/reducers/cart.reducer";
import { useDispatch } from "react-redux";
import { IProduct } from "interface/product.interface";
import { calculatePercentage, strikeThrough } from "helpers/helpers";
import CustomPopover from "@components/custom-popover/custom-popover.component";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type CardProductCheckoutProps = {
  product: IProductInCart;
};

export default function CardProductCheckout(props: CardProductCheckoutProps) {
  const dispatch = useDispatch();
  const addProduct = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  const removeProduct = (product: IProduct) => {
    dispatch(removeFromCart(product));
  };
  const removeAllProducts = (product: IProduct) => {
    dispatch(removeAllFromCart(product));
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
                  <Typography
                    onClick={() => addProduct(props.product)}
                    sx={{
                      cursor: "pointer",
                      marginRight: "20px",
                      fontSize: "30px",
                    }}
                    variant="body2"
                  >
                    +
                  </Typography>
                </CustomPopover>
                <Typography>{props.product.quantity}</Typography>
                <CustomPopover text="Remove From Cart">
                  <Typography
                    onClick={() => removeProduct(props.product)}
                    sx={{
                      cursor: "pointer",
                      marginRight: "20px",
                      fontSize: "30px",
                    }}
                    variant="body2"
                  >
                    -
                  </Typography>
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
            <CustomPopover text="Clear From Cart">
              <Typography
                onClick={() => removeAllProducts(props.product)}
                variant="subtitle1"
                component="div"
                sx={{
                  cursor: "pointer",
                  marginLeft: "15px",
                }}
              >
                X
              </Typography>
            </CustomPopover>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
