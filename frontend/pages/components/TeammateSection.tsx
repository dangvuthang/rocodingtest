import { Grid, Container } from "@mui/material";
import Teammates from "./interfaces/Teammates";
import TeammateBlock from "./TeammateBlock";

interface Props {
  teammates: Teammates[];
}

export default function TeammateSection({
  teammates,
}: Props): JSX.Element {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {teammates.map((teammate, index) => (
          <TeammateBlock teammate={teammate} key={index} />
        ))}
      </Grid>
    </Container>
  );
}
