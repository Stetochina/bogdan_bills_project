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
  const [favourites, setFavourites] = useState<Bill[]>([]);
  const [billsLoading, setBillsLoading] = useState<Boolean>(false);
  const [totalBillCount, setTotalBillCount] = useState<number | null>(null);

  const handleSetPage = (pageNumber: number) => {
    if (pageNumber !== page) {
      setBillsLoading(true);
      setPage(pageNumber);
    }
  };

  const fetchBills = async () => {
    const skip = (page - 1) * pageSize;

    try {
      const response = await axios.get(
        `https://api.oireachtas.ie/v1/legislation?limit=${pageSize}&skip=${skip}`
      );
      console.log(response);
      setBills(new Set(response.data.results));
      if (!totalBillCount) {
        setTotalBillCount(response.data.head.counts.billCount);
      }
      setBillsLoading(false);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [page]);

  const toggleFavourite = (bill: Bill) => {
    let temp = [...favourites];
    const index = temp.indexOf(bill);
    if (index === -1) {
      temp.push(bill);
    } else {
      temp.splice(index, 1);
    }
    setFavourites(temp);
  };

  return {
    bills,
    favourites,
    toggleFavourite,
    billsLoading,
    page,
    handleSetPage,
    totalBillCount,
  };
};

export default useBills;
