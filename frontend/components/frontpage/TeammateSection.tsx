import { Grid, Container, Typography } from "@mui/material";
import Teammates from "../interfaces/Teammates";
import TeammateBlock from "./TeammateBlock";

interface Props {
  title: string,
  teammates: Teammates[];
}

export default function TeammateSection({
  teammates, title
}: Props): JSX.Element {
  return (
    <Container maxWidth="md">
      <Typography sx={{ pb: 4 }} variant="h2" textAlign="center">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {teammates.map((teammate, index) => (
          <TeammateBlock teammate={teammate} key={index} />
        ))}
      </Grid>
    </Container>
  );
}
