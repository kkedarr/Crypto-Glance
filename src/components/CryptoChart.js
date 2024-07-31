import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import axios from "axios"


const BASE_URL = 'https://api.coingecko.com/api/v3';


const CryptoChart = ({ coinId }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchChartData = async () => {
            const result = await axios.get(`${BASE_URL}/coins/id/market_chart`,
                {
                    params: {
                        vs_currency: 'usd',
                        days: '7',
                        x_cd_demo_api_key: 'CG-nRoPKdtpAXr9QRfWndv3n8d5'
                    },
                }
            );

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
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            });
        };

        fetchChartData();
    }, [coinId]);

    return (
        <div>
            <h2>Price Chart (Last 7 days)</h2>
            <Line data={chartData} />
        </div>
    )
}

export default CryptoChart;