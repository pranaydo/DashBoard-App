import React from "react";
import { Filters } from "../../type/types";
interface AnalyticsViewProps {
  filters: Filters;
}
const AnalyticsView: React.FC<AnalyticsViewProps> = ({ filters }) => {
  console.log("filters", filters);

  return <div> AnalyticsView</div>;
};
export default AnalyticsView;
