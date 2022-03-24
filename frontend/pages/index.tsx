import { Title } from "@mui/icons-material";
import { Grid, Typography, Container,Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Page from "./components/layout/Page";
import FeatureContainer from "./components/FeatureContainer";
import FeatureBlocksContainer from "./components/FeatureBlocksContainer";
import FeatureBlock from "./components/FeatureBlock";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";

export default function HomePage(): JSX.Element {
  return (
    <Page maxWidth={false}>
      <HeroSection
        title="HACKERMIT"
        subtitle="Modern, beautiful, bold. Solve problems, today"
        image="/assets/city.svg"
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
                    Exam notification system<br/>
              </>
            }
          />
          <FeatureBlock
            title="Manageble"
            icon={<StarIcon />}
            content={
              <>
                hehe
                huhu
              </>
            }
          />
          <FeatureBlock
            title="Secure"
            icon={<CodeIcon />}
            content={
              <>
                Vitae turpis massa sed elementum tempus egestas. Commodo sed
                egestas egestas fringilla phasellus faucibus.
              </>
            }
          />
        </FeatureBlocksContainer>
      </FeatureContainer>
    </Page>
  );
};

