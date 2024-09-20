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

// Function to send test emails
const sendTestEmail = async () => {
  const testBooking = {
    name: 'John Doest',
    email: 'mattbelido@gmail.com', // User email for testing
    date: '2024-09-20',
    time: '14:00',
  };

  const userMailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: testBooking.email, // Send email to the user
    subject: 'Booking Confirmation',
    text: `Hi ${testBooking.name}, your booking for ${testBooking.date} at ${testBooking.time} has been confirmed! Thank you.`,
  };

  const adminMailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL, // Send email to the admin
    subject: 'New Booking Received',
    text: `New booking from ${testBooking.name}. Date: ${testBooking.date}, Time: ${testBooking.time}, Email: ${testBooking.email}`,
  };

  try {
    // Send email to the user
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log('User email sent: ' + userInfo.response);

    // Send email to the admin
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent: ' + adminInfo.response);
    
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

// Run the test
sendTestEmail();


