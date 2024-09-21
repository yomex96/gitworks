import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  photoshootType: { 
    type: [String], 
    enum: ['Lifestyle Video Shoot', 'Brand Video Shoot', 'Pre-Wedding Photoshoot'], 
    required: true 
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: {
    address: { type: String, required: true }, // Formatted address from Google Maps
    coordinates: {
      type: {
        type: String, // 'Point'
        enum: ['Point'], // GeoJSON type
        required: true
      },
      coordinates: { 
        type: [Number], // [longitude, latitude]
        required: true 
      }
    }
  },
  description: { type: String, required: false }  // Optional field for extra details
});

// Create a 2dsphere index for geospatial queries
bookingSchema.index({ location: '2dsphere' });

export default mongoose.model('Booking', bookingSchema);


// without google map
// import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   photoshootType: { 
//     type: String, 
//     enum: ['Lifestyle Video Shoot', 'Brand Video Shoot', 'Pre-Wedding Photoshoot'], 
//     required: true 
//   },
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   location: { type: String, required: true },
//   description: { type: String, required: false }  // Optional field for extra details
// });

// export default mongoose.model('Booking', bookingSchema);

