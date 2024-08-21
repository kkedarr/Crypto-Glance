import React, { useEffect, useState } from "react"
import { Table, Button } from "antd"
import axios from "axios"
import "../styles/CryptoList.css"
import "../styles/generalmediaqueries.css"
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

ChartJS.register(LineElement, CategoryScale, LinearScale);

const API_KEY = 'CG-nRoPKdtpAXr9QRfWndv3n8d5';
const BASE_URL = 'https://api.coingecko.com/api/v3';

const CryptoList = () => {
    const [data, setData] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (loading) return; // Prevent multiple fetch calls
            setLoading(true);
            try {
                const result = await axios.get(
                    `${BASE_URL}/coins/markets`,
                    {
                        params: {
                            vs_currency: 'usd',
                            order: 'market_cap_desc',
                            per_page: 50,
                            page: page,
                            sparkline: true,
                            x_cg_demo_api_key: API_KEY,
                        },
                    }
                );
                setData(prevData => [...prevData, ...result.data]);
            } catch (error) {
                console.log("Error getting data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    // Function to handle scroll
    const handleScroll = () => {
        const tableElement = document.getElementById("cryptoTable");
        if (tableElement.scrollTop + tableElement.clientHeight >= tableElement.scrollHeight - 5) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        const tableElement = document.getElementById("cryptoTable");
        tableElement.addEventListener("scroll", handleScroll);

        return () => {
            tableElement.removeEventListener("scroll", handleScroll); // Clean up listener
        };
    }, []);

    const formatCurrency = (number) => {
        return `$${new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number)}`
    };

    const handleFavorite = (coin) => {
        const updatedFavorites = favorites.some(fav => fav.id === coin.id)
            ? favorites.filter(fav => fav.id !== coin.id) : [...favorites, coin];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    const columns = [
        {
            title: 'Coin',
            dataIndex: 'symbol',
            key: 'symbol',
            render: symbol => <span>{symbol.toUpperCase()}</span>,
        },
        {
            title: 'Price',
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
            title: '24 hour Change',
            dataIndex: 'price_change_percentage_24h',
            key: 'price_change_percentage_24h',
            render: text => `${text.toFixed(2)}%`,
        },
        {
            title: 'Last 7 days Trend',
            dataIndex: 'sparkline_in_7d',
            key: 'sparkline_in_7d',
            render: sparkline => {
                if (!sparkline || !sparkline.price) return null;

                const lineColor = data.find(record => record.id === sparkline.id)?.price_change_percentage_24h > 0 ? 'red' : 'green';

                const chartData = {
                    labels: sparkline.price.map((_, index) => index),
                    datasets: [
                        {
                            label: 'Price',
                            data: sparkline.price,
                            fill: false,
                            backgroundColor: lineColor,
                            borderColor: lineColor,
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
                        line: { borderColor: lineColor },
                    },
                };

                return (
                    <div style={{ width: '100px', height: '50px' }}>
                        <Line data={chartData} options={options} />
                    </div>
                )
            }
        },
        {
            title: 'Favorite',
            key: 'action',
            render: (text, record) => {
                const isFavorite = favorites.some(fav => fav.id === record.id);
                return (
                    <Button onClick={() => handleFavorite(record)}
                        icon={isFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                    />
                )
            }
        }
    ];

    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <div id="cryptoTable" style={{ overflowY: 'auto', maxHeight: '80vh' }}> {/* Add overflow and max height for scrolling */}
                <Table dataSource={data} columns={columns} rowKey="id" pagination={false} /> {/* Disable pagination */}
            </div>
        </div>
    )
}

export default CryptoList;
