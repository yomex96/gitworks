import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.ADMIN_EMAIL, // Admin email
    pass: process.env.ADMIN_PASS,   // Admin email password
  },
});

// Function to send test contact emails
const sendTestContactEmail = async () => {
  const testContact = {
    name: 'Jane Doe',
    email: 'janedoe@example.com', // User email for testing
    phoneNumber: '1234567890',
    message: 'This is a test message from the contact form.',
  };

  const adminMailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL, // Send email to the admin
    subject: 'New Contact Message',
    text: `New contact from ${testContact.name}.\n` +
          `Email: ${testContact.email}\n` +
          `Phone Number: ${testContact.phoneNumber}\n` +
          `Message: ${testContact.message}`,
  };

  try {
    // Send email to the admin
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Admin contact email sent: ' + adminInfo.response);
    
  } catch (error) {
    console.error('Error sending contact email: ', error);
  }
};

// Run the test
sendTestContactEmail();
