import React, { useState } from "react";
import {
  Container,
  TableCell,
  CircularProgress,
  TableRow,
  IconButton,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import useBills from "../hooks/useBills";
import { useBillContext } from "../context/BillContext";
import { Bill } from "../hooks/useBills";
import TabPanel from "./TabPanel";
import BillModal from "./BillModal";

const BillTable: React.FC = () => {
  const { bills, billsLoading, page, handleSetPage, totalBillCount } =
    useBills();
  const { favourites, handleToggleFavourites } = useBillContext();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
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
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems={"center"}
        padding={"0 20px 0 20px"}
      >
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          style={{ marginTop: "20px" }}
        >
          <MenuItem value="">Filter by status</MenuItem>
          {/* Filtering based on status and not type as ive only seen Public type and the filtering didnt make much sense */}
          {[...new Set([...bills].map((bill) => bill.bill.status))].map(
            (type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            )
          )}
        </Select>
        {tabIndex == 0 && (
          <Pagination
            count={Math.ceil(totalBillCount / 50)}
            page={page}
            onChange={(_, value) => handleSetPage(value)}
          />
        )}
      </Stack>

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
        <TabPanel value={tabIndex} index={1}>
          {[...favourites].map((bill: Bill) => (
            <TableRow
              key={bill.bill.billNo}
              onClick={() => setSelectedBill(bill)}
            >
              <TableCell>{bill.bill.billNo}</TableCell>
              <TableCell>{bill.bill.billType}</TableCell>
              <TableCell>{bill.bill.status}</TableCell>
              <TableCell>{handleBillSponsor(bill)}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleToggleFavourites(e, bill)}>
                  <StarIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TabPanel>
      </Container>

      <BillModal
        selectedBill={selectedBill}
        onClose={() => setSelectedBill(null)}
      />
    </Container>
  );
};

export default BillTable;
