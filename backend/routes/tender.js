const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const db = require('../db');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/submit', upload.fields([
  { name: 'photo' }, { name: 'aadhar' }, { name: 'pan' },
  { name: 'gstCert' }, { name: 'licenseCert' }
]), async (req, res) => {
  const f = req.body;
  try {
    const conn = await db();
    await conn.execute(`
      INSERT INTO tender_form (type, full_name, address, city, district, state, pincode, mobile, email,
      license, gst, goods_type, goods_demand, sale_rate, remarks)
      VALUES (:type, :fullName, :address, :city, :district, :state, :pincode, :mobile, :email, 
      :license, :gst, :goodsType, :goodsDemand, :saleRate, :remarks)
    `, {
      ...f,
      goodsType: f.goodsType,
      goodsDemand: f.goodsDemand,
      saleRate: f.saleRate
    });
    await conn.commit();
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, message: "Error saving form" });
  }
});

router.get('/report', async (req, res) => {
  try {
    const conn = await db();
    const result = await conn.execute(`SELECT * FROM tender_form`);
    const mapped = result.rows.map(r => ({
      id: r[0], fullName: r[2], mobile: r[8], email: r[9],
      goodsType: r[12], goodsDemand: r[13], saleRate: r[14]
    }));
    res.send(mapped);
  } catch (err) {
    res.send([]);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const conn = await db();
    await conn.execute(`DELETE FROM tender_form WHERE id = :id`, [req.params.id]);
    await conn.commit();
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false });
  }
});

router.get('/export', async (req, res) => {
  const conn = await db();
  const result = await conn.execute(`SELECT * FROM tender_form`);
  const data = result.rows.map(row => ({
    FullName: row[2], Mobile: row[8], Email: row[9],
    GoodsType: row[12], Demand: row[13], Rate: row[14]
  }));
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Report');
  const filePath = path.join(__dirname, '../uploads/report.xlsx');
  xlsx.writeFile(wb, filePath);
  res.download(filePath);
});

module.exports = router;
