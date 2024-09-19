// api/auth.js
const adminCredentials = {
  username: 'admin',
  password: 'admin123' // Use environment variables in production
};

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username === adminCredentials.username && password === adminCredentials.password) {
      // Respond with a success message and a simple token
      return res.status(200).json({ message: 'Login successful', token: 'your_jwt_token_here' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
