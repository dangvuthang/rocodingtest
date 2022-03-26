import React, { useRef }from "react";
import { Typography, Box, Grid, Container } from "@mui/material";

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
  const ref = useRef(null);
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
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
            <lottie-player
              hover
              autoplay
              loop
              mode="normal"
              src={image}
              speed="1"
              background="transparent"
              style={{ width: "600px", height: "600px" }}
          ></lottie-player>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}