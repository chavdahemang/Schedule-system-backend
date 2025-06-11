const express = require('express');
const { createAvailability, generateLink, availability, book } = require('../controllers');
const router = express.Router()



router.post('/create-availability', createAvailability)

router.post('/generate-link/:userId', generateLink)

router.get('/availability/:linkId', availability);

router.post('/book', book)

module.exports = router