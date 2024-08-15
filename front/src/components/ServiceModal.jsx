import { Input, message, Modal } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ServiceModal = ({ isModalOpen, setIsModalOpen, editService, setEditService, fetchServices }) => {
    const [serviceName, setServiceName] = useState('');

    useEffect(() => {
        if (editService) {
            setServiceName(editService.service_name);
        }
    }, [editService]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editService) {
                // Update existing service
                await axios.put(`http://127.0.0.1:8000/api/service/${editService.id}`, { service_name: serviceName });
                message.success('Service updated successfully!');
            } else {
                // Create new service
                await axios.post('http://127.0.0.1:8000/api/service', { service_name: serviceName });
                message.success('Service created successfully!');
            }
            setIsModalOpen(false);
            setEditService(null); // Clear the edit state
            fetchServices(); // Refresh the service list
        } catch (error) {
            message.error('Failed to save service.');
            console.error('Error:', error);
        }
    };

    return (
        <Modal footer={null} title={editService ? "Edit Service" : "Create New Service"} open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
            <form onSubmit={handleSubmit}>
                <Input
                    name='service_name'
                    placeholder='Service Name'
                    size='large'
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                />
                <button className='btn bg-sky-600 w-[100px] h-[48px] rounded-md text-white mt-4' type='submit'>
                    {editService ? "Update" : "Create"}
                </button>
            </form>
        </Modal>
    );
};

ServiceModal.propTypes = {
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.bool,
    editService: PropTypes.object,
    setEditService: PropTypes.func.isRequired,
    fetchServices: PropTypes.func.isRequired,
};

export default ServiceModal;
