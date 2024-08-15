import { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography } from 'antd';

const ServiceMatchResult = () => {
    const [matchResults, setMatchResults] = useState([]);

    useEffect(() => {
        // Fetch matching services
        axios.get('http://127.0.0.1:8000/api/matching-services')
            .then(response => {
                console.log('Matched Services:', response.data); // Log the data
                setMatchResults(response.data);
            })
            .catch(error => console.error('Error fetching matching services:', error));
    }, []);

    return (
        <div>
            <Typography.Title level={4}>Match Results</Typography.Title>
            <List
                bordered
                dataSource={matchResults}
                renderItem={item => (
                    <List.Item>
                        {item ? `True for ${item}` : 'No Match'}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ServiceMatchResult;
