import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import BillTable from "./components/BillTable";
import { BillProvider } from "./context/BillContext";

const App: React.FC = () => {
  return (
    <BillProvider>
      <Container component={Paper} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bills Information
        </Typography>
        <BillTable />
      </Container>
    </BillProvider>
  );
};

export default App;
