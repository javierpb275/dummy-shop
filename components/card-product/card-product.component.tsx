import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IProduct } from "interface/product.interface";
import {
  calculatePercentage,
  capitalizeFirstLetter,
  strikeThrough,
} from "helpers/helpers";
import Link from "next/link";
import { Button, Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "@store/reducers/cart.reducer";
import CustomPopover from "@components/custom-popover/custom-popover.component";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

type CardProductProps = {
  product: IProduct;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardProduct(props: CardProductProps) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addProduct = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {props.product.discountPercentage &&
      props.product.discountPercentage > 0 ? (
        <div>
          <CardHeader
            title={props.product.title}
            subheader={`$${strikeThrough(props.product.price.toString())}`}
          />
          <Typography sx={{ float: "right", fontSize: "20px" }}>
            $
            {calculatePercentage(
              props.product.price,
              props.product.discountPercentage
            )}
          </Typography>
          <div style={{ position: "relative" }}>
            <Link href={`/products/${props.product.id}`}>
              <CardMedia
                component="img"
                height="194"
                image={props.product.images[0]}
                alt={props.product.title}
              />
            </Link>
            <div
              style={{
                position: "absolute",
                color: "white",
                background: "#8B0000",
                bottom: 0,
                left: "90%",
                transform: "translateX(-50%)",
              }}
            >
              {`${props.product.discountPercentage}% Discount`}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <CardHeader
            title={props.product.title}
            subheader={`$${props.product.price}`}
          />
          <Link href={`/products/${props.product.id}`}>
            <CardMedia
              component="img"
              height="194"
              image={props.product.images[0]}
              alt={props.product.title}
            />
          </Link>
        </div>
      )}

      <CardContent>
        <Rating
          sx={{ float: "left" }}
          name="read-only"
          value={props.product.rating}
          readOnly
        />
        <CardActions>
          <CustomPopover text="Add To Cart">
            <Button
              sx={{ width: "20px", height: "30px" }}
              color="secondary"
              variant="contained"
              onClick={() => addProduct(props.product)}
            >
              +
            </Button>
          </CustomPopover>
          <CustomPopover text="Show More Info">
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CustomPopover>
        </CardActions>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {props.product.description}
          </Typography>
          <Typography paragraph gutterBottom>
            {capitalizeFirstLetter(props.product.category.replace(/-/g, " "))}
          </Typography>
          <Typography paragraph>{props.product.brand}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
