import { Filters } from "../../type/types";
import MetricsTable from "./MetricsTable";

const MetricsView: React.FC<Filters> = (filters) => {
  return (
    <div className="metric-top-bar">
      <MetricsTable filters={filters} />
    </div>
  );
};
export default MetricsView;
