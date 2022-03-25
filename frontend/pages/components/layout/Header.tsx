import {
  Typography,
  Container,
  Grid,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header(): JSX.Element {
  const router = useRouter();

  return (
    <Box
      sx={{
        bgcolor: (theme: { palette: { background: { default: any; }; }; }) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="md" sx={{ py: 1 }}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Typography variant="body1" align="center" sx={{ fontWeight: 600 }}>
              HACKERMIT
            </Typography>
          </Grid>
          <Grid container item xs={10} justifyContent="flex-end">
            <Link href="/" passHref>
              <Button
                sx={{ mr: 2 }}
                color={router.pathname === "/" ? "primary" : "secondary"}
                variant="outlined"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/page2" passHref>
              <Button
                sx={{ mr: 2 }}
                color={router.pathname === "/" ? "primary" : "secondary"}
                variant="contained"
              >
                Sign Up
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Box>
  );
}