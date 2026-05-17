// прокси к DonationAlerts API, чтобы не светить домену DA из браузера

export default async function handler(req, res) {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: "no_token" });
  }

  try {
    const r = await fetch(
      "https://www.donationalerts.com/api/v1/alerts/donations?limit=10",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "fetch_error" });
  }
}
