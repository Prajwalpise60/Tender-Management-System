import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../common.css'; // ✅ make sure this import is correct

const generateCaptcha = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};

const LoginForm = () => {
  const [captcha, setCaptcha] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (captcha !== inputCaptcha.toUpperCase()) {
      alert('Invalid Captcha');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', form);
      if (res.data.success) {
        alert('Login successful');
        navigate('/tender');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <div>
          <strong>Captcha: {captcha}</strong>{' '}
          <button type="button" onClick={() => setCaptcha(generateCaptcha())}>⟳</button>
        </div>
        <input placeholder="Enter Captcha" value={inputCaptcha} onChange={e => setInputCaptcha(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
