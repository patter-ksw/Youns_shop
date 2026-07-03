module.exports = (req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Expose the configured Vercel Env variables to the client side
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL',
    supabaseKey: process.env.SUPABASE_KEY || 'YOUR_SUPABASE_ANON_KEY'
  });
};
