import type { ReactElement } from "react";
import Layout from "@components/layout/layout.component";
import type { NextPageWithLayout } from "@pages/_app";
import CardProductCheckoutList from "@components/card-product-checkout-list/card-product-checkout-list.component";
import CardCheckout from "@components/card-checkout/card-checkout.component";
import Head from "next/head";

const CheckoutPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/dummy-icon.png"
        />
        <title>Checkout | Dummy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CardProductCheckoutList />
      <CardCheckout />
    </>
  );
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CheckoutPage;
