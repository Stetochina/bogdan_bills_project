import React, { useState } from "react";
import {
  Container,
  TableCell,
  CircularProgress,
  TableRow,
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
import TabPanel from "./TabPanel";
import useBills from "../hooks/useBills";
import { Bill } from "../hooks/useBills";
import { useBillContext } from "../context/BillContext";

const BillTable: React.FC = () => {
  const { bills, billsLoading, page, handleSetPage, totalBillCount } =
    useBills();
  const { favourites, handleToggleFavourites } = useBillContext();

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const rowsPerPage = 50;

  const filteredBills = filter
    ? [...bills].filter((bill) => bill.bill.status === filter)
    : bills;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleBillSponsor = (bill: Bill) => {
    const sponsors = bill.bill.sponsors;
    let temp = [];
    for (let i = 0; i < sponsors.length; i++) {
      let item_sponsor =
        sponsors[i].sponsor["by"]["showAs"] ??
        sponsors[i].sponsor["as"]["showAs"];
      temp.push(item_sponsor);
    }
    return temp.join(", ");
  };

  const checkIsFavourite = (bill: Bill) => {
    const exists = [...favourites].some(
      (favourite) => favourite.bill.billNo === bill.bill.billNo
    );

    if (exists) {
      return <StarIcon color="primary" />;
    } else {
      return <StarBorderIcon />;
    }
  };

  if (!totalBillCount) {
    return (
      <Container
        style={{
          overflow: "scroll",
          height: "1000px",
          padding: 0,
          display: "grid",
          placeItems: tabIndex == 1 ? "start" : "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab value={0} label="All Bills" />
        <Tab value={1} label="Favourites" />
      </Tabs>

      <Container
        style={{
          padding: 0,
          display: "grid",
          placeItems: "center",
          alignItems: "start",
          height: "700px",
          overflow: "scroll",
        }}
      >
        {billsLoading ? (
          <CircularProgress />
        ) : (
          <TabPanel value={tabIndex} index={0}>
            {[...filteredBills].map((bill) => (
              <TableRow
                key={`${bill.bill.billNo} ${bill.bill.shortTitleEn}`}
                onClick={() => setSelectedBill(bill)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{bill.bill.billNo}</TableCell>
                <TableCell>{bill.bill.billType}</TableCell>
                <TableCell>{bill.bill.status}</TableCell>
                <TableCell style={{ maxWidth: "250px" }}>
                  {handleBillSponsor(bill)}
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleToggleFavourites(e, bill)}>
                    {checkIsFavourite(bill)}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TabPanel>
        )}
      </Container>
    </Container>
  );
};

export default BillTable;
