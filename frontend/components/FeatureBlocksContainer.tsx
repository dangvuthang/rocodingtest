import React from "react";
import { Grid } from "@mui/material";

interface Props {
  children: React.ReactNode[];
}

export default function FeatureBlocksContainer({
  children,
}: Props): JSX.Element {
  return (
    <Grid sx={{ml:0.7}} container spacing={6}>
      {children}
    </Grid>
  );
}