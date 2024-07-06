"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  usage: number[];
  dates: Date[];
}

const Past30DayUsage = ({ usage, dates }: ChartProps) => {
  const chartType = {
    height: 350,
    type: "line",
  } as const;

  const state = {
    series: [
      {
        name: "API Usage",
        data: usage,
      },
    ],
    options: {
      colors: ["#5C37EB", "#705AF8", "#5C37EB"],
      chart: chartType,
      stroke: {
        width: 5,
        curve: "smooth",
      } as const,
      xaxis: {
        type: "datetime",
        categories: dates.map(d => d.toDateString()),
        tickAmount: dates.length,
        labels: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          formatter: function (value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), "dd MMM");
          },
        },
      },
      title: {
        text: "API invocations",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      // fill: {
      //     type: 'gradient',
      //     gradient: {
      //         shade: 'dark',
      //         gradientToColors: ['#FDD835'],
      //         shadeIntensity: 1,
      //         type: 'horizontal',
      //         opacityFrom: 1,
      //         opacityTo: 1,
      //         stops: [0, 100, 100, 100]
      //     },
      // },
      yaxis: {
        min: 0,
        max: Math.max(...usage),
      },
    },
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ReactApexChart
      options={state.options}
      series={state.series}
      height={320}
    />
  );
};
export default Past30DayUsage;
