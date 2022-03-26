import React from "react";
import { Grid } from "@mui/material";

interface Props {
  children: React.ReactNode[];
}

export default function FeatureBlocksContainer({
  children,
}: Props): JSX.Element {
  return (
    <Grid container spacing={4}>
      {children}
    </Grid>
  );
}