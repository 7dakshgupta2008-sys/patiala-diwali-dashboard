// Vercel serverless function (Node.js).
// Reports whether a push endpoint has an active subscription. The original
// subscription store is not part of the recovered code, so no endpoint is
// ever active here - matching the live response for unknown endpoints.
export default function handler(req, res) {
  const endpoint = req.query && req.query.endpoint;
  if (!endpoint) {
    res.status(400).json({ error: 'endpoint query param required' });
    return;
  }
  res.status(200).json({ active: false });
}
