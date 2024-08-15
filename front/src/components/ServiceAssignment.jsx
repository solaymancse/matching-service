import { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Button, Form } from 'antd';

const { Option } = Select;

const ServiceAssignment = () => {
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
    const [form] = Form.useForm(); // Create a Form instance

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/services')
            .then(response => setServices(response?.data?.data || []));

        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => setUsers(response.data || []));

        axios.get('http://127.0.0.1:8000/api/user-services')
            .then(response => {
                const userServicesData = response.data;
                const selected = userServicesData.filter(us => us.selected).map(us => ({
                    name: us.user.name,
                    service: us.service.service_name
                }));
                const unselected = userServicesData.filter(us => !us.selected).map(us => ({
                    name: us.user.name,
                    service: us.service.service_name
                }));
            });
    }, []);

    const handleAssignService = (values) => {
        axios.post('http://127.0.0.1:8000/api/user-services', {
            user_id: values.user_id,
            service_id: values.service_id,
            selected: values.selected
        }).then(() => {
            axios.get('http://127.0.0.1:8000/api/user-services')
                .then(response => {
                    const userServicesData = response.data;
                    const selected = userServicesData.filter(us => us.selected).map(us => ({
                        name: us.user.name,
                        service: us.service.service_name
                    }));
                    const unselected = userServicesData.filter(us => !us.selected).map(us => ({
                        name: us.user.name,
                        service: us.service.service_name
                    }));
                    form.resetFields(); // Reset the form after submission
                });
        });
    };

    return (
        <div>
            <Form form={form} onFinish={handleAssignService} layout="vertical">
                <Form.Item name="user_id" label="Select User" rules={[{ required: true, message: 'Please select a user!' }]}>
                    <Select placeholder="Select a user">
                        {users.map(user => (
                            <Option key={user.id} value={user.id}>{user.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="service_id" label="Select Service" rules={[{ required: true, message: 'Please select a service!' }]}>
                    <Select placeholder="Select a service">
                        {services.map(service => (
                            <Option key={service.id} value={service.id}>{service.service_name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="selected" label="Assign" rules={[{ required: true, message: 'Please select an option!' }]}>
                    <Select placeholder="Select">
                        <Option value={true}>Selected</Option>
                        <Option value={false}>Unselected</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Assign Service</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ServiceAssignment;
