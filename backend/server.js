const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tenderRoutes = require('./routes/tender');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/tender', tenderRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
