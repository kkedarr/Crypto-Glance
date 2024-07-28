import React, { useEffect, useState } from "react"
import { Table, Switch } from "antd"
import axios from "axios"
import { Link } from "react-router-dom"
import "../styles/CryptoList.css"


const API_KEY = 'CG-nRoPKdtpAXr9QRfWndv3n8d5';
const BASE_URL = 'https://api.coingecko.com/api/v3';

const CryptoList = () => {
    const [data, setData] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `${BASE_URL}/coins/markets`,
                {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 10,
                        page: 1,
                        sparkline: false,
                        x_cg_demo_api_key: API_KEY,
                    },
                }
            );
            setData(result.data);
        };

        fetchData();
    }, []);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
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
            render: text => `$${text}`,
        },
        {
            title: 'Market Cap',
            dataIndex: 'market_cap',
            key: 'market_cap',
            render: text => `$${text.toLocaleString()}`,
        },
        {
            title: '24h Change',
            dataIndex: 'price_change_percentage_24h',
            key: 'price_change_percentage_24h',
            render: text => `${text.toFixed(2)}%`,
        },
    ];

    return (

        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <Switch checked={darkMode} onChange={handleThemeChange} checkedChildren="Dark" unCheckedChildren="Light" />
            <Table dataSource={data} columns={columns} rowKey="id" />
        </div>
    )
}


export default CryptoList;