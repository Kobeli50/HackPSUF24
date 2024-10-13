const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutors');

// @route   GET /api/tutors
// @desc    Get all tutors
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/tutors
// @desc    Add a new tutor
router.post('/', async (req, res) => {
  const { id, name, email, concentration, subject, rating, imageURL, bio } = req.body;

  const newTutor = new Tutor({
    id,
    name,
    email,
    subject,
    concentration,
    rating,
    imageURL,
    bio,
  });

  try {
    const savedTutor = await newTutor.save();
    res.json(savedTutor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/tutors/:id
// @desc    Get a specific tutor by ID
router.get('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findOne({ id: Number(req.params.id) }); // Query by custom 'id'
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/tutors/:id
// @desc    Delete a tutor
router.delete('/:id', async (req, res) => {
  try {
    await Tutor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tutor deleted' });
  } catch (error) {
    res.status(404).json({ message: 'Tutor not found' });
  }
});

module.exports = router;
