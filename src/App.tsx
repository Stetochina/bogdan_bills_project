import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import BillTable from "./components/BillTable";

const App: React.FC = () => {
  return (
    <Container component={Paper} sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bills Information
      </Typography>
      <BillTable />
    </Container>
  );
};

export default App;
