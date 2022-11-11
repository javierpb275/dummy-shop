import type { ReactElement } from "react";
import Layout from "@components/layout/layout.component";
import type { NextPageWithLayout } from "@pages/_app";
import { GetStaticProps } from "next";
import { ProductService } from "services/productService";
import { IProduct } from "interface/product.interface";
import CardProductDetails from "@components/card-product-details/card-product-details.component";
import Loading from "@components/loading/loading.component";
import Head from "next/head";

const ProductPage: NextPageWithLayout<{ product: IProduct }> = ({
  product,
}) => {
  return !product.id ? (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/dummy-icon.png"
        />
        <title>Loading Product...</title>
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
        <title>{product.title} - Product | Dummy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CardProductDetails product={product} />
    </>
  );
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths = async () => {
  const data = await ProductService.getProducts({ limit: 9999 });
  const paths = data.products.map(({ id }) => {
    return {
      params: {
        id: id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const data = await ProductService.getProductById(Number(id));
  return {
    props: {
      product: data,
    },
  };
};

export default ProductPage;
