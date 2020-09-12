const nodemailer = require('nodemailer');

const sendEmail = (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.
      }
  })
  // Define the email options
  // Actually send email
};
