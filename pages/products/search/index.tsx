import type { ReactElement } from "react";
import Layout from "@components/layout/layout.component";
import type { NextPageWithLayout } from "../../_app";
import { GetServerSideProps } from "next";
import { ProductService } from "services/productService";
import CardProductList from "@components/card-product-list/card-product-list.component";
import { IProduct } from "interface/product.interface";
import Loading from "@components/loading/loading.component";
import Head from "next/head";

const SearchPage: NextPageWithLayout<{ products: IProduct[] }> = ({
  products,
}) => {
  return !products.length ? (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/dummy-icon.png"
        />
        <title>Searching Products...</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Loading title="Searching..." />
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
        <title>Search | Dummy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CardProductList products={products} />
    </>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const data = await ProductService.getProducts({ limit: 12 });

  return {
    props: { products: data.products },
  };
};

export default SearchPage;
