import { Typography, Box } from "@mui/material";

export default function Footer(): JSX.Element {
  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="body2" align="center">
        {"Copyright © My Company "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}