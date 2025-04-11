import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5008/api/auth/register", {
        email,
        password,
        role
      });
      alert('Registration successful!');
      setEmail('');
      setPassword('');
      setRole('user');
    } catch (error) {
      setErrorMessage(error.response?.data || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5008/api/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", response.data.token);
      window.location.href = '/admin/dashboard';
    } catch (error) {
      setErrorMessage(error.response?.data || "Login failed");
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />

      {!isLogin && (
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button onClick={isLogin ? handleLogin : handleRegister}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p style={{ color: 'red' }}>{errorMessage}</p>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default Home;
