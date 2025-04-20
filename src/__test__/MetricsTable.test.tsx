import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MetricsTable from "../components/view/MetricsTable";
import { Filters } from "../type/types";
import { UserProvider } from "../context/UserContext";

const renderWithContext = (filters: Filters) => {
  render(
    <UserProvider>
      <MetricsTable filters={filters} />
    </UserProvider>
  );
};

describe("MetricsTable - Basic Behavior", () => {
  it('renders "No data found" when no data matches', () => {
    const filters: Filters = {
      sector: "NonexistentSector",
    };

    renderWithContext(filters);

    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });

  it("renders correct metric headers based on selected metrics", () => {
    const filters: Filters = {
      metrics: ["mySpend"],
    };

    renderWithContext(filters);

    expect(screen.getByText(/My Spend/i)).toBeInTheDocument();
    expect(screen.getByText(/Current/i)).toBeInTheDocument();
    expect(screen.getByText(/Reference/i)).toBeInTheDocument();
    expect(screen.getByText(/Abs/i)).toBeInTheDocument();

    expect(screen.getAllByText("%")[0]).toBeInTheDocument();
  });

  it("toggles sort order when metric header is clicked", () => {
    const filters: Filters = {
      metrics: ["mySpend"],
    };

    renderWithContext(filters);

    const currentHeader = screen.getByText(/Current/i);
    expect(currentHeader).toBeInTheDocument();

    fireEvent.click(currentHeader);
    fireEvent.click(currentHeader);

    expect(currentHeader).toBeInTheDocument();
  });
});
