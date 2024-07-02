"use client";
import React from "react";
import BarChart from "./barchart/BarChart";
import LineChart from "./linechart/LineChart";
import AreaChart from "./area/AreaChart";
import PieChart from "./pie/PieChart";
import ChartCard from "./ChartCard";

const UserChartContainer = () => {
  const charts = [
    {
      title: "Past 30-day usage",
      summary: "+ 17%",
      children: <LineChart />,
    },
    {
      title: "Monthly usage",
      summary: "135,672",
      children: <BarChart />,
    },
  ];
  return (
    <div className="chart-container grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
      {charts.map((chart, index) => (
        <ChartCard key={index} title={chart.title} summary={chart.summary}>
          {chart.children}
        </ChartCard>
      ))}
    </div>
  );
};

export default UserChartContainer;
