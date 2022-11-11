import { ReactElement, useState } from "react";
import Layout from "@components/layout/layout.component";
import type { NextPageWithLayout } from "./_app";
import { GetServerSideProps } from "next";
import { ProductService } from "services/productService";
import CardProductList from "@components/card-product-list/card-product-list.component";
import { IProduct } from "interface/product.interface";
import Loading from "@components/loading/loading.component";
import Head from "next/head";
import { Waypoint } from "react-waypoint";
import { useRouter } from "next/router";
//import {serverSideTranslations} from "next-i18next/serverSideTranslations";
//import { useTranslation } from "next-i18next";

const HomePage: NextPageWithLayout<{ products: IProduct[] }> = ({
  products,
}) => {
  const [productsState, setProductsState] = useState<IProduct[]>([]);
  const router = useRouter();
  const loadNextproducts = async () => {
    const data = await ProductService.getProducts({
      ...router.query,
      limit: productsState.length
        ? productsState.length + 8
        : products.length + 8,
    });
    setProductsState(data.products);
  };
  return !products.length ? (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/dummy-icon.png"
        />
        <title>Loading Home Page...</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Loading title="Loading..." />
    </>
  ) : (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/dummy-icon.png"
        />
        <title>Home | Dummy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CardProductList
        products={!productsState.length ? products : productsState}
      />
      <Waypoint onEnter={() => loadNextproducts()} />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const data = await ProductService.getProducts({
    ...context.query,
    limit: !context.query.limit ? 12 : context.query.limit,
  });

  return {
    props: { products: data.products },
  };
};

/* export async function getStaticProps({locale}: props) {
  return {
    props: { 
      ...(await serverSideTranslations(locale, ["navbar", "common", "home"]))
     },
  };
};
 */
export default HomePage;
