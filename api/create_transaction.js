const midtransClient = require('midtrans-client');

const midtrans = new midtransClient.Snap({
  isProduction: true,
  serverKey: 'Mid-server-9t2QptoETl-V08RbEVTuEKV0', // Replace with your actual server key
});

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://warung-agen.vercel.app'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      const orderDetails = req.body;
      const transaction = await midtrans.createTransaction(orderDetails);
      res.status(200).json({ token: transaction.token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
