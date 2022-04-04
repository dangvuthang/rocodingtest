import { Button, Box } from "@mui/material";
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

export default function HomePage() {
  return (
    <Layout>
      <Page maxWidth={false}>
            <HeroSection
            title="HACKERMIT"
            subtitle="Easy to organize online exams. Stability and Anti-cheating."
            image="https://assets3.lottiefiles.com/packages/lf20_fGseie.json"
            >
            {/* <Link href="/react" passHref> */}
            <Button variant="contained" disableElevation sx={{ mr: 2, mt: 2 }}>
                Get started
            </Button>
            {/* </Link> */}
            {/* <Link href="/ios" passHref> */}
            {/* </Link> */}
            </HeroSection>
            <FeatureContainer title="Our Web's Princibles">
            <FeatureBlocksContainer>
                <FeatureBlock
                title="Intuitive"
                icon={<StarIcon />}
                content={
                    <>
                    Embedded code editor supports multiple languages Real time
                    coding Exam notification system
                    </>
                }
                />
                <FeatureBlock
                title="Manageble"
                icon={<SettingsIcon />}
                content={
                    <>
                    Allow managing separate examination Can host room and invite
                    students easily Secure identification system
                    </>
                }
                />
                <FeatureBlock
                title="Secure"
                icon={<ShieldIcon />}
                content={
                    <>
                    Screen tracking system can detect unusual behaviour Camera
                    tracking can record facial expressions Be able to notify the
                    teacher in real-time Provide evidence.
                    </>
                }
                />
            </FeatureBlocksContainer>
            </FeatureContainer>
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
  );
}
