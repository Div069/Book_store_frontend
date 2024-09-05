import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css';  // Adding a CSS file for better styling

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://book-store-backend-2gzw.onrender.com/auth/users'); // Replace with your API URL
        setUsers(response.data.users); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-list-container">
      <h1>All MEMBERS</h1>
      <div className="users-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
