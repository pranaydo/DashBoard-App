DashBoard App

React Project created with typescript - command
npx create-react-app dashboard-app --template typescript

In App.tsx file two tabs are imported and called from mui
using state on change of tabs rendering respective Compoenet

For Metrics View :
Created Component MetricsView.tsx
implemented TopBar Component and called in MetricsView.tsx

    TopBar :
        on button click showing the mocked users list in Modal
        and on selecting a  User getting all the data of that perticular user
        // will use context api for state managhement
