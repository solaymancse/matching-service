// src/components/ServiceStatus.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography, Divider } from 'antd';
import ServiceMatchResult from './ServiceMatchResult';

const { Title } = Typography;

const ServiceStatus = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [unselectedServices, setUnselectedServices] = useState([]);

    useEffect(() => {
        // Fetch selected services
        axios.get('http://127.0.0.1:8000/api/selected-services')
            .then(response => setSelectedServices(response.data || []))
            .catch(error => console.error('Error fetching selected services:', error));

        // Fetch unselected services
        axios.get('http://127.0.0.1:8000/api/unselected-services')
            .then(response => setUnselectedServices(response.data || []))
            .catch(error => console.error('Error fetching unselected services:', error));
    }, []);

    return (
        <div>
            <Title level={3}>Service Status</Title>

            <Title level={4}>Selected Services</Title>
            <List
                bordered
                dataSource={selectedServices}
                renderItem={item => (
                    <List.Item>{`${item.user.name} - ${item.service.service_name}`}</List.Item>
                )}
            />

            <Divider />

            <Title level={4}>Unselected Services</Title>
            <List
                bordered
                dataSource={unselectedServices}
                renderItem={item => (
                    <List.Item>{`${item.user.name} - ${item.service.service_name}`}</List.Item>
                )}
            />

            <div className='mt-8'>
                <ServiceMatchResult />
            </div>
        </div>
    );
};

export default ServiceStatus;
