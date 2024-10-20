const db = require('../config/db'); // Import your database connection

// Login function for doctors
exports.login = (req, res) => {
    const { email, password } = req.body;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Query to get the doctor record based on the email
    const query = 'SELECT * FROM doctors WHERE email = ?';

    db.query(query, [trimmedEmail], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Database error' });
        }

        console.log("Query results:", results);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const doctor = results[0];

        // Compare the provided password with the stored password directly
        if (trimmedPassword !== doctor.password) {
            console.log("Password mismatch:", trimmedPassword, "!==", doctor.password);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.doctorId = doctor.id; // Assuming you're using express-session

        return res.redirect('/doctorAppointments.html'); // Redirect to the appointments page
    });
};

// Get appointments for the logged-in doctor
exports.getAppointments = (req, res) => {
    const doctorId = req.session.doctorId; // Use session to get the logged-in doctor's ID

    const query = `
        SELECT a.id, p.name AS patient_name, a.appointment_date, a.appointment_time, a.status
        FROM appointments AS a
        JOIN patients AS p ON a.patient_id = p.id
        WHERE a.doctor_id = ?
        ORDER BY a.appointment_date, a.appointment_time
    `;

    db.query(query, [doctorId], (error, results) => {
        if (error) {
            console.error('Error fetching appointments:', error);
            return res.status(500).json({ error: 'Failed to fetch appointments' });
        }

        res.json(results);
    });
};

// Logout function for doctors
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.redirect('/doctor.html'); // Redirect to login page
    });
};
