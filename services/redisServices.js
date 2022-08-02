const Redis = require('ioredis');

const redisClient = new Redis({
  port: +process.env.REDIS_PORT,
  host: process.env.REDIS_END_POINT,
});

module.exports = redisClient;
