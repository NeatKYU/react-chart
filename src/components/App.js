import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./Home";
import ChartPage from "./chartPage/ChartPage";
import ToastChartPage from "./chartPage/ToastChartPage";
import { ChartProvider } from "../contextAPI/ChartContext";
import { CompanyProvider } from "../contextAPI/CompanyInfoContext";

function App() {
  return (
    <CompanyProvider>
      <ChartProvider>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/chart" component={ChartPage}></Route>
            <Route path="/toast" component={ToastChartPage}></Route>
          </Switch>
        </div>
      </ChartProvider>
    </CompanyProvider>
  );
}

export default App;
