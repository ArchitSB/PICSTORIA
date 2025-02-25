const validateUser = (req, res, next) => {
    const { username, email } = req.body;
  
    // Check if both fields are present
    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
  
    next();
  };
  
  module.exports = validateUser;