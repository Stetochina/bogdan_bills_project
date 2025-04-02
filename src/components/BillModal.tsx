import React, { useState } from "react";
import { Modal, Tabs, Tab, Typography, Box, Stack } from "@mui/material";
import { Bill } from "../hooks/useBills";

const DisplayTitles: React.FC<{ longTitle: string; shortTitle: string }> = ({
  longTitle,
  shortTitle,
}) => {
  return (
    <Stack spacing={4} padding={"16px"}>
      <Stack>
        <Typography style={{ fontWeight: "bold" }}>Title:</Typography>
        <Typography>{longTitle}</Typography>
      </Stack>
      <Stack>
        <Typography style={{ fontWeight: "bold" }}>Short Title:</Typography>
        <Typography>{shortTitle}</Typography>
      </Stack>
    </Stack>
  );
};

const BillModal: React.FC<{
  selectedBill: Bill | null;
  onClose: () => void;
}> = ({ selectedBill, onClose }) => {
  const [tab, setTab] = useState(0);

  return (
    <Modal open={!!selectedBill} onClose={onClose}>
      <Box
        sx={{
          width: "700px",
          p: 2,
          bgcolor: "background.paper",
          mx: "auto",
          mt: 10,
        }}
      >
        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
          <Tab label="English" />
          <Tab label="Gaeilge" />
        </Tabs>
        {selectedBill &&
          (tab === 0 ? (
            <DisplayTitles
              longTitle={selectedBill.bill.longTitleEn}
              shortTitle={selectedBill.bill.shortTitleEn}
            />
          ) : (
            <DisplayTitles
              longTitle={selectedBill.bill.longTitleGa}
              shortTitle={selectedBill.bill.shortTitleGa}
            />
          ))}
      </Box>
    </Modal>
  );
};

export default BillModal;
