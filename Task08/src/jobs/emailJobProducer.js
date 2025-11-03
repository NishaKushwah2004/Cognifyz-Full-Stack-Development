// src/jobs/emailJobProducer.js
import emailQueue from './emailQueue.js';

// Function to enqueue new email job
export const enqueueEmail = async ({ email, name }) => {
  await emailQueue.add({ email, name });
  console.log(`✅ Job added to queue for ${email}`);
};
