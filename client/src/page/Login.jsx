import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {
  const [input, setInput] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      await login(input)
      navigate("/");
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Username'
          name='username'
          value={input.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder='Password'
          name='password'
          value={input.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <span className='text'>
          Don't have an account? <a href='/register'>Register</a>
        </span>
      </form>
    </div>
  );
}

export default Login;
