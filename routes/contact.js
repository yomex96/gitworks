import express from 'express';
import Contact from '../models/Contact.js'; // Import the Contact model
import { sendContactEmail } from '../config/nodemailer.js';

const router = express.Router();

// POST: Submit contact form and send email
router.post('/', async (req, res) => {
    const { firstName, lastName, phoneNumber, email, message } = req.body;

    // Validate input
    if (!firstName || !lastName || !phoneNumber || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Create a new contact submission
        const newContact = new Contact({
            firstName,
            lastName,
            phoneNumber,
            email,
            message,
        });

        // Save to database
        await newContact.save();

        // Send email notification to admin
        await sendContactEmail({ firstName, lastName, phoneNumber, email, message });

        res.status(201).json({ message: 'Contact form submitted successfully.' });
    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({ message: 'There was a problem submitting the contact form.' });
    }
});

// GET: Retrieve all contact submissions (for admin panel, if needed)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

  






// // POST: Submit contact form and send email
// router.post('/', async (req, res) => {
//     const { firstName, lastName, message, phoneNumber, email} = req.body;
// //   const { name, email, message } = req.body;


//   // Validate input
// //   if (!name || !email || !message) {
// //     return res.status(400).json({ message: 'All fields are required.' });
// //   }

//   if (!firstName || !lastName || !phoneNumber || !email || !message) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }


//   try {
//     // Optionally save contact form submission to database
//     const newContact = new Contact({
//       name,
//       email,
//       message,
//     });

//     await newContact.save(); // Save to database

//     // Send email notification to admin
//     await sendContactEmail({ name, email, message });

//     res.status(201).json({ message: 'Contact form submitted successfully.' });
//   } catch (error) {
//     console.error('Error handling contact form:', error);
//     res.status(500).json({ message: 'There was a problem submitting the contact form.' });
//   }
// });




