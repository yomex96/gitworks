import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  photoshootType: { 
    type: String, 
    enum: ['Lifestyle Video Shoot', 'Brand Video Shoot', 'Pre-Wedding Photoshoot'], 
    required: true 
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: false }  // Optional field for extra details
});

export default mongoose.model('Booking', bookingSchema);


// import mongoose from 'mongoose';


// const bookingSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
// });

// export default mongoose.model('Booking', bookingSchema);
