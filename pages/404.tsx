import React, { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import { NextPageWithLayout } from "./_app";
import Layout from "@components/layout/layout.component";
import { useRouter } from "next/router";
import Head from "next/head";

const Custom404: NextPageWithLayout = () => {
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
        <title>404 Not Found</title>
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
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">
          The page you’re looking for doesn’t exist.
        </Typography>

        <Button onClick={() => router.push("/")} variant="contained">
          Back Home
        </Button>
      </Box>
    </>
  );
};

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Custom404;
