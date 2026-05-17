import { useEffect, useState } from "react";

export default function Home() {
  const [donations, setDonations] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // забираем токен из URL и кладём в localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const t = url.searchParams.get("token");
    if (t) {
      localStorage.setItem("da_access_token", t);
      setToken(t);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.toString());
    } else {
      const saved = localStorage.getItem("da_access_token");
      if (saved) setToken(saved);
    }
  }, []);

  async function loadDonations() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/donations?token=" + encodeURIComponent(token));
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
        setDonations([]);
      } else {
        setDonations(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;
    loadDonations();
    const id = setInterval(loadDonations, 5000);
    return () => clearInterval(id);
  }, [token]);

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#fff", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Донаты DonationAlerts</h1>

      {!token && (
        <a
          href="/auth"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            background: "#ff9900",
            color: "#000",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Подключить DonationAlerts
        </a>
      )}

      {token && (
        <div>
          <p>Токен получен. Загружаю донаты...</p>
          <div
            style={{
              maxWidth: 600,
              marginTop: 20,
              background: "#181818",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }}
          >
            {loading && <div>Загрузка...</div>}
            {!loading && donations.length === 0 && <div>Донатов пока нет.</div>}
            {donations.map((d) => (
              <div
                key={d.id}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #333"
                }}
              >
                <strong>{d.username}</strong> отправил{" "}
                <strong>
                  {d.amount} {d.currency}
                </strong>
                <br />
                <em>{d.message || "Без сообщения"}</em>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
