// Vercel serverless function (Node.js).
// Community photo reports were never enabled on the live deployment; it
// answers every request with this payload. Kept so the frontend behaves
// identically to https://patiala-diwali-dashboard.vercel.app.
export default function handler(req, res) {
  res.status(200).json({ error: 'community reporting is not enabled', enabled: false });
}
