import React, { useMemo } from "react";
import { Filters } from "../../type/types";
import { useUser } from "../../context/UserContext";
import { ResponsiveLine } from "@nivo/line";
import SendPerCat from "./charts/SendPerCat";

interface AnalyticsViewProps {
  filters: Filters;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ filters }) => {
  return (
    <>
      <SendPerCat filters={filters} />
      <SendPerCat filters={filters} />
    </>
  );
};

export default AnalyticsView;
