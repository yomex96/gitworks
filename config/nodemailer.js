import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.ADMIN_EMAIL, // Admin email
    pass: process.env.ADMIN_PASS,  // Admin email password
  },
});

// Function to send booking confirmation and admin notification emails
export const sendBookingEmail = async (booking) => {
  // Create a Google Maps link using the location coordinates
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.location.address)}`;


 // Mail options for user (booking confirmation)
  const userMailOptions = {
    from: process.env.ADMIN_EMAIL, // Admin email
    to: booking.email,              // User-provided email
    subject: 'Booking Confirmation',
    text: `Dear ${booking.firstName} ${booking.lastName},\n\n` +
          `Thank you for choosing our services!\n\n` +
          `We are pleased to confirm your booking for a ${booking.photoshootType} on ${booking.date.toLocaleDateString()} at ${booking.time}.\n` +
          `If you have any questions or need to make changes to your booking, please do not hesitate to reach out.\n\n` +
          `We look forward to serving you!\n\n` +
          `Best regards,\n` +
          `The Booking Team`,
  };
  

 
  // Mail options for admin (booking notification)
  const adminMailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Booking Notification',
    text: `Dear Admin,\n\n` +
          `A new booking has been received:\n\n` +
          `Client Information:\n` +
          `- Name: ${booking.firstName} ${booking.lastName}\n` +
          `- Phone Number: ${booking.phoneNumber}\n` +
          `- Email: ${booking.email}\n\n` +
          `Booking Details:\n` +
          `- Photoshoot Type: ${booking.photoshootType}\n` +
          `- Date: ${booking.date.toLocaleDateString()}\n` +
          `- Time: ${booking.time}\n` +
          `- Location: ${booking.location.address}\n` +
          `- View on Google Maps: ${googleMapsLink}\n` +
          `- Description: ${booking.description || 'No additional details provided.'}\n\n` +
          `Thank you,\n`,
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
    throw error; // Throw error to handle it at a higher level if needed
  }
};





//without google map 

// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Create a transporter for sending emails
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Use your email provider
//   auth: {
//     user: process.env.ADMIN_EMAIL, // Use admin email from .env file
//     pass: process.env.ADMIN_PASS,  // Use admin email password from .env file
//   },
// });

// // Function to send booking confirmation and admin notification emails
// export const sendBookingEmail = async (booking) => {
//   // Mail options for user (booking confirmation)
//   const userMailOptions = {
//     from: process.env.ADMIN_EMAIL, // Admin email
//     to: booking.email,             // User-provided email
//     subject: 'Booking Confirmation',
//     text: `Hi ${booking.firstName} ${booking.lastName},\n\nYour booking for a ${booking.photoshootType} on ${booking.date} at ${booking.time} has been confirmed!\nLocation: ${booking.location}\n\nDescription: ${booking.description}\n\nThank you!`,
//   };

//   // Mail options for admin (booking notification)
//   const adminMailOptions = {
//     from: process.env.ADMIN_EMAIL, // Admin email
//     to: process.env.ADMIN_EMAIL,   // Admin email (could be different if needed)
//     subject: 'New Booking Received',
    
//     text: `New booking from ${booking.firstName} ${booking.lastName}.\n` +
//           `Phone Number: ${booking.phoneNumber}\n` +
//           `Photoshoot Type: ${booking.photoshootType}\n` +
//           `Date: ${booking.date}\n` +
//           `Time: ${booking.time}\n` +
//           `Email: ${booking.email}\n` +
//           `Location: ${booking.location}\n` +
//           `Description: ${booking.description}`,
//   };

//   try {
//     // Send the user email (booking confirmation)
//     const userInfo = await transporter.sendMail(userMailOptions);
//     console.log('User email sent: ' + userInfo.response);

//     // Send the admin email (booking notification)
//     const adminInfo = await transporter.sendMail(adminMailOptions);
//     console.log('Admin email sent: ' + adminInfo.response);

//   } catch (error) {
//     console.error('Error sending emails: ', error);
//     // Throw error to handle it at a higher level if needed
//     throw error;
//   }
// };

