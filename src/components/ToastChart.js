import React, { useRef } from "react";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { BarChart, ColumnChart } from "@toast-ui/react-chart";

export default function ToastChart() {
  const data = {
    categories: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    series: [
      {
        name: "Budget",
        data: [5000, 3000, 5000, 7000, 6000, 4000, 1000],
      },
      {
        name: "Income",
        data: [8000, 4000, 7000, 2000, 6000, 3000, 5000],
      },
      {
        name: "Expenses",
        data: [4000, 4000, 6000, 3000, 4000, 5000, 7000],
      },
      {
        name: "Debt",
        data: [3000, 4000, 3000, 1000, 2000, 4000, 3000],
      },
    ],
  };

  const MyWidth = (window.innerWidth * 80) / 100;

  const options = {
    chart: {
      width: MyWidth,
      height: 650,
      title: "Monthly Revenue",
    },
    yAxis: {
      title: "Amount",
    },
    xAxis: {
      title: "Month",
    },
  };
  /*   const options = {
    chart: { title: 'Monthly Revenue', width: 900, height: 400 },
  }; */

  const handleClick = () => {
    console.log("click!!");
  };

  const chartRef = useRef(null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ColumnChart
        ref={chartRef}
        data={data}
        options={options}
        onSelectLegend={handleClick}
      />
    </div>
  );
}
