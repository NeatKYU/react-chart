import React from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";

export default function Chart({ chartKind }) {
  const data = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 },
    { x: 10, y: 100 },
  ];

  const ChartValue = (chartKind) => {
    if (chartKind === "LineSeries") {
      return <LineSeries data={data} />;
    } else if (chartKind === "VerticalBarSeries") {
      return <VerticalBarSeries data={data} />;
    } else {
      <div>
        <h1>not exist chartKind</h1>
      </div>;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <XYPlot height={300} width={(document.body.offsetWidth * 80) / 100}>
        {ChartValue(chartKind)}
        {/* <VerticalGridLines /> */}
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );
}
