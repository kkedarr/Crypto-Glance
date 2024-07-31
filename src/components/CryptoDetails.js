import React, { useEffect, useState } from "react"
import { Card } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import CryptoChart from "./CryptoChart";

const API_KEY = 'CG-nRoPKdtpAXr9QRfWndv3n8d5';
const BASE_URL = 'https://api.coingecko.com/api/v3';

const CryptoDetails = () => {
    const { id } = useParams();
    const [crypto, setCrypto] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${BASE_URL}/coins/${id}`, {
                params: {
                    x_cg_demo_api_key: API_KEY,
                },
            });
            setCrypto(result.data);
        };

        fetchData();
    }, [id]);

    if (!crypto) return null;


    return (
        <Card title={crypto.name}>
            <p>Symbol: {crypto.symbol.toUpperCase()}</p>
            <p>Current Price: ${crypto.market_data.current_price.usd}</p>
            <p>Market Cap: ${crypto.market_data.market_cap.usd}</p>
            <p>Change: {crypto.market_data.price_change_percentage_24h}%</p>
            <p>Rank: {crypto.market_cap_rank}</p>
            <a href={crypto.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                Official Website
            </a>
            < CryptoChart coinId={id} />
        </Card>
    );
};

export default CryptoDetails;