const mongoose = require('mongoose')

const availabilitySchema = new mongoose.Schema({
    userId: {
        type: String,   //Take string for no auth flow, otherwise take it user refference id
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Availability', availabilitySchema);