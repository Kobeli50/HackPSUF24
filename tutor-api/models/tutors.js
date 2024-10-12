const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  concentration: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      studentName: String,
      comment: String,
      rating: Number,
    },
  ],
});

module.exports = mongoose.model('Tutor', TutorSchema);
