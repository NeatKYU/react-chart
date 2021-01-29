import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./Home";
import ChartPage from "./chartPage/ChartPage";
import ToastChartPage from "./chartPage/ToastChartPage";

function App() {
  return (
    <>
      <div className="App">
        <Switch>
          <Route component={HomePage} exact path="/"></Route>
          <Route component={ChartPage} exact path="/chart"></Route>
          <Route component={ToastChartPage} exact path="/tchart"></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
