import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BillTable from "../components/BillTable";
import useBills from "../hooks/useBills";
import { useBillContext } from "../context/BillContext";
import "@testing-library/jest-dom";

jest.mock("../hooks/useBills");
jest.mock("../context/BillContext");

const mockBills = [
  {
    bill: {
      billNo: "123",
      billType: "Public",
      status: "Active",
      shortTitleEn: "Test Bill 1",
      sponsors: [{ sponsor: { by: { showAs: "John Doe" } } }],
    },
  },
  {
    bill: {
      billNo: "456",
      billType: "Private",
      status: "Inactive",
      shortTitleEn: "Test Bill 2",
      sponsors: [{ sponsor: { by: { showAs: "Jane Smith" } } }],
    },
  },
];

describe("BillTable Component", () => {
  beforeEach(() => {
    (useBills as jest.Mock).mockReturnValue({
      bills: mockBills,
      billsLoading: false,
      page: 1,
      handleSetPage: jest.fn(),
      totalBillCount: mockBills.length,
    });

    (useBillContext as jest.Mock).mockReturnValue({
      favourites: [],
      handleToggleFavourites: jest.fn(),
    });
  });

  test("renders loading state initially", () => {
    (useBills as jest.Mock).mockReturnValueOnce({
      bills: [],
      billsLoading: true,
      page: 1,
      handleSetPage: jest.fn(),
      totalBillCount: 0,
    });

    render(<BillTable />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders bills correctly", () => {
    render(<BillTable />);

    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("456")).toBeInTheDocument();
  });

  test("renders pagination correctly", () => {
    render(<BillTable />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
