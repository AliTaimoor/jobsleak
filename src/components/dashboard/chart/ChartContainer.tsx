'use client'
import React from 'react'
import BarChart from './barchart/BarChart'
import LineChart from './linechart/LineChart'
import AreaChart from './area/AreaChart'
import PieChart from './pie/PieChart'
import ChartCard from './ChartCard'


const ChartContainer = () => {

    const charts = [
        {
            title: 'Sales',
            summary: 1000,
            children: <BarChart />
        },
        {
            title: 'Orders',
            summary: 2000,
            children: <LineChart />
        },
        {
            title: 'Revenue',
            summary: 3000,
            children: <AreaChart />
        },
        {
            title: 'Customers',
            summary: 4000,
            children: <PieChart />
        }
    ]
    return (
        <div className='chart-container grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2'>
            {charts.map((chart, index) => (
                <ChartCard key={index} title={chart.title} summary={chart.summary}>
                    {chart.children}
                </ChartCard>
            ))}
        </div>
    )
}

export default ChartContainer