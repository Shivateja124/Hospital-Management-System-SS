exports.loginDoctor = (req, res) => {
    const { username, password } = req.body;
  
    // Here you would normally check the credentials against a database
    if (username === 'doctor' && password === 'password') {
      req.session.doctorName = username; // Store doctor's name in session
      res.redirect('/doctor');
    } else {
      res.status(401).send('Invalid credentials');
    }
  };
  