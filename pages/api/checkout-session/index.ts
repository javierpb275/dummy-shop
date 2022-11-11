import { IProductInCart } from "@store/reducers/cart.reducer";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // destructure item from req.body
    const { products }: { products: IProductInCart[] } = req.body;
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    try {
      products.forEach((product) => {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              images: product.images,
              name: product.title,
            },
            unit_amount: Number((product.newPrice * 100).toFixed(2)), // to convert into cents
          },
          quantity: product.quantity,
        });
      });
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
          images: "/dummy-icon.png",
        },
        line_items,
        success_url: `${req.headers.origin}?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}?status=cancelled`,
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);
      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
