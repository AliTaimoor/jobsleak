"use client";
import React from "react";
import ChartCard from "./ChartCard";
import Past30DayUsage from "./linechart/LineChart";
import { Last12MonthsUsageResult, Last30DaysUsageResult } from "@/lib/types";
import Past12MonthsUsage from "./barchart/BarChart";

interface UserChartsProps {
  last30Days: Last30DaysUsageResult[],
  last12Months: Last12MonthsUsageResult[]
}

const UserChartContainer = ({last30Days, last12Months}: UserChartsProps) => {

  const charts = [
    {
      title: "Past 30-day usage",
      summary: last30Days.reduce((p, a) => p + a._count, 0).toLocaleString(),
      children: <Past30DayUsage usage={last30Days.map(l => l._count)} dates={last30Days.map(l => l.date)} />,
    },
    {
      title: "Past 12 Month usage",
      summary: last12Months.reduce((p, a) => p + a._count, 0).toLocaleString(),
      children: <Past12MonthsUsage usage={last12Months.map(l => Number(l._count))} dates={last12Months.map(l => l.month)} />,
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
