const appointmentModel = require('../model/appointmentModel');

exports.bookAppointment = async (req, res) => {
    const { patientName, doctorId, appointmentDate, appointmentTime } = req.body;

    try {
        // Assuming createAppointment is a function in your appointmentModel
        const appointment = await appointmentModel.createAppointment({
            patientName,
            doctorId,
            appointmentDate,
            appointmentTime
        });
        console.log("eneterd controller");
        const msg='Appointment booked successfully! ';

        res.status(201).json(msg);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to book appointment.', error: error.message });
    }
};
