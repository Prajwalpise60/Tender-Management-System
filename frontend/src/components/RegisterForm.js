import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../common.css'; // make sure this path is correct

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '',
    mobile: '', email: '', password: '', confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/auth/register', form);
      alert('Registration Successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <input name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input name="middleName" placeholder="Middle Name" onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile" onChange={handleChange} required pattern="\d{10}" />
          <input name="email" placeholder="Email" onChange={handleChange} required type="email" />
          <input name="password" placeholder="Password" onChange={handleChange} type="password" required />
          <input name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} type="password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
