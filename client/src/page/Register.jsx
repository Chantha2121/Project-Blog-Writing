import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function Register() {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navegate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("auth/register", input); 
      navegate("/login");
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError("Error in sending request");
      }
    }
  };

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Username'
          name='username'
          value={input.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='Email'
          name='email'
          value={input.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Password'
          name='password'
          value={input.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <span className='text'>
          Do you have an account? <a href='/login'> Login</a>
        </span>
      </form>
    </div>
  );
}

export default Register;
