import React from "react";
import { Typography, Container } from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function FeatureContainer({ 
  title,
  children 
}: Props): JSX.Element {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md:8 }, pb: { xs: 8, md: 10 } }}>
      <Typography sx={{ pb:9}} variant="h2">{title}</Typography>
      {children}
    </Container>
  );
}