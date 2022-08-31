const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

app.listen(port, () => {
    console.log('server listening on port ' + port)
})