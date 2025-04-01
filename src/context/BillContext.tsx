import React, { createContext, useContext, useState } from "react";
import { Bill } from "../hooks/useBills";

interface BillContextType {
  favourites: Set<Bill>;
  handleToggleFavourites: (event: React.SyntheticEvent, bill: Bill) => void;
}

const BillContext = createContext<BillContextType | undefined>(undefined);

export const BillProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Set<Bill>>(new Set());

  const handleToggleFavourites = (event: React.SyntheticEvent, bill: Bill) => {
    event.stopPropagation();

    let temp = [...favourites];
    const index = temp.indexOf(bill);
    if (index === -1) {
      temp.push(bill);
      console.log(
        `Sending mock POST request to api https://api.oireachtas.ie/v1/legislation/${bill.bill.billNo}/favourite/`,
        `with the following payloa ${JSON.stringify(bill)}`
      );
    } else {
      temp.splice(index, 1);
      console.log(
        `Sending mock DELETE request to api https://api.oireachtas.ie/v1/legislation/${bill.bill.billNo}/favourite/`,
        `with the following payloa ${JSON.stringify(bill)}`
      );
    }
    setFavourites(new Set(temp));
  };

  return (
    <BillContext.Provider value={{ favourites, handleToggleFavourites }}>
      {children}
    </BillContext.Provider>
  );
};

export const useBillContext = () => {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error("useBillContext must be used within a BillProvider");
  }
  return context;
};
