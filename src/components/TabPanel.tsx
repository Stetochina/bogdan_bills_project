import React, { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  CircularProgress,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Tabs,
  Tab,
  Typography,
  Box,
  Select,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import useBills from "../hooks/useBills";
import { Bill } from "../hooks/useBills";

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
      style={{ padding: "0px", width: "96%", marginTop: "30px" }}
    >
      {value === index && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bill Number</TableCell>
                <TableCell>Bill Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Sponsor</TableCell>
                <TableCell>Favourite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{children} </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TabPanel;
