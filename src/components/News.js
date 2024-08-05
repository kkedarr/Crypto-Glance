import React, { useEffect, useState } from "react";
import { Card, List, Avatar } from 'antd';
import axios from 'axios';
import "../styles/News.css";

const { Meta } = Card;

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {
        const apiKey = 'pub_498204a37e7e80d2f42859342dc4137e8bd06';
        const country = 'us';
        const category = 'technology';
        const language = 'en';
        const query = 'crypto';

        axios.get('https://newsdata.io/api/1/news', {
            params: {
                apikey: apiKey,
                country: country,
                category: category,
                language: language,
                q: query,
            }
        })
            .then(response => {
                const filteredArticles = response.data.results.filter(article => article.image_url);
                setArticles(filteredArticles);
                setLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 style={{ color: '0a89ff' }} className="newsTitle">Latest News</h2>
            <List
                size="large"
                grid={{ gutter: 16, column: 1 }}
                dataSource={articles}
                renderItem={item => (
                    <List.Item key={item.link}>
                        <Card className={darkMode ? 'news-card-dark' : 'news-card-light'}
                            cover={
                                item.image_url ? (
                                    <img
                                        alt={item.title}
                                        src={item.image_url}
                                        className="news-image"
                                    />
                                ) : null}
                        >
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                title={item.title}
                                description={item.description}
                            />
                            <a style={{ marginLeft: '47.5px' }} href={item.link} target="_blank" rel="noopener noreferrer" className="read-more">
                                Read more
                            </a>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default News;
