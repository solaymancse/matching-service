import { Button, Space, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import { IoMdTrash } from 'react-icons/io';
import UserCreate from './UserCreate';

const User = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]); // Renamed to 'users' for clarity
    const [editUser, setEditUser] = useState(null); // Renamed to 'editUser' for clarity

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users');
            setUsers(response.data); // Assuming response.data.data is an array
        } catch (error) {
            message.error('Failed to load users.');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setIsModalOpen(true);
    };

    console.log(users)
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${id}`); // Updated endpoint
            message.success('User deleted successfully!');
            fetchUsers(); // Refresh the user list
        } catch (error) {
            message.error('Failed to delete user.');
            console.error('Error:', error);
        }
    };

    const columns = [
        {
            title: 'User Name', // Updated column title
            dataIndex: 'name', // Adjusted dataIndex for example
            key: 'name',
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
                <Button onClick={showModal} className='btn bg-sky-600 w-[100px] h-[48px] rounded-md text-white'>New User</Button>
            </div>
            <UserCreate
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editUser={editUser} // Updated prop
                setEditUser={setEditUser} // Updated prop
                fetchUsers={fetchUsers}
            />
            <Table columns={columns} dataSource={users} rowKey="id" /> {/* Updated dataSource */}
        </>
    );
};

export default User;
