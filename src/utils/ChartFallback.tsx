import React from "react";
import { Box, Typography } from "@mui/material";

const ChartFallback: React.FC = () => {
  return (
    <Box
      sx={{
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        No chart data available for selected filters.
      </Typography>
    </Box>
  );
};

export default ChartFallback;
