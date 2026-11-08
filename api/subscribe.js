// Vercel serverless function (Node.js).
// Web-push subscription endpoint. The original deployment stored push
// subscriptions behind VAPID keys that are not part of the recovered code,
// so subscriptions cannot be carried over. This mirrors the observed
// behaviour of the live endpoint for invalid requests and declines
// subscriptions honestly instead of pretending to store them.
export default function handler(req, res) {
  if (req.method === 'POST') {
    const sub = req.body && (req.body.subscription || req.body);
    if (!sub || !sub.endpoint || !sub.keys) {
      res.status(400).json({ error: 'invalid push subscription' });
      return;
    }
    res.status(503).json({ error: 'push notifications are not configured on this deployment' });
    return;
  }
  res.status(405).json({ error: 'method not allowed' });
}
