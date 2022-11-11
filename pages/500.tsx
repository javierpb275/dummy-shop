import React, { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import { NextPageWithLayout } from "./_app";
import Layout from "@components/layout/layout.component";
import { useRouter } from "next/router";
import Head from "next/head";

const Custom500: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/dummy-icon.png"
        />
        <title>500 Error</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h1">500</Typography>
        <Typography variant="h6">Ups... Something went wrong!</Typography>

        <Button onClick={() => router.push("/")} variant="contained">
          Back Home
        </Button>
      </Box>
    </>
  );
};

Custom500.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Custom500;
