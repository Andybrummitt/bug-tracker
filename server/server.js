require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const apiErrorHandler = require('./error/apiErrorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors({origin: "http://localhost:3000", credentials: true, optionsSuccessStatus: 200}))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

app.use(apiErrorHandler);

mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log('server listening on port ' + port)
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})