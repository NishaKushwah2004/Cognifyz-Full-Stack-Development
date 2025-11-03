import nodemailer from 'nodemailer';
import emailQueue from './emailQueue.js';

// Configure a transporter (fake for local demo)
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email', // test SMTP server
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

// Process jobs from queue
emailQueue.process(async (job) => {
  const { email, name } = job.data;

  console.log(`📧 Processing email for: ${email}`);

  // Simulate sending an email
  const info = await transporter.sendMail({
    from: '"Cognifyz" <no-reply@cognifyz.com>',
    to: email,
    subject: `Welcome to Cognifyz, ${name}!`,
    text: `Hello ${name}, welcome aboard!`,
  });

  console.log(`✅ Email sent to ${email}: ${info.messageId}`);
});
