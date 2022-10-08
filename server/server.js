require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const apiErrorHandler = require('./error/apiErrorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const helmet = require("helmet");
const path = require("path");
const { appendFileSync } = require('fs');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(helmet());
app.use(cors({origin: "http://localhost:3000", credentials: true, optionsSuccessStatus: 200}))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV === 'production') {
    console.log('woo')
    app.use(express.static('../client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
      })
}


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(apiErrorHandler);

mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log('server listening on port ' + port)
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})