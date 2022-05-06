import HeroSection from "../components/frontpage/HeroSection";
import Page from "../components/layout/Page";
import ContactSection from "../components/frontpage/ContactSection";
import FeatureContainer from "../components/frontpage/FeatureContainer";
import BigSection from "../components/frontpage/BigSection";
import TeammateSection from "../components/frontpage/TeammateSection";
import Layout from "../components/layout/Layout";
import * as React from "react"
export default function HomePage() {
  // const isAuthenticated = useIsAuthenticated();
  // React.useEffect(() => {
  //   if (isAuthenticated === true) {
  //     Router.push(`/dashboard`)
  //       .then(() => console.log("DONE"))
  //       .catch((err) => console.log(err));
  //   }
  // }, [isAuthenticated]);
  return (
    <Layout>
      <Page maxWidth={false}>
        <HeroSection />
        <FeatureContainer />
        <BigSection />
        <TeammateSection />
        <ContactSection />
      </Page>
    </Layout>
  );
}

