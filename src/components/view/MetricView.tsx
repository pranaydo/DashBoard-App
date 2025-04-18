import { useState } from "react";
import { Filters } from "../../type/types";
import TopBar from "../TopBar";
import MetricsTable from "./MetricsTable";
import FiltersPanel from "../FilterPanel";
const MetricsView = () => {
  const [filters, setFilters] = useState<Filters>({});

  return (
    <div className="metric-top-bar">
      <TopBar />
      {/* <FiltersPanel filters={filters} setFilters={setFilters  } />  bugs are there need to fix */}
      <MetricsTable filters={filters} />
    </div>
  );
};
export default MetricsView;
