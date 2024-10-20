const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
console.log("enetered router");

router.post('/bookAppointment', appointmentController.bookAppointment);

module.exports = router;
