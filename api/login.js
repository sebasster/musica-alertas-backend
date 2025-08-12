export default function handler(req, res) {
  const querystring = require("querystring");

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // Debe ser tu dominio + /api/callback
  const scope = "user-read-playback-state user-modify-playback-state playlist-read-private";

  const state = Math.random().toString(36).substring(2, 15);

  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });

  res.redirect(authUrl);
}
