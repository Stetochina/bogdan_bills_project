import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container component={Paper} sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bills Information
      </Typography>
    </Container>
  );
};

export default App;
