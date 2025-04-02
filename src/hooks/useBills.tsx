import { useState, useEffect } from "react";
import axios from "axios";

export interface Bill {
  bill: {
    billNo: string;
    billType: string;
    status: string;
    sponsors: [
      {
        sponsor: {
          as: { showAs: string | null };
          by: { showAs: string | null };
        };
      }
    ];
    shortTitleEn: string;
    shortTitleGa: string;
    longTitleEn: string;
    longTitleGa: string;
  };
}

const pageSize = 50;

const useBills = () => {
  const [bills, setBills] = useState<Set<Bill>>(new Set());
  const [page, setPage] = useState(1);
  const [billsLoading, setBillsLoading] = useState<Boolean>(false);
  const [totalBillCount, setTotalBillCount] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("");

  const handleSetPage = (pageNumber: number) => {
    if (pageNumber !== page) {
      setBillsLoading(true);
      setPage(pageNumber);
    }
  };

  const fetchBills = async () => {
    const skip = (page - 1) * pageSize;

    let queryFilterParam = "";
    if (filter != "") {
      // adding query param every time a filter is selected
      queryFilterParam = `&bill_status=${filter}`;
    }

    try {
      const response = await axios.get(
        `https://api.oireachtas.ie/v1/legislation?limit=${pageSize}&skip=${skip}${queryFilterParam}`
      );

      setBills(new Set(response.data.results));

      setTotalBillCount(response.data.head.counts.billCount);

      setBillsLoading(false);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };
  // initially fetch bills and refetch on any page/filter change
  useEffect(() => {
    fetchBills();
  }, [page, filter]);

  // set filter and reset pagination page to 1 on filter change
  const handleSetFilter = (filter: string) => {
    setBillsLoading(true);
    setFilter(filter);
    setPage(1);
  };

  return {
    bills,
    billsLoading,
    page,
    handleSetPage,
    totalBillCount,
    filter,
    handleSetFilter,
  };
};

export default useBills;
