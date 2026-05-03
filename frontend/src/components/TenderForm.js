import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TenderForm.css'; // ✅ CSS import

const TenderForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: '', fullName: '', address: '', city: '', district: '', state: '', pincode: '',
    mobile: '', email: '', license: 'NO', gst: 'NO', goodsType: '', goodsDemand: '',
    saleRate: '', remarks: ''
  });

  const [files, setFiles] = useState({
    photo: null, aadhar: null, pan: null, gstCert: null, licenseCert: null
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = e => setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    Object.keys(files).forEach(k => {
      if (files[k]) data.append(k, files[k]);
    });

    try {
      await axios.post('http://localhost:3000/api/tender/submit', data);
      alert('Tender submitted successfully');
      navigate('/report');
    } catch (err) {
      console.error(err);
      alert('Error submitting form');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Tender</h2>
      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
        <select name="type" onChange={handleChange} required>
          <option value="">Select Type</option>
          <option>Broker</option>
          <option>Purchaser</option>
          <option>Wholesaler</option>
        </select>

        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="district" placeholder="District" onChange={handleChange} required />
        <input name="state" placeholder="State" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" pattern="\d{10}" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />

        <div className="radio-group">
          License:
          <input type="radio" name="license" value="YES" onChange={handleChange} /> Yes
          <input type="radio" name="license" value="NO" onChange={handleChange} defaultChecked /> No
        </div>

        <div className="radio-group">
          GST:
          <input type="radio" name="gst" value="YES" onChange={handleChange} /> Yes
          <input type="radio" name="gst" value="NO" onChange={handleChange} defaultChecked /> No
        </div>

        <select name="goodsType" onChange={handleChange} required>
          <option value="">Select Goods</option>
          <option>Ash</option>
          <option>Ethanaol</option>
          <option>Fusel Oil</option>
          <option>Pressmud</option>
          <option>Sugar</option>
        </select>

        <input name="goodsDemand" placeholder="Demand (e.g. 1000 Ton)" onChange={handleChange} required />
        <input name="saleRate" placeholder="Rate per unit (e.g. 3800)" onChange={handleChange} required />
        <textarea name="remarks" placeholder="Remarks" onChange={handleChange}></textarea>

        <div className="file-group">
          <label>Photo:</label><input type="file" name="photo" accept=".jpg,.jpeg,.png" onChange={handleFile} required />
          <label>Aadhar:</label><input type="file" name="aadhar" onChange={handleFile} required />
          <label>PAN:</label><input type="file" name="pan" onChange={handleFile} required />
          <label>GST Cert:</label><input type="file" name="gstCert" onChange={handleFile} required />
          <label>License Cert:</label><input type="file" name="licenseCert" onChange={handleFile} required />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TenderForm;
