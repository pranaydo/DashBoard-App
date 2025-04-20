import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import MetricsView from "./components/view/MetricView";
import AnalyticsView from "./components/view/AnalyticsView";
import { UserProvider } from "./context/UserContext";
import TopBar from "./components/TopBar";
import FiltersPanel from "./components/FilterPanel";
import { Filters } from "./type/types";

const App: React.FC = () => {
  const [tab, setTab] = useState<number>(0);
  const [filters, setFilters] = useState<Filters>({});

  console.log(tab);
  return (
    <UserProvider>
      <div className="App">
        <Box sx={{ px: 10, py: 10, m: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
              <Tab label="Metrics View" />
              <Tab label="Analytics View" />
            </Tabs>
            <div>
              <TopBar />
            </div>
          </div>
          <div>
            <FiltersPanel filters={filters} setFilters={setFilters} />
          </div>

          <Box mt={2}>
            {tab === 0 ? (
              <MetricsView filters={filters} />
            ) : (
              // <AnalyticsView filters={filters} />
              <div> analytics</div>
            )}
          </Box>
        </Box>
      </div>
    </UserProvider>
  );
};

export default App;
