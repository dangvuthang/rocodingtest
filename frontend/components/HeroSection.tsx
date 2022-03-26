import React from "react";
import { Typography, Box, Grid, Container } from "@mui/material";
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  image: string;
  children?: React.ReactNode;/** Replace with ReactNode[] to add more components*/
};

export default function HeroSection({
  title,
  subtitle,
  image,
  children,
}: Props): JSX.Element {
  return (
    <Box sx={{  backgroundColor: "	#fccc74" }}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" sx={{ py: 6 }} >
          <Grid item sx={{ml:12}}xs={6} sm={4}>
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body1">{subtitle}</Typography>
            {children}
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} xs={6} sm={7}>
            <Container>
              <Image src={image} width={600} height={600} />
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}