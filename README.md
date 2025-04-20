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

    Filter Panel Added :
        - filters added like Sector and Categroy
            <!-- and attribute metrics - disabled for now cuz dont have clearity what to do with those filters  -->

    Data filter logic written

Table component Added
data rendered on table
filtered data rendered in table

<!-- datepicker is not working because of rect verion  need to downgrade version  -->

Filters are working as expected

<!-- ________________________________________________________________________________________________________________________________________ -->

installing nivo cahrts for analytics tab
again react 19 is not supporting nivo  
so downgrading react to 18
and installing nivo

Added one chart : Spend Over Time using ResponsiveLine of nivo charts

Deplyoing first version of porject on netlify
Build is failing due to some warnings and getting error :
The build failed with the following error:

"build.command" failed. Error message: Command failed with exit code 1: npm run build at line 107.
Additionally, there are TypeScript linting errors causing the build to treat warnings as errors due to the environment variable process.env.CI = true.

fixed issues related build deploying again


<!--  -->

Extra column Added in table - Date
and Reset Button is also added to reset all the filter values to get all data of user

<!--  -->

Added components for diffrent charts
1 - spend per category
2 - % Change vs Absolute Change Comparison
3 - Performance by Category (Stacked)

<!-- DateRange picker and Attribute and metrics filter remaining  -->


