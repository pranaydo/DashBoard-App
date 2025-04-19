import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { Filters } from "../type/types";

interface FiltersPanelProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ filters, setFilters }) => {
  return (
    <Box display="flex" gap={2} mt={2}>
      <TextField
        label="Sector"
        select
        value={filters.sector || ""}
        onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
      >
        {["Retail", "Food", "Industrial"].map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Category"
        value={filters.category || ""}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      />
    </Box>
  );
};

export default FiltersPanel;
