import * as nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  requireTLS: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const EMAIL_SENDER = process.env.EMAIL_SENDER || 'noreply@TestApp.com';

export const APP_NAME = process.env.APP_NAME || 'TestApp';

type EmailBody = {
  from: { name: string; address: string };
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = (body: EmailBody) => {
  return transporter.sendMail(body).catch((err) => {
    console.log(err);
  });
};
