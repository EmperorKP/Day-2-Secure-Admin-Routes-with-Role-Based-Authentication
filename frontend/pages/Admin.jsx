import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [content, setContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
        return;
      }

      try {
        const response = await axios.get("http://localhost:5008/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.role === 'admin') {
          console.log("it is admin");
          // console.log(response.data.content);
          setIsAdmin(true);
          setContent(response.data.content);
        } else {
          setIsAdmin(false);
          setErrorMessage("You do not have admin access. This page is confidential.");
        }
      } catch (error) {
        setErrorMessage(error.response?.data || "Failed to fetch dashboard data");
        window.location.href = "/";
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {!isAdmin ? (
        <div>
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
      ) : (
        <div>
          <p>{content}</p>
        </div>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Admin;
