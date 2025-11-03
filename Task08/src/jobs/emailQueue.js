// src/jobs/emailQueue.js
import Queue from 'bull';
import dotenv from 'dotenv';

dotenv.config();

// Connect to Redis (default localhost:6379)
const emailQueue = new Queue('emailQueue', {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
});

export default emailQueue;
