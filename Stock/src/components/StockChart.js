
import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const StockChart = ({ stockItems = [] }) => {
    useEffect(() => {
        return () => {
            Chart.getChart('your-chart-id')?.destroy(); // Destroy chart instance on unmount
        };
    }, []);

    if (!Array.isArray(stockItems) || stockItems.length === 0) {
        return <div>No stock data available</div>; // Handle empty state
    }

    const data = {
        labels: stockItems.map(item => item.name),
        datasets: [
            {
                label: 'Stock Quantity',
                data: stockItems.map(item => item.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={data} />;
};

export default StockChart;



