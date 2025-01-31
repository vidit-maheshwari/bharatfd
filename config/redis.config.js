const { createClient } = require('redis');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Create a Redis client
const client = createClient({
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

// Connect to Redis
const connectRedis = async () => {
    try {
        await client.connect();
        console.log('✅ Redis connected successfully');
    } catch (err) {
        console.error('❌ Redis Client Error:', err);
    }
};

connectRedis();

module.exports = client;
