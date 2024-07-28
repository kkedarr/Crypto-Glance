import React, { useEffect, useState } from "react";
import { Card, List } from 'antd';
import axios from 'axios';


const News = () => {
    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            const result = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR', {
                params: {
                    q: 'cryptocurrency',
                    apiKey: 'c105d433126c955fd6e69ff303ecdbd63573cb977d06d07aeb7d9fd1bae8a1d5',
                },
            });
            setNews(result.data.articles);
        };

        fetchNews();
    }, []);

    return (
        <div>
            <h2>Crypto News</h2>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={news}
                renderItem={item => (
                    <List.Item key={item.url}>
                        <Card title={item.title}>
                            <p>{item.description}</p>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                Read more
                            </a>
                        </Card>
                    </List.Item>
                )}>

            </List>
        </div>
    )
}

export default News;