const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 3000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// POST /api/auth/google
// Body: { credential: '<ID_TOKEN_JWT>' }
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body || {};
  if (!credential) return res.status(400).json({ success: false, error: 'Missing credential' });

  try {
    // Verify the ID token with Google's tokeninfo endpoint
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
    const r = await fetch(url);
    if (!r.ok) {
      const text = await r.text();
      return res.status(401).json({ success: false, error: 'Invalid token', details: text });
    }

    const payload = await r.json();

    // Optionally verify audience (client ID)
    if (GOOGLE_CLIENT_ID) {
      if (payload.aud !== GOOGLE_CLIENT_ID) {
        return res.status(401).json({ success: false, error: 'Token audience mismatch' });
      }
    }

    // At this point the token is valid. Create a session here if desired.
    // For demo we simply return the token payload.
    return res.json({ success: true, payload });
  } catch (err) {
    console.error('Error verifying id_token:', err);
    return res.status(500).json({ success: false, error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`);
});
