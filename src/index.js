const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/riders', require('./routes/riderRoutes'));

app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'rider-service' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Rider service running on port ${PORT}`);
});