DashBoard App

# Dashboard App (React + TypeScript + MUI)

This is a dashboard web application built using React, TypeScript, Material UI (MUI), and Nivo charts. It allows switching between users, filtering key metrics, and viewing data in both table and chart formats.

---

## Live Demo

[Visit the deployed site](https://dashfilter.netlify.app/)

## Setup Instructions

1. Clone the repository:

```bash
git clone <your-repo-url>
cd DashBoard-App
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

---

## Project Structure

- `src/components` – Contains all UI components like `TopBar`, `FilterPanel`, and view containers.
- `src/context/UserContext.tsx` – React Context for managing selected user.
- `src/mockData/MockData.tsx` – Static mock user data and their corresponding analytics records.
- `src/utils/filterData.tsx` – Filtering logic based on sector, category, and date.
- `src/tests/` – Contains all unit and integration tests using Jest and React Testing Library.

---

## Mock Data Structure Used

Each mock user in `MockData.tsx` contains analytics data structured like this:

```ts
{
  country: string;
  state: string;
  city: string;
  sector: "Retail" | "Food" | "Industrial";
  category: string;
  startDate: string;
  endDate: string;
  mySpend: { current: number; reference: number; absoluteChange: number; percentChange: number };
  sameStoreSpend: { ... };
  newStoreSpend: { ... };
  lostStoreSpend: { ... };
}
```

There are 5 users, and each has multiple entries covering various sectors, categories, and regions.

---

## Assumptions Made

- If no metrics are selected in the filter panel, all available spend metrics are shown by default.
- If no grouping attributes are selected, the table groups data by sector and category by default.
- Charts use only the first selected metric (if multiple are selected).
- The app supports filtering for the past 12 months only, as required.
- The filter panel controls both the Metrics and Analytics views.

---

## How to Test or Simulate User Switching and Filters

### User Switching

        On the top-right corner, you'll see an avatar and the current user's name.
        Click the "My Members" button.
        A modal will appear listing 5 mock users.
        Click on any user name to switch:
        The avatar and name in the top bar will update.
        Dashboard data (table and charts) will refresh based on the selected user's data.

### Filter Simulation

        Below the top bar, you'll see a set of filters:
        Sector and Category dropdowns
        Start Date and End Date pickers
        Group By multi-select (e.g., Country, State)
        Metrics multi-select (e.g., My Spend, New Store Spend)
        Try selecting different values:
        The data table and charts will update based on selected filters.
        Click the "Reset" button to clear all filters and reload the default view.
        Filters and user selections work independently and together to dynamically control

## Running Tests

Run all test cases:

```bash
npm test
```

Run tests for a specific file:

```bash
npx jest src/tests/TopBar.test.tsx
```

To see test coverage:

```bash
npm run test -- --coverage
```

---

## Technologies Used

- React 18 with Functional Components
- TypeScript
- Material UI v5
- Nivo Charts
- React Context API
- Jest and React Testing Library

## Test Coverage

This project includes unit tests written using Jest and React Testing Library.

The following key areas are tested:

- User switching logic and modal behavior in the TopBar component.
- Sector and Category filters, Group By and Metrics selection, and Reset button in the FilterPanel component.
- Rendering of all analytics charts in the AnalyticsView component when filters are applied.
- The MetricsTable component was tested for:
  - Displaying a message when no data is found.
  - Correct rendering of metric headers based on selected filters.
  - Clicking on headers to trigger sorting functionality.

All test cases have passed successfully.

### How to Run the Tests

To run all test suites:

```bash
npm test
```

To view test coverage:

````bash
npm run test -- --coverage
```............................................................................................................
 PASS  src/__test__/AnalyticsView.test.tsx
 PASS  src/__test__/MetricsTable.test.tsx
 PASS  src/__test__/TopBar.test.tsx
 PASS  src/__test__/FilterPanel.test.tsx
--------------------|---------|----------|---------|---------|----------------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|----------------------------
All files           |   76.22 |    81.48 |   71.42 |   76.27 |
 components         |   91.89 |    83.33 |      85 |   91.89 |
  FilterPanel.tsx   |    90.9 |    83.33 |   85.71 |    90.9 | 91,108
  TopBar.tsx        |   93.33 |      100 |   83.33 |   93.33 | 61
 components/view    |   66.66 |    80.95 |   63.63 |   66.66 |
  AnalyticsView.tsx |     100 |      100 |     100 |     100 |
  MetricsTable.tsx  |   65.33 |    80.95 |    62.5 |   65.27 | 73-107,161,193-211,266-269
 context            |     100 |      100 |   66.66 |     100 |
  UserContext.tsx   |     100 |      100 |   66.66 |     100 |
 mockData           |     100 |      100 |     100 |     100 |
  MockData.tsx      |     100 |      100 |     100 |     100 |
 type               |       0 |        0 |       0 |       0 |
  types.ts          |       0 |        0 |       0 |       0 |
--------------------|---------|----------|---------|---------|----------------------------

Test Suites: 4 passed, 4 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        3.576 s
Ran all test suites related to changed files.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.


This ensures core UI interactions and data rendering flows are covered by tests.


### Project Initialization
- Project created using:
```bash
npx create-react-app dashboard-app --template typescript
````

### Tab Structure in `App.tsx`

- Two tabs are implemented using MUI `Tabs`: **Metrics View** and **Analytics View**.
- Based on selected tab, either `MetricsView` or `AnalyticsView` component is rendered using `useState`.

---

## Metrics View

### TopBar

- Contains a button labeled **"My Members"**.
- On click, a modal opens showing a list of mock users.
- Selecting a user updates the dashboard data using Context API.
- Avatar and name of the current user are shown on the top-right.

### FilterPanel

- Includes dropdown filters for **Sector** and **Category**.
- Also includes:
  - Start Date and End Date pickers using `@mui/x-date-pickers`
  - Group By multi-select (e.g., Country, State)
  - Metrics multi-select (e.g., My Spend, Same Store Spend)
- A **Reset** button clears all filters and resets the view.
- Filters are shared across both views using props and context.

### MetricsTable

- Displays filtered data with support for:
  - Sorting
  - Pagination
  - Grouping based on selected attributes
- Metrics are broken into: current, reference, absolute change, percent change.
- Filtering logic is extracted into a utility function for reuse.

---

## Analytics View

- Charts are built using Nivo:
  1. Spend Over Time (Line Chart)
  2. Spend Per Category (Bar Chart)
  3. % Change vs Absolute Change Comparison (Grouped Bar)
  4. Performance by Category (Stacked Bar)
  5. Charts update based on filter selections.
  6. Displaying a message when no data is found.

---

## Challenges and Fixes

### Version Compatibility

- Faced issues with date pickers and nivo charts not working on React 19.
- Solution: downgraded to React 18 and installed compatible versions using:

```bash
npm install @mui/material@5.14.20 @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers@5.0.17 @date-io/date-fns@2 date-fns@2.30.0 --legacy-peer-deps
```

### Other Issues

- Build failed due to strict linting. Fixed all warnings.
- Ajv-related error due to peer dependencies in webpack dev server. Fixed with:

```bash
npm install ajv@6 ajv-keywords@3 --legacy-peer-deps
```

- Adjusted mock data to ensure correct working of date filters and charts.

### UI Improvements

- Adjusted spacing in FilterPanel using flex styling.
- Standardized user modal layout and avatar sizes.
- Highlighted the selected user with consistent button width.

---
