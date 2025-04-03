import React, { createContext, useContext, useState } from "react";
import { Bill } from "../hooks/useBills";

interface BillContextType {
  favourites: Set<Bill>;
  handleToggleFavourites: (event: React.SyntheticEvent, bill: Bill) => void;
}

// context created to handle all favourites related stuff
const BillContext = createContext<BillContextType | undefined>(undefined);

export const BillProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Set<Bill>>(new Set());

  // add or remove an item from the favourites
  const handleToggleFavourites = (event: React.SyntheticEvent, bill: Bill) => {
    event.stopPropagation();

    const temp = [...favourites];
    const index = temp.indexOf(bill);

    const exists = [...favourites].some(
      (favourite) => favourite.bill.billNo === bill.bill.billNo
    );
    if (!exists) {
      temp.push(bill);
      // in case we want to add a favourite this is a mock payload we would be sending
      // with a made up api (would probable handle it in suc a way from BE side)
      console.log(
        `Sending mock POST request to api https://api.oireachtas.ie/v1/legislation/${bill.bill.billNo}/favourite/`,
        `with the following payload ${JSON.stringify(bill)}`
      );
    } else {
      // in case of removal from favourites no payload would be neccessary, just a simpe DELETE would sufice :)
      temp.splice(index, 1);
      console.log(
        `Sending mock DELETE request to api https://api.oireachtas.ie/v1/legislation/${bill.bill.billNo}/favourite/`
      );
    }
    setFavourites(new Set(temp));
  };
  // the provided that wraps the whole so the favourites can be acquired from any component within the app
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
