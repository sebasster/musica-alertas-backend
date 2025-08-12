export default async function handler(req, res) {
  const querystring = require("querystring");

  const refresh_token = req.query.refresh_token;
  if (!refresh_token) {
    return res.status(400).json({ error: "Missing refresh_token" });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const authOptions = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  };

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
    const data = await response.json();

    if (data.error) {
      console.error("Error refreshing token:", data);
      return res.status(400).json({ error: data.error });
    }

    res.status(200).json({
      access_token: data.access_token,
      expires_in: data.expires_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to refresh token" });
  }
}
