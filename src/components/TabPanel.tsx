import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TabPanel = ({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ padding: "20px", width: "100%", marginTop: "30px" }}
    >
      {value === index && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1em" }}>Bill Number</TableCell>
                <TableCell sx={{ fontSize: "1em" }}>Bill Type</TableCell>
                <TableCell sx={{ fontSize: "1em" }}>Status</TableCell>
                <TableCell sx={{ fontSize: "1em" }}>Sponsor</TableCell>
                <TableCell sx={{ fontSize: "1em" }}>Favourite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TabPanel;
