
# Streamify Analytics Dashboard

A real-time analytics dashboard for a music streaming service, built with React, TypeScript, and Tailwind CSS.

## Overview

This dashboard provides management teams with insights into user activity, revenue streams, and content performance. It displays key metrics, interactive charts, and detailed streaming data in a responsive and user-friendly interface.

## Key Features

- **Real-time Metrics Display**
  - Total and active users
  - Stream counts and revenue
  - Top performing artists
  
- **Interactive Visualizations**
  - User growth trends
  - Revenue distribution by source
  - Top songs performance chart
  
- **Data Management**
  - Sortable data tables
  - CSV data export
  - Auto-refresh every 5 minutes
  - Manual data refresh option
  
- **Date Range Filtering**
  - Custom date selection
  - Immediate data updates

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run tests:

```bash
npm test
```

## Thought Process:
The given task expects to build a responsive dashboard. So choosing tailwind css for styling is a clear choice as it provides more control over the styling and the responsiveness of the dashboard. 
The entire project is broken into components for better readability and reusability. 
The metric cards was built using the lucide icons library.
The given requirement was to give chart interactions. So using recharts library was a good choice.
The table table demanded only two additional functionalities:
1. Sorting
2. Filtering by song name or artist name
So, it was a good decision to build a custom table component without using any existing library to save additional javascript code in bundle size and thus improving the performance of the dashboard.

## Performance Optimizations:
The current entire project is static solely based on Mock Data offline.
However, if we were working with real data and apis, the following optimizations can be done:
1. Pagination
2. Caching
3. Code Splitting
4. Tree Shaking
5. Lazy Loading
A dashboard can be built using existing libraries, however if we have to build some additional features that aren't available in the existing libraries, we would have used useMemo for caching the data and useCallback for memoizing the functions.
For heavy functions on client side, we could have used lodash.memoize to memoize the functions. And web workers could have been used to handle the heavy computations to offload the heavy computations from the main thread so that ui don't get blocked.

## Bonus Features:
1. Export to CSV
2. Auto refresh every 5 minutes
3. Manual refresh option
4. Date range picker


## MYSELF:
Himanshu Saini
hs913271@gmail.com



