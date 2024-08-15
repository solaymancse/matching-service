import { Button, Space, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import ServiceModal from './ServiceModal';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [editService, setEditService] = useState(null);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/services');
            setServices(response.data.data); // Assuming response.data.data is an array
        } catch (error) {
            message.error('Failed to load services.');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (service) => {
        setEditService(service);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/service/${id}`);
            message.success('Service deleted successfully!');
            fetchServices(); // Refresh the service list
        } catch (error) {
            message.error('Failed to delete service.');
            console.error('Error:', error);
        }
    };

    const columns = [
        {
            title: 'ServiceName',
            dataIndex: 'service_name',
            key: 'service_name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <CiEdit onClick={() => handleEdit(record)} style={{ cursor: 'pointer' }} />
                    <IoMdTrash onClick={() => handleDelete(record.id)} style={{ cursor: 'pointer', color: 'red' }} />
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className='bg-white p-4 w-full items-end'>
                <Button onClick={showModal} className='btn bg-sky-600 w-[100px] h-[48px] rounded-md text-white'>New Service</Button>
            </div>
            <ServiceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editService={editService}
                setEditService={setEditService}
                fetchServices={fetchServices}
            />
            <Table columns={columns} dataSource={services} rowKey="id" />
        </>
    );
};

export default Services;
