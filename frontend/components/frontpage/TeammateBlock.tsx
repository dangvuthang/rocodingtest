import React from "react";
import { Avatar, Grid, Typography, Card } from "@mui/material";
import Teammates from "../interfaces/Teammates";

interface Props {
  teammate: Teammates;
}

export default function TeammateBlock({ teammate }: Props): JSX.Element {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card variant="outlined" sx={{ height: "100%", p: 2 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
          {teammate.image !== undefined ? (
            <Grid item>
              <Avatar
                variant="circular"
                alt={teammate.name}
                src={teammate.image}
              />
            </Grid>
          ) : null}
          <Grid item xs>
            <Typography variant="h4">{teammate.name}</Typography>
            <Typography variant="caption">{teammate.title}</Typography>
          </Grid>
        </Grid>
        <Typography variant="body2">{teammate.content}</Typography>
      </Card>
    </Grid>
  );
}
