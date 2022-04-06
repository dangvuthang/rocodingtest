import { Container, Typography } from "@mui/material";
import React, { useRef } from "react";
type Props = {
  title: string;
  subtitle: string;
  animation:string;
};

export default function BigSection({ title, subtitle,animation }: Props): JSX.Element {
  const ref = useRef(null);
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <Container maxWidth="md" >
      <Typography sx={{ pb: 2.5 }} variant="h2" textAlign="center">
        {title}
      </Typography>
      <Typography variant="body1" textAlign="center">
        {subtitle}
      </Typography>
      <Container sx={{ display: "flex", justifyContent: "center", mb: 16 }}>
          <lottie-player
              ref={ref}
              hover
              autoplay
              loop
              mode="normal"
              src={animation}
              speed="1"
              background="transparent"
              style={{ width: "600px", height: "600px" }}
          ></lottie-player>
      </Container>
    </Container>
  );
}
