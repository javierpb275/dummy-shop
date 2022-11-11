import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";

type LoadingProps = {
  title: string;
};

export default function Loading(props: LoadingProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft: "-100px"
      }}
    >
      <Typography variant="h3">{props.title}</Typography>
      <LinearProgress />
    </Box>
  );
}
