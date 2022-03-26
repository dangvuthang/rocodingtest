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
        image="/assets/Education_Background_vector_5.jpg"
      >
        {/* <Link href="/react" passHref> */}
        <Button variant="contained" disableElevation sx={{ mr: 2, mt: 2 }}>
          Get started
        </Button>
        {/* </Link> */}
        {/* <Link href="/ios" passHref> */}
        <Button disableElevation sx={{ mr: 2, mt: 2 }}>
          Contact us
        </Button>
        {/* </Link> */}
      </HeroSection>
      <FeatureContainer>
        <FeatureBlocksContainer>
          <FeatureBlock
            title="Intuitive"
            icon={<PeopleIcon />}
            content={
              <>
                    Embedded code editor supports multiple languages<br/>
                    Real time coding<br/>
                    Exam notification system
              </>
            }
          />
          <FeatureBlock
            title="Manageble"
            icon={<StarIcon />}
            content={
              <>
                Allow managing separate examination<br/>
                Can host room and invite students easily<br/>
                Secure identification system
              </>
            }
          />
          <FeatureBlock
            title="Secure"
            icon={<CodeIcon />}
            content={
              <>
                Screen tracking system can detect unusual behaviour<br/>
                Camera tracking can record facial expressions<br/>
                Be able to notify the teacher in real-time<br/>
                Provide evidence.
              </>
            }
          />
        </FeatureBlocksContainer>
      </FeatureContainer>
      <BigSection
        title="Simplify the process of making online examinations" 
        subtitle="We expected to reduce the workload of teachers from making online examinations. 
        Preventing the online cheating at the minimum rate."
      />
      <Box sx={{mb: 8}}>
          <TeammateSection teammates={teammates}/>
      </Box>
      <Box sx={{mb: 4}}>
        <ContactSection />
      </Box>
    </Page>
  );
};

