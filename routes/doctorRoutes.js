const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Route for doctor login
router.post('/login', doctorController.login);

// Route to get appointments for the logged-in doctor
router.get('/appointments', doctorController.getAppointments);

// Route for doctor logout
router.get('/logout', doctorController.logout);

module.exports = router;
