const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    linkId:{
        type: String,
        required: true
    },
    date:{
        type:String, //Format: 'DD-MM-YYYY'
        required: true
    },
    time:{
        type:String, 
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);