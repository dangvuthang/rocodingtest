import React from "react";
import { Typography, Box, Grid, Container, Button } from "@mui/material";
import Image from "next/image";

export default function ContactSection(): JSX.Element {
  return (
    <Box sx={{ backgroundColor: "#fccc74", borderRadius: 4, p: 2 }}>
      <Container maxWidth="md">
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" sx={{ ml: 6 }}>
              Contact us
            </Typography>
            <Typography variant="body1" sx={{ ml: 10, mb: 2 }}>
              Get in touch to ask us anything, sales or otherwise!
            </Typography>
            <Button
              sx={{ ml: 18 }}
              variant="contained"
              href="mailto:hello@example.com"
            >
              Send an email
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Container>
              <Image
                src="/assets/contact.svg"
                width={400}
                height={280}
                alt="contact-image"
              />
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
