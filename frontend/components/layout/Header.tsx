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
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import dynamic from "next/dynamic";

const SignInButton = dynamic(() => import("./SignInButton"), {
  ssr: false,
});
const SignOutButton = dynamic(() => import("./SignOutButton"), {
  ssr: false,
});

const iconstyle = {
  flexDirection: 'column',
  background: "-webkit-linear-gradient(180deg, rgba(230, 0, 40, 0.723958) 0%, #F4B30B 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor:"transparent",
  TextFillColor:'transparent',
  letterSpacing:'0.1rem',
  fontSize:30,
  fontWeight:600,
  fontStyle: 'normal',
  fontFamily: 'Caveat Brush',
} as const;

export default function Header(): JSX.Element {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const [account] = useMsal().accounts;
  return (
    <Box
      sx={{
        bgcolor: (theme: { palette: { background: { default: any; }; }; }) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 1}}>
        <Grid container  alignItems="center" rowSpacing={4}>
          <Grid item xs={4}>
            <Link href="/" passHref>
              <Typography 
                variant="body1"  
                align="center" 
                sx={iconstyle}
              >
                HACKERMIT
              </Typography>
            </Link>
          </Grid>
          <Grid container item xs={6.5} justifyContent="flex-end" >
            {/*<Link href="/" passHref>
              <Button 
                sx={{border:' 0.10rem solid', mr: 1 }}
                color={router.pathname === "/" ? "primary" : "secondary"}
                variant="outlined"
              >
                Sign In
              </Button>
            </Link>*/}
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Box>
  );
}