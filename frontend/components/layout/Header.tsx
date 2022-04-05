import {
  Typography,
  Container,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import {  AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import dynamic from "next/dynamic";
import Link from "next/link";

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
} as const;

export default function Header(): JSX.Element {
  /*const isAuthenticated = useIsAuthenticated();*/
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
                align="center" 
                fontFamily= 'Caveat Brush'
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
            {/*{isAuthenticated ? <SignOutButton /> : <SignInButton />}*/}
            <AuthenticatedTemplate>
              <SignOutButton />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <SignInButton />
            </UnauthenticatedTemplate>
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Box>
  );
}