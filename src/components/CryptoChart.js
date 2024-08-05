import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const BASE_URL = 'https://api.coingecko.com/api/v3';

const CryptoChart = ({ coinId }) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const result = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
                    params: {
                        vs_currency: 'usd',
                        days: '7'
                    },
                });

                const prices = result.data.prices.map(price => ({
                    time: new Date(price[0]).toLocaleString(),
                    value: price[1]
                }));

                setChartData({
                    labels: prices.map(price => price.time),
                    datasets: [
                        {
                            label: 'Price in USD',
                            data: prices.map(price => price.value),
                            borderColor: 'rgba(60, 154, 154, 1)',
                            backgroundColor: 'rgba(60, 154, 154, 0.2)',
                        },
                    ],
                });
            } catch (err) {
                setError(err.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();

        // Cleanup function to prevent chart reuse issues
        return () => {
            if (window.Chart) {
                window.Chart.instances.forEach(instance => instance.destroy());
            }
        };
    }, [coinId]);

    if (loading) {
        return <div>Loading chart data...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    return (
        <div>
            <h2>Price Chart (Last 7 days)</h2>
            {chartData.labels && chartData.labels.length > 0 ? (
                <Line data={chartData} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => `Price: $${tooltipItem.raw.toFixed(2)}`
                            }
                        }
                    }
                }} />
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
}

export default CryptoChart;
