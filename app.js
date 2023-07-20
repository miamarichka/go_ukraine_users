const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const usersRouter = require('./routes/api/users');
const citiesRouter = require('./routes/api/cities');

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/cities', citiesRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found 404' })
});

app.use((error, req, res, next) => {
    if (error.code === 'LIMIT_FILE_SIZE') {
        error.message = 'Select file up to 5 MB'
    }

    const status = error.status || 500;
    const message = error.message || 'Service error';
    res.status(status).json({ message })
});

module.exports = app;