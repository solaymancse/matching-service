import { Input, message, Modal } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';

const UserCreate = ({ isModalOpen, setIsModalOpen, editUser, setEditUser, fetchUsers }) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (editUser) {
            setUserName(editUser.name); // Adjusted to match your user data structure
        } else {
            setUserName(''); // Clear input when creating a new user
        }
    }, [editUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editUser) {
                // Update existing user
                await axios.put(`http://127.0.0.1:8000/api/users/${editUser.id}`, { name: userName });
                message.success('User updated successfully!');
            } else {
                // Create new user
                await axios.post('http://127.0.0.1:8000/api/users', { name: userName });
                message.success('User created successfully!');
            }
            setIsModalOpen(false);
            setEditUser(null); // Clear the edit state
            fetchUsers(); // Refresh the user list
        } catch (error) {
            message.error('Failed to save user.');
            console.error('Error:', error);
        }
    };

    return (
        <Modal
            footer={null}
            title={editUser ? "Edit User" : "Create New User"}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
        >
            <form onSubmit={handleSubmit}>
                <Input
                    name='name'
                    placeholder='User Name'
                    size='large'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button
                    className='btn bg-sky-600 w-[100px] h-[48px] rounded-md text-white mt-4'
                    type='submit'
                >
                    {editUser ? "Update" : "Create"}
                </button>
            </form>
        </Modal>
    );
};

UserCreate.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    editUser: PropTypes.object,
    setEditUser: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
};

export default UserCreate;
