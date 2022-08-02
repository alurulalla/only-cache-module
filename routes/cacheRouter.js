const express = require('express');
const {
  getCacheData,
  setCacheData,
  deleteCacheData,
} = require('../controllers/cacheController');

const router = express.Router();

router.route('/').get(getCacheData).post(setCacheData).delete(deleteCacheData);

module.exports = router;
