import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  // Fetch the users when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");  // Get token from localStorage
  
        if (!token) {
          console.error("No token found, user is not authenticated");
          return;
        }
  
        const response = await axios.get('https://book-store-backend-2gzw.onrender.com/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in Authorization header
          },
        });

        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <>
      {/* Background container */}
      <div className="background-container"></div>

      <div className="users-list-container">
        <h1 className="users-heading">All Members</h1>
        <div className="users-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersList;
