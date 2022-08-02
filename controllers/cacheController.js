const redisClient = require('../services/redisServices');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getCacheData = catchAsync(async (req, res, next) => {
  const { cacheKey } = req.query;

  if (!cacheKey) {
    return next(new AppError(`'cacheKey' is required`, 400));
  }

  const data = await redisClient.get(cacheKey);

  res.send(JSON.parse(data));
});

exports.setCacheData = catchAsync(async (req, res, next) => {
  const { cacheKey, data } = req.body;

  if (!cacheKey || !data) {
    return next(new AppError(`'cacheKey' or 'data' is missing`, 400));
  }

  await redisClient.set(cacheKey, JSON.stringify(data));

  res.json({ messag: 'Successfully cached the data' });
});

exports.deleteCacheData = catchAsync(async (req, res, next) => {
  const { cacheKey } = req.query;

  if (!cacheKey) {
    return next(new AppError(`'cacheKey' is required`, 400));
  }

  await redisClient.del(cacheKey);

  res.sendStatus(204);
});
