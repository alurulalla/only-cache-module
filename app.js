const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const redisClient = require('./services/redisServices');
const cacheRouter = require('./routes/cacheRouter');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

redisClient.on('connect', () => console.log('Successfully connected to Redis'));
redisClient.on('error', () => console.log('unable to connect to redis'));

app.use('/api/v1/cache', cacheRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Unable to resolve the request: ${req.originalUrl}`, 400));
});

app.use(globalErrorHandler);

module.exports = app;
