import React, { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import MetricsView from "./components/view/MetricView";
import AnalyticsView from "./components/view/AnalyticsView";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => {
  const [tab, setTab] = useState<number>(0);

  console.log(tab);
  return (
    <UserProvider>
      <div className="App">
        <Container>
          <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
            <Tab label="Metrics View" />
            <Tab label="Analytics View" />
          </Tabs>
          <Box mt={2}>{tab === 0 ? <MetricsView /> : <AnalyticsView />}</Box>
        </Container>
      </div>
    </UserProvider>
  );
};

export default App;
