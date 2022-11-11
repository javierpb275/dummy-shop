import type { ReactElement } from "react";
import Layout from "@components/layout/layout.component";
import type { NextPageWithLayout } from "@pages/_app";
import SignInForm from "@components/signin-form/signin-form.component";
import Head from "next/head";

const SignInPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/dummy-icon.png"
        />
        <title>Sign In - Dummy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SignInForm />
    </>
  );
};

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SignInPage;
