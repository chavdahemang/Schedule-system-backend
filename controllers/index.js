const express = require('express');
const Availability = require('../models/Availability');
const { BASE_CLIENT_LOCAL_URL } = require('../constants');
const BookingLink = require('../models/BookingLink');
const Booking = require('../models/Booking');

function getSlots(start, end) {
  let [h, m] = start.split(':').map(Number), slots = [];
  const [endH, endM] = end.split(':').map(Number);

  while (h < endH || (h === endH && m < endM)) {
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    m += 30;
    if (m >= 60) { h++; m = 0; }
  }
  return slots;
}


async function createAvailability(req, res) {
    const { userId, date, startTime, endTime } = req.body;

    try {
        const createAvailability = await Availability.create({
            userId,
            date,
            startTime,
            endTime
        })
        return res.json({
            status: 200,
            error: false,
            data: createAvailability,
            message: 'Availability created successfully'
        })
    } catch (error) {
        return res.json({
            status: 500,
            error: true,
            data: [],
            message: error.message || 'Something went wrong'
        })
    }
}

async function generateLink(req, res) {
    const { userId } = req.params;

    if (!userId || userId === '') {
        return res.json({
            status: 400,
            error: true,
            data: [],
            message: 'userId is required'
        })
    }
    try {
        const existing = await BookingLink.findOne({ userId });
        if (existing) {
            return res.json({
                status: 200,
                error: false,
                data: { link: `${BASE_CLIENT_LOCAL_URL}availability/${existing._id}` },
                message: 'Link generated successfully'
            })
        }
        const generateLink = await BookingLink.create({ userId })
        return res.json({
            status: 200,
            error: false,
            data: { link: `${BASE_CLIENT_LOCAL_URL}availability/${generateLink._id}` },
            message: 'Link generated successfully'
        })
    } catch (error) {
        return res.json({
            status: 500,
            error: true,
            data: [],
            message: error.message || 'Something went wrong'
        })
    }
}

async function availability(req,res) {
     try {
        const link = await BookingLink.findById(req.params.linkId);
        if (!link) return res.json({
            status: 404,
            error: true,
            data: [],
            message: 'Link not found'
        });

        const availabilities = await Availability.find({ userId: link.userId });
        const bookings = await Booking.find({ linkId: req.params.linkId });

        const response = availabilities.map(a => {
            const bookedTimes = bookings.filter(b => b.date === a.date).map(b => b.time);
            const allSlots = getSlots(a.startTime, a.endTime);
            const available = allSlots.filter(t => !bookedTimes.includes(t));
            return { date: a.date, availableSlots: available };
        });

        res.json({ 
            status: 200,
            error: false,
            data: response, 
            message:'success'
        });
    } catch (err) {
       return res.json({ 
        status:5000,
        error:true,
        data:[],
        message: err.message || 'Something went wrong' });
    }
}

async function book(req,res) {
      const { linkId, date, time } = req.body;

  if (linkId === undefined || date === undefined || time === undefined) {
    return res.json({ 
        status: 400,
        error: true,
        data: [],
        message: 'Invalid request' 
    })    
  }

  try {
    const booking = new Booking({ linkId, date, time });
    await booking.save();

    res.json({ 
        status: 200,
        error: false,
        data: [], 
        message:'Booking successful' 
    });
  } catch (err) {
    res.json({ 
        status:5000,
        error:true,
        data:[],
        message: err.message || 'Something went wrong' });
  }
}

module.exports = { createAvailability,generateLink,availability,book};