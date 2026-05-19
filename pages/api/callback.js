// принимает code от DonationAlerts, меняет на access_token и редиректит на /?token=...

const CLIENT_ID = "ТВОЙ_CLIENT_ID";
const CLIENT_SECRET = "ТВОЙ_CLIENT_SECRET";
const REDIRECT_URI = "https://siteodsotik.vercel.app/api/callback";

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: "no_code" });
  }

  try {
    const params = new URLSearchParams();
    params.set("grant_type", "authorization_code");
    params.set("client_id", CLIENT_ID);
    params.set("client_secret", CLIENT_SECRET);
    params.set("redirect_uri", REDIRECT_URI);
    params.set("code", code);

    const r = await fetch("https://www.donationalerts.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const data = await r.json();

    if (!data.access_token) {
      return res.status(500).json({ error: "no_access_token", raw: data });
    }

    const token = data.access_token;

    res.writeHead(302, {
      Location: "/?token=" + encodeURIComponent(token)
    });
    res.end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "exception" });
  }
}
