import React, { useEffect, useState } from "react"
import { Table, Switch } from "antd"
import axios from "axios"
import { Link } from "react-router-dom"
import "../styles/CryptoList.css"
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(LineElement, CategoryScale, LinearScale);

const API_KEY = 'CG-nRoPKdtpAXr9QRfWndv3n8d5';
const BASE_URL = 'https://api.coingecko.com/api/v3';

const CryptoList = () => {
    const [data, setData] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `${BASE_URL}/coins/markets`,
                    {
                        params: {
                            vs_currency: 'usd',
                            order: 'market_cap_desc',
                            per_page: 10,
                            page: 1,
                            sparkline: true,
                            x_cg_demo_api_key: API_KEY,
                        },
                    }
                );
                setData(result.data);
            } catch (error) {
                console.log("Error getting data:", error);
            }
        };

        fetchData();
    }, []);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const formatCurrency = (number) => {
        return `$${new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number)}`
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={`/crypto/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Current Price',
            dataIndex: 'current_price',
            key: 'current_price',
            render: text => formatCurrency(text),
        },
        {
            title: 'Market Cap',
            dataIndex: 'market_cap',
            key: 'market_cap',
            render: text => formatCurrency(text),
        },
        {
            title: '24h Change',
            dataIndex: 'price_change_percentage_24h',
            key: 'price_change_percentage_24h',
            render: text => `${text.toFixed(2)}%`,
        },
        {
            title: 'Price Trend (7d)',
            dataIndex: 'sparkline_in_7d',
            key: 'sparkline_in_7d',
            render: sparkline => {
                if (!sparkline || !sparkline.price) return null;
                const chartData = {
                    labels: sparkline.price.map((_, index) => index),
                    datasets: [
                        {
                            label: 'Price',
                            data: sparkline.price,
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                            pointRadius: 0,
                            tension: 0.4,
                        }
                    ],
                }
                const options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { display: false },
                        y: { display: false },
                    },
                    elements: {
                        line: { borderColor: 'rgba(75,192,192,1)' },
                    },
                };

                return (
                    <div style={{ width: '100px', height: '50px' }}>
                        <Line data={chartData} options={options} />
                    </div>
                )
            }
        }
    ];

    return (

        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <Switch checked={darkMode} onChange={handleThemeChange} checkedChildren="Dark" unCheckedChildren="Light" />
            <Table dataSource={data} columns={columns} rowKey="id" />
        </div>
    )
}


export default CryptoList;