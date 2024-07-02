'use client'
import React from 'react'
import Chart from 'react-apexcharts'

const BarChart = () => {
    const state = {
        options: {
            colors: ['#5C37EB', '#705AF8', '#5C37EB'],
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [{
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        }]
    }

    return (
        <Chart options={state.options} series={state.series} type="bar" height={320} />
    )
}

export default BarChart