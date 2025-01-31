const client = require('../config/redis.config.js');

// Get data from the cache
const getFromCache = (key) => {
  return new Promise((resolve, reject) => {
    console.log(`Fetching from cache for key: ${key}`);

    // Set a timeout for the Redis query
    const timeout = setTimeout(() => {
      console.error('Redis query timed out');
      reject(new Error('Redis query timed out'));
    }, 5000); // 5 seconds

    client.get(key, (err, data) => {
      clearTimeout(timeout); // Clear the timeout if the query completes
      if (err) {
        console.error('Cache error:', err);
        reject(err);
      } else {
        console.log(`Cache data for key ${key}:`, data);
        resolve(data ? JSON.parse(data) : null);
      }
    });
  });
};

// Set data to the cache
const setToCache = (key, data) => {
  console.log(`Setting cache for key: ${key}`);
  client.setex(key, 3600, JSON.stringify(data)); // Cache for 1 hour
};

module.exports = { getFromCache, setToCache };