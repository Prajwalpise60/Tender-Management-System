const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/register', async (req, res) => {
  const { firstName, middleName, lastName, mobile, email, password } = req.body;
  const fullName = `${firstName} ${middleName} ${lastName}`;
  try {
    const conn = await db();
    await conn.execute(`INSERT INTO app_users (full_name, mobile, email, password)
      VALUES (:fullName, :mobile, :email, :password)`, [fullName, mobile, email, password]);
    await conn.commit();
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.send({ success: false, message: "Error in registration" });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const conn = await db();
    const result = await conn.execute(`SELECT * FROM app_users WHERE email=:email AND password=:password`,
      [email, password]);
    if (result.rows.length > 0) {
      res.send({ success: true });
    } else {
      res.send({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.send({ success: false });
  }
});

module.exports = router;
