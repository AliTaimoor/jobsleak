import React from 'react'
import Chart from 'react-apexcharts'
const AreaChart = () => {
    const state = {

        series: [{
            name: "STOCK ABC",
            data: [100, 200, 350, 400, 500, 500, 400, 350, 200, 100]
        }],
        options: {
            colors: ['#5C37EB', '#705AF8', '#5C37EB'],
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },

            title: {
                text: 'Fundamental Analysis of Stocks',
                align: 'left'
            },
            subtitle: {
                text: 'Price Movements',
                align: 'left'
            },
            labels: ['2020-09-19', '2020-09-20', '2020-09-21', '2020-09-22', '2020-09-23', '2020-09-24', '2020-09-25', '2020-09-26', '2020-09-27', '2020-09-28'],
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            }
        },
    };
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Chart options={state.options} series={state.series} type="area" height={320} />

    )

}

export default AreaChart