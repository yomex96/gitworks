import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.ADMIN_EMAIL, // Use admin email from .env file
    pass: process.env.ADMIN_PASS,  // Use admin email password from .env file
  },
});

// Function to send booking confirmation and admin notification emails
export const sendBookingEmail = async (booking) => {
  // Mail options for user (booking confirmation)
  const userMailOptions = {
    from: process.env.ADMIN_EMAIL, // Admin email
    to: booking.email,             // User-provided email
    subject: 'Booking Confirmation',
    text: `Hi ${booking.name}, your booking for ${booking.date} at ${booking.time} has been confirmed!`,
  };

  // Mail options for admin (booking notification)
  const adminMailOptions = {
    from: process.env.ADMIN_EMAIL, // Admin email
    to: process.env.ADMIN_EMAIL,   // Admin email (could be different if needed)
    subject: 'New Booking Received',
    text: `New booking from ${booking.name}. Date: ${booking.date}, Time: ${booking.time}, Email: ${booking.email}`,
  };

  try {
    // Send the user email (booking confirmation)
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log('User email sent: ' + userInfo.response);

    // Send the admin email (booking notification)
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent: ' + adminInfo.response);

  } catch (error) {
    console.error('Error sending emails: ', error);
    // Throw error to handle it at a higher level if needed
    throw error;
  }
};



// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your email provider
//   auth: {
//     user: process.env.ADMIN_EMAIL, // Use default admin email
//     pass: process.env.ADMIN_PASS,   // Use default admin password
//   },
// });

// export const sendBookingEmail = (booking) => {
//   const userMailOptions = {
//     from: process.env.ADMIN_EMAIL, // Send from admin email
//     to: booking.email,              // User-provided email
//     subject: 'Booking Confirmation',
//     text: `Hi ${booking.name}, your booking for ${booking.date} at ${booking.time} has been confirmed!`,
//   };

//   const adminMailOptions = {
//     from: process.env.ADMIN_EMAIL, // Send from admin email
//     to: process.env.ADMIN_EMAIL,    // Admin email (could be different if needed)
//     subject: 'New Booking Received',
//     text: `New booking from ${booking.name}. Date: ${booking.date}, Time: ${booking.time}, Email: ${booking.email}`,
//   };

//   // Send email to the user
//   transporter.sendMail(userMailOptions, (error, info) => {
//     if (error) {
//       return console.error('Error sending email to user: ', error);
//     }
//     console.log('User email sent: ' + info.response);
//   });

//   // Send email to the admin
//   transporter.sendMail(adminMailOptions, (error, info) => {
//     if (error) {
//       return console.error('Error sending email to admin: ', error);
//     }
//     console.log('Admin email sent: ' + info.response);
//   });
// };




// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your email provider
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendBookingEmail = (booking) => {
//   const userMailOptions = {
//     from: process.env.EMAIL_USER,
//     to: booking.email, // Send email to the user
//     subject: 'Booking Confirmation',
//     text: `Hi ${booking.name}, your booking for ${booking.date} at ${booking.time} has been confirmed!`,
//   };

//   const adminMailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.ADMIN_EMAIL, // Send email to the admin
//     subject: 'New Booking Received',
//     text: `New booking from ${booking.name}. Date: ${booking.date}, Time: ${booking.time}, Email: ${booking.email}`,
//   };

//   // Send email to the user
//   transporter.sendMail(userMailOptions, (error, info) => {
//     if (error) {
//       return console.error('Error sending email to user: ', error);
//     }
//     console.log('User email sent: ' + info.response);
//   });

//   // Send email to the admin
//   transporter.sendMail(adminMailOptions, (error, info) => {
//     if (error) {
//       return console.error('Error sending email to admin: ', error);
//     }
//     console.log('Admin email sent: ' + info.response);
//   });
// };


// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your email provider
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendBookingEmail = (booking) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: booking.email, // User email
//     subject: 'Booking Confirmation',
//     text: `Hi ${booking.name}, your booking for ${booking.date} at ${booking.time} has been confirmed!`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.error('Error sending email: ', error);
//     }
//     console.log('Email sent: ' + info.response);
//   });
// };

