import React from "react";
import Chart from "../Chart";
import Header from "../Header";

export default function ChartPage() {
  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Chart Page</h1>
      <Chart chartKind="LineSeries"></Chart>
    </div>
  );
}
