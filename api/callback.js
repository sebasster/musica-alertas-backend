export default async function handler(req, res) {
  const querystring = require("querystring");

  const code = req.query.code || null;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  const authOptions = {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
  };

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
    const data = await response.json();

    if (data.error) {
      console.error("Error fetching token:", data);
      return res.status(400).json({ error: data.error });
    }

    // En este punto, ya tenés access_token y refresh_token
    res.status(200).json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get token" });
  }
}
