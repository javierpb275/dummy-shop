import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/reducers";
import { calculatePercentage } from "helpers/helpers";
import getStripe from "utils/getStripejs";
import { postRequest } from "utils/postRequest";
import { useRouter } from "next/router";
import CustomDialog from "@components/custom-dialog/custom-dialog.component";
import { clearCart } from "@store/reducers/cart.reducer";

export default function CardCheckout() {
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.cart.products);

  const total = React.useMemo(
    () =>
      products.reduce((total, product) => {
        let price = product.price;
        if (product.discountPercentage && product.discountPercentage > 0) {
          price = calculatePercentage(price, product.discountPercentage);
        }
        total += price * product.quantity;
        return Number(total.toFixed(2));
      }, 0),
    [products]
  );

  const handleClose = () => {
    setOpen(false);
  };

  const clearProductsFromCart = () => {
    dispatch(clearCart());
  };

  const checkout = async () => {
    try {
      setLoading(true);
      // Create a Checkout Session.
      const response = await postRequest("/api/checkout-session", { products });
      if (response.statusCode === 500) {
        setOpen(true);
        setMessage(response.message);
        console.error(response.message);
        setLoading(false);
        return;
      }
      // Redirect to Checkout.
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: response.id,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      if (error) {
        setOpen(true);
        setMessage(response.message);
        console.warn(error.message);
      }
      if (!error) {
        clearProductsFromCart();
      }
      setLoading(false);
    } catch (error) {
      setOpen(true);
      setMessage("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              TOTAL:
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {total}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {loading ? (
            <Button size="small" color="primary">
              <CircularProgress />
            </Button>
          ) : (
            <Button
              size="small"
              color="primary"
              onClick={checkout}
              sx={{ cursor: "pointer" }}
            >
              Checkout
            </Button>
          )}
          <Button
            size="small"
            color="primary"
            onClick={clearProductsFromCart}
            sx={{ cursor: "pointer" }}
          >
            Clear Cart
          </Button>
        </CardActions>
      </Card>
      {router.query.status === "cancelled" && (
        <CustomDialog
          handleClose={handleClose}
          open={open}
          message={message}
          title="ERROR"
        />
      )}
      {router.query.status === "success" && (
        <CustomDialog
          handleClose={handleClose}
          open={open}
          message="Payment was successful!"
          title="SUCCESS"
        />
      )}
    </>
  );
}
