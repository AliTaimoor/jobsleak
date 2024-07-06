"use client";
import React from "react";
import Chart from "react-apexcharts";

interface ChartProps {
  usage: number[];
  dates: Date[];
}

const Past12MonthsUsage = ({ usage, dates }: ChartProps) => {
  const state = {
    options: {
      colors: ["#5C37EB", "#705AF8", "#5C37EB"],
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: dates.map((d) => `${d.getMonth() + 1}/${d.getFullYear()}`),
      },
    },
    series: [
      {
        name: "Monthly Usage",
        data: usage,
      },
    ],
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      height={320}
    />
  );
};

export default Past12MonthsUsage;
