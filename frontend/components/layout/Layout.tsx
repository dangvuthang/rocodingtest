import { Box } from "@mui/material";
//import Footer from "components/layout/Footer";
import Header from './Header';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
}