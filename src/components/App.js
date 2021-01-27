import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./Home";
import ChartPage from "./chartPage/ChartPage";

function App() {
  return (
    <>
      <div className="App">
        <Switch>
          <Route component={HomePage} exact path="/"></Route>
          <Route component={ChartPage} exact path="/chart"></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
