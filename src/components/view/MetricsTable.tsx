// import React from "react";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
// } from "@mui/material";

// import { useUser } from "../../context/UserContext";
// import { Filters } from "../../type/types";

// interface MetricsTableProps {
//   filters: Filters;
// }

// const MetricsTable: React.FC<MetricsTableProps> = ({ filters }) => {
//   const { user } = useUser();
//   const data = user.data.filter(
//     (d) => !filters.sector || d.sector === filters.sector
//   );

//   return (
//     <Paper>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Sector</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell>Spend</TableCell>
//             <TableCell>% Change</TableCell>
//             <TableCell>Absolute Change</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row, i) => (
//             <TableRow key={i}>
//               <TableCell>{row.sector}</TableCell>
//               <TableCell>{row.category}</TableCell>
//               <TableCell>{row.spend}</TableCell>
//               <TableCell>{row.percentChange}%</TableCell>
//               <TableCell>{row.absoluteChange}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// };

// export default MetricsTable;

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
  TablePagination,
  Box,
} from "@mui/material";
import { useUser } from "../../context/UserContext";
import { Filters } from "../../type/types";

interface MetricsTableProps {
  filters: Filters;
}

type DataRow = {
  sector: string;
  category: string;
  spend: number;
  percentChange: number;
  absoluteChange: number;
};

const MetricsTable: React.FC<MetricsTableProps> = ({ filters }) => {
  const { user } = useUser();
  const [orderBy, setOrderBy] = useState<keyof DataRow>("sector");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter data based on filters
  const filteredData = useMemo(
    () =>
      user.data.filter((d) => !filters.sector || d.sector === filters.sector),
    [user.data, filters.sector]
  );

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, orderBy, order]);

  // Paginate data
  const paginatedData = useMemo(
    () =>
      sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedData, page, rowsPerPage]
  );

  const handleSort = (property: keyof DataRow) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0); // Reset to first page when sorting changes
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component={Paper} elevation={3} sx={{ overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sortDirection={orderBy === "sector" ? order : false}
              sx={{ fontWeight: "bold" }}
            >
              <TableSortLabel
                active={orderBy === "sector"}
                direction={orderBy === "sector" ? order : "asc"}
                onClick={() => handleSort("sector")}
              >
                Sector
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "category" ? order : false}
              sx={{ fontWeight: "bold" }}
            >
              <TableSortLabel
                active={orderBy === "category"}
                direction={orderBy === "category" ? order : "asc"}
                onClick={() => handleSort("category")}
              >
                Category
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "spend" ? order : false}
              sx={{ fontWeight: "bold" }}
            >
              <TableSortLabel
                active={orderBy === "spend"}
                direction={orderBy === "spend" ? order : "asc"}
                onClick={() => handleSort("spend")}
              >
                Spend
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "percentChange" ? order : false}
              sx={{ fontWeight: "bold" }}
            >
              <TableSortLabel
                active={orderBy === "percentChange"}
                direction={orderBy === "percentChange" ? order : "asc"}
                onClick={() => handleSort("percentChange")}
              >
                % Change
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "absoluteChange" ? order : false}
              sx={{ fontWeight: "bold" }}
            >
              <TableSortLabel
                active={orderBy === "absoluteChange"}
                direction={orderBy === "absoluteChange" ? order : "asc"}
                onClick={() => handleSort("absoluteChange")}
              >
                Absolute Change
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.sector}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.spend}</TableCell>
              <TableCell>{row.percentChange}%</TableCell>
              <TableCell>{row.absoluteChange}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default MetricsTable;
