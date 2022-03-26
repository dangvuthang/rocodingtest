import { Title } from "@mui/icons-material";
import { Grid, Typography, Container,Button, Box } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import HeroSection from "../components/HeroSection";
import Page from "../components/layout/Page";
import ContactSection from "../components/ContactSection";
import FeatureContainer from "../components/FeatureContainer";
import FeatureBlocksContainer from "../components/FeatureBlocksContainer";
import FeatureBlock from "../components/FeatureBlock";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import BigSection from "../components/BigSection";
import TeammateSection from "../components/TeammateSection";
import { teammates } from "../components/data/teammate";

export default function HomePage(): JSX.Element {
  return (
    <Page maxWidth={false}>
      <HeroSection
        title="HACKERMIT"
        subtitle="Modern, beautiful, bold. Solve problems, today"
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
      <FeatureContainer
        title="Our Web's Princibles"
      >
        <FeatureBlocksContainer>
          <FeatureBlock
            title="Intuitive"
            icon={<PeopleIcon />}
            content={
              <>
                Embedded code editor supports multiple languages
                Real time coding
                Exam notification system
              </>
            }
          />
          <FeatureBlock
            title="Manageble"
            icon={<StarIcon />}
            content={
              <>
                Allow managing separate examination
                Can host room and invite students easily
                Secure identification system
              </>
            }
          />
          <FeatureBlock
            title="Secure"
            icon={<CodeIcon />}
            content={
              <>
                Screen tracking system can detect unusual behaviour
                Camera tracking can record facial expressions
                Be able to notify the teacher in real-time
                Provide evidence.
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
      <Box sx={{mb: 8}}>
          <TeammateSection 
          title="About Us"
          teammates={teammates}/>
      </Box>
      <Box sx={{mb: 4}}>
        <ContactSection />
      </Box>
    </Page>
  );
};

