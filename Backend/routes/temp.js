router.post('/login', [
    body('UserName', 'Username cannot be blank').exists(),
    body('Password', 'Password cannot be blank').exists()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Changed to 400
    }
  
    const { UserName, Password } = req.body;
    try {
      let user = await User.findOne({ UserName });
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
  
      const passwordComp = await bcrypt.compare(Password, user.Password);
      if (!passwordComp) {
        return res.status(400).json({ error: "Wrong password" });
      }
  
      const payload = {
        user: {
          id: user.id
        }
      };
  
      const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Added expiration
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error"); // Fixed typo
    }
  })








  const handleSignIn = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName: formData.UserName, Password: formData.Password }), // Ensure correct field names
      });
      console.log("response")
      console.log(response)
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
  
      const result = await response.json();
      console.log('Login successful', result);
      const user = formData.UserName;
      if(result.authToken)
      {
        localStorage.setItem('authToken', result.authToken);
        navigate('/Profile',{ state: { user } });
      }else{
        // console.error('Error:', error.message);
        console.log("Login Failed")
      }
      
    } catch (error) {
      console.error('Error:', error.message);
      
    }
  };
  

const toggleSignUp = () => {
setIsSignUp(true);
};

const toggleSignIn = () => {
setIsSignUp(false);
};