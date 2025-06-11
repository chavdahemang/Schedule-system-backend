const express = require('express');
const Availability = require('../models/Availability');
const { PORT } = require('..');
const { BASE_LOCAL_URL, BASE_CLIENT_LOCAL_URL } = require('../constants');
const BookingLink = require('../models/BookingLink');
const Booking = require('../models/Booking');
const { createAvailability, generateLink, availability, book } = require('../controllers');
const router = express.Router()



router.post('/create-availability', createAvailability)

router.post('/generate-link/:userId', generateLink)

router.get('/availability/:linkId', availability);

router.post('/book', book)

module.exports = router