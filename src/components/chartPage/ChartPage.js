import React, { useState } from "react";
import Chart from "../Chart";
import Header from "../Header";
import DatePicker, { registerLocale } from "react-datepicker";

export default function ChartPage() {
  const [chartValue, setChartValue] = useState("LineSeries");
  const [startDate, setStartDate] = useState(new Date());

  const ChangeChart = (chartKind) => {
    setChartValue(chartKind);
  };

  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Chart Page</h1>
      <Chart chartKind={chartValue}></Chart>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="ui button">일</button>
        <button className="ui button">1주일</button>
        <button className="ui button">1개월</button>
        <button className="ui button">3개월</button>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<ExampleCustomInput />}
        />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="ui button" onClick={() => ChangeChart("LineSeries")}>
          Line Chart
        </button>
        <button
          className="ui button"
          onClick={() => ChangeChart("VerticalBarSeries")}
        >
          Bar Chart
        </button>
        <button className="ui button" onClick={() => ChangeChart("AreaSeries")}>
          Area Chart
        </button>
      </div>
    </div>
  );
}
