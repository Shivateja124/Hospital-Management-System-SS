const db = require('../config/db'); // Assuming you have a db connection setup

exports.createAppointment = async ({ patientName, doctorId, appointmentDate, appointmentTime }) => {
    const query = 'INSERT INTO appointments (patient_name, doctor_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)';
    const values = [patientName, doctorId, appointmentDate, appointmentTime];

    try {
        console.log("Executing query:", query, "with values:", values);
        const result = await db.execute(query, values);
        console.log(result.id);

        // Optionally return the ID of the newly created appointment
    } catch (error) {
        console.error('Database error:', error); // Log the error for debugging
        throw new Error('Database error: ' + error.message);
    }
};
