import type { ReactElement } from "react";
import Layout from "@components/layout/layout.component";
import type { NextPageWithLayout } from "@pages/_app";
import { GetStaticProps } from "next";
import { ProductService } from "services/productService";
import { IProduct } from "interface/product.interface";
import CardProductList from "@components/card-product-list/card-product-list.component";
import Loading from "@components/loading/loading.component";
import Head from "next/head";

const ProductsCategoryPage: NextPageWithLayout<{
  products: IProduct[];
  category: string;
}> = ({ products, category }) => {
  return !products.length ? (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/dummy-icon.png"
        />
        <title>Loading Products...</title>
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
        <title> {category} - Category | Dummy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CardProductList products={products} />
    </>
  );
};

ProductsCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths = async () => {
  const data = await ProductService.getCategories();
  const paths = data.map((category) => {
    return {
      params: {
        category,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params?.category as string;
  const data = await ProductService.getProductsByCategory(category, {
    limit: 9999,
  });
  return {
    props: {
      products: data.products,
      category,
    },
  };
};

export default ProductsCategoryPage;
