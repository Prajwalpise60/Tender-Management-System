import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReportPage.css'; 

const ReportPage = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3000/api/tender/report');
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete?')) return;
    await axios.delete(`http://localhost:3000/api/tender/delete/${id}`);
    fetchData();
  };

  const handleExport = async () => {
    const res = await axios.get('http://localhost:3000/api/tender/export', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tender_report.xlsx');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="report-wrapper">
      <div className="report-box">
        <h2 className="report-title">Tender Report</h2>
        <button className="export-btn" onClick={handleExport}>Export to Excel</button>
        <table className="report-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Goods</th>
              <th>Demand</th>
              <th>Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.fullName}</td>
                <td>{row.mobile}</td>
                <td>{row.email}</td>
                <td>{row.goodsType}</td>
                <td>{row.goodsDemand}</td>
                <td>{row.saleRate}</td>
                <td>
                  <button className="edit-btn" onClick={() => alert('Edit not implemented')}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPage;
