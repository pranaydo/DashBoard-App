import { Filters } from "../../type/types";
import MetricsTable from "./MetricsTable";

interface MetricsViewProps {
  filters: Filters;
}
const MetricsView: React.FC<MetricsViewProps> = ({ filters }) => {
  return (
    <div className="metric-top-bar">
      <MetricsTable filters={filters} />
    </div>
  );
};
export default MetricsView;
