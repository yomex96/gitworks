//google map  with contact form
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.ADMIN_EMAIL, // Admin email
    pass: process.env.ADMIN_PASS,   // Admin email password
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

/**
 * Sends a contact form submission email to the admin.
 * @param {Object} contact - Contact form data.
 * @param {String} contact.name - Name of the person submitting the form.
 * @param {String} contact.email - Email of the person submitting the form.
 * @param {String} [contact.phoneNumber] - (Optional) Phone number of the person.
 * @param {String} contact.message - Message from the contact form.
 */

// export const sendContactEmail = async (contact) => {
//   const contactMailOptions = {
//     from: contact.email,           // Sender's email
//     to: process.env.ADMIN_EMAIL,   // Admin email
//     subject: `New Contact Request from ${contact.name}`,
//     text: `
//       You have received a new contact request.
      
//       Name: ${contact.name}
//       Email: ${contact.email}
//       ${contact.phoneNumber ? `Phone Number: ${contact.phoneNumber}` : ''}
//       Message: ${contact.message}
//     `,
//   };

export const sendContactEmail = async (contact) => {
  const contactMailOptions = {
    from: contact.email,                    // Sender's email
    to: process.env.ADMIN_EMAIL,            // Admin email
    subject: `New Contact Request from ${contact.firstName} ${contact.lastName}`,
    text: `
    You have received a new contact request.

    First Name: ${contact.firstName}
    Last Name: ${contact.lastName}
    Email: ${contact.email}
    ${contact.phoneNumber ? `Phone Number: ${contact.phoneNumber}` : ''}
    Message:
    ${contact.message.split('\n').map(line => `    - ${line}`).join('\n')}
`,
  };

  
  try {
    const contactInfo = await transporter.sendMail(contactMailOptions);
    console.log('Contact email sent: ' + contactInfo.response);
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Failed to send contact email');
  }
};





// //options 2 with contact form without google map

// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Create a transporter using your email service
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Use your email provider
//   auth: {
//     user: process.env.ADMIN_EMAIL, // Admin email
//     pass: process.env.ADMIN_PASS,   // Admin email password
//   },
// });

// /**
//  * Sends a booking confirmation email to the user and a notification to the admin.
//  * @param {Object} booking - Booking information.
//  * @param {String} booking.firstName - First name of the user.
//  * @param {String} booking.lastName - Last name of the user.
//  * @param {String} booking.email - User's email.
//  * @param {String} booking.phoneNumber - User's phone number.
//  * @param {String} booking.photoshootType - Type of photoshoot.
//  * @param {Date} booking.date - Date of the booking.
//  * @param {String} booking.time - Time of the booking.
//  * @param {String} booking.location - Location of the photoshoot.
//  * @param {String} [booking.description] - Optional description or additional details.
//  */
// export const sendBookingEmail = async (booking) => {
//   // Mail options for user (booking confirmation)
//   const userMailOptions = {
//     from: process.env.ADMIN_EMAIL,
//     to: booking.email, // User-provided email
//     subject: 'Booking Confirmation',
//     text: `Hi ${booking.firstName} ${booking.lastName},\n\nYour booking for a ${booking.photoshootType} on ${booking.date} at ${booking.time} has been confirmed!\nLocation: ${booking.location}\n\nDescription: ${booking.description || 'No description provided'}\n\nThank you!`,
//   };

//   // Mail options for admin (booking notification)
//   const adminMailOptions = {
//     from: process.env.ADMIN_EMAIL,
//     to: process.env.ADMIN_EMAIL, // Admin email
//     subject: 'New Booking Received',
//     text: `New booking from ${booking.firstName} ${booking.lastName}.\n` +
//           `Phone Number: ${booking.phoneNumber}\n` +
//           `Photoshoot Type: ${booking.photoshootType}\n` +
//           `Date: ${booking.date}\n` +
//           `Time: ${booking.time}\n` +
//           `Email: ${booking.email}\n` +
//           `Location: ${booking.location}\n` +
//           `Description: ${booking.description || 'No description provided'}`,
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
//     throw new Error('Failed to send booking emails');
//   }
// };

// /**
//  * Sends a contact form submission email to the admin.
//  * @param {Object} contact - Contact form data.
//  * @param {String} contact.name - Name of the person submitting the form.
//  * @param {String} contact.email - Email of the person submitting the form.
//  * @param {String} [contact.phoneNumber] - (Optional) Phone number of the person.
//  * @param {String} contact.message - Message from the contact form.
//  */
// export const sendContactEmail = async (contact) => {
//   const contactMailOptions = {
//     from: contact.email,           // Sender's email
//     to: process.env.ADMIN_EMAIL,   // Admin email
//     subject: `New Contact Request from ${contact.name}`,
//     text: `
//       You have received a new contact request.
      
//       Name: ${contact.name}
//       Email: ${contact.email}
//       ${contact.phoneNumber ? `Phone Number: ${contact.phoneNumber}` : ''}
//       Message: ${contact.message}
//     `,
//   };

//   try {
//     const contactInfo = await transporter.sendMail(contactMailOptions);
//     console.log('Contact email sent: ' + contactInfo.response);
//   } catch (error) {
//     console.error('Error sending contact email:', error);
//     throw new Error('Failed to send contact email');
//   }
// };






//with  googlemap without contact form

// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Create a transporter for sending emails
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Use your email provider
//   auth: {
//     user: process.env.ADMIN_EMAIL, // Admin email
//     pass: process.env.ADMIN_PASS,  // Admin email password
//   },
// });

// // Function to send booking confirmation and admin notification emails
// export const sendBookingEmail = async (booking) => {
//   // Create a Google Maps link using the location coordinates
//   const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.location.address)}`;


//  // Mail options for user (booking confirmation)
//   const userMailOptions = {
//     from: process.env.ADMIN_EMAIL, // Admin email
//     to: booking.email,              // User-provided email
//     subject: 'Booking Confirmation',
//     text: `Dear ${booking.firstName} ${booking.lastName},\n\n` +
//           `Thank you for choosing our services!\n\n` +
//           `We are pleased to confirm your booking for a ${booking.photoshootType} on ${booking.date.toLocaleDateString()} at ${booking.time}.\n` +
//           `If you have any questions or need to make changes to your booking, please do not hesitate to reach out.\n\n` +
//           `We look forward to serving you!\n\n` +
//           `Best regards,\n` +
//           `The Booking Team`,
//   };
  

 
//   // Mail options for admin (booking notification)
//   const adminMailOptions = {
//     from: process.env.ADMIN_EMAIL,
//     to: process.env.ADMIN_EMAIL,
//     subject: 'New Booking Notification',
//     text: `Dear Admin,\n\n` +
//           `A new booking has been received:\n\n` +
//           `Client Information:\n` +
//           `- Name: ${booking.firstName} ${booking.lastName}\n` +
//           `- Phone Number: ${booking.phoneNumber}\n` +
//           `- Email: ${booking.email}\n\n` +
//           `Booking Details:\n` +
//           `- Photoshoot Type: ${booking.photoshootType}\n` +
//           `- Date: ${booking.date.toLocaleDateString()}\n` +
//           `- Time: ${booking.time}\n` +
//           `- Location: ${booking.location.address}\n` +
//           `- View on Google Maps: ${googleMapsLink}\n` +
//           `- Description: ${booking.description || 'No additional details provided.'}\n\n` +
//           `Thank you,\n`,
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
//     throw error; // Throw error to handle it at a higher level if needed
//   }
// };








//without google map  without contact form


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




