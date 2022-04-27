import { Title } from "@mui/icons-material";
import { Grid, Typography, Container, Button, Box } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import SettingsIcon from "@mui/icons-material/Settings";
import HeroSection from "../components/frontpage/HeroSection";
import Page from "../components/layout/Page";
import ContactSection from "../components/frontpage/ContactSection";
import FeatureContainer from "../components/frontpage/FeatureContainer";
import FeatureBlocksContainer from "../components/frontpage/FeatureBlocksContainer";
import FeatureBlock from "../components/frontpage/FeatureBlock";
import StarIcon from "@mui/icons-material/Star";
import BigSection from "../components/frontpage/BigSection";
import TeammateSection from "../components/frontpage/TeammateSection";
import { teammates } from "../components/data/teammate";
import Layout from "../components/layout/Layout";
import useAccessToken from "../hooks/useAccessToken";
import theme from "../src/theme";
import { ThemeProvider } from "@mui/material";

export default function HomePage(): JSX.Element {
  const token = useAccessToken()
  console.log(token)
  return (
    <ThemeProvider theme={theme}>
    <Layout>
      <Page maxWidth={false}>
        <HeroSection
          title="HACKERMIT"
          subtitle="Easy to organize online exams. Stability and Anti-cheating."
          image="https://dummyimage.com/720x600"
        />
        <FeatureContainer 
          title="Our Web's Princibles"
        />
        <BigSection
          title="Our Goal!"
          subtitle="To simplify the process of making online examinations and to lighten the workload of teachers from making online examinations.Thus,
        preventing the online cheating at the minimum rate."
          animation="https://assets4.lottiefiles.com/private_files/lf30_obidsi0t.json"
        />
        <Box sx={{ mb: 8 }}>
          <TeammateSection title="About Us" teammates={teammates} />
        </Box>
        <Box sx={{ mb: 4 }}>
          <ContactSection />
        </Box>
      </Page>
    </Layout>
    </ThemeProvider>
  );
}
