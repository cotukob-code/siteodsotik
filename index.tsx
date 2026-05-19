<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>СайтСотика — Главная</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <style>
    :root {
      --bg: #02030a;
      --accent: #ff9900;
      --accent2: #ff4b00;
      --accent3: #ffdd99;
      --muted: #9a9ab5;
      --glass: rgba(10,10,25,0.82);
      --glass-strong: rgba(10,10,25,0.96);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html, body {
      height: 100%;
      overflow: hidden;
      font-family: system-ui, sans-serif;
      background:
        radial-gradient(circle at 0 0, #26264a 0, transparent 55%),
        radial-gradient(circle at 100% 0, #3a1f3f 0, transparent 55%),
        radial-gradient(circle at 50% 100%, #1b2b3f 0, transparent 60%),
        var(--bg);
      color: #fff;
    }

    .bg-orbit {
      position: absolute;
      inset: -20%;
      background:
        radial-gradient(circle at 0 0, rgba(255,255,255,0.08), transparent 55%),
        radial-gradient(circle at 100% 0, rgba(255,153,0,0.18), transparent 55%),
        radial-gradient(circle at 0 100%, rgba(0,180,255,0.18), transparent 55%),
        radial-gradient(circle at 100% 100%, rgba(255,75,0,0.18), transparent 55%);
      opacity: 0.7;
      filter: blur(4px);
      pointer-events: none;
      animation: orbitPulse 18s ease-in-out infinite alternate;
    }

    .bg-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      opacity: 0.4;
      mix-blend-mode: screen;
      pointer-events: none;
      animation: gridDrift 40s linear infinite;
    }

    .bg-lines {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(120deg, rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(-120deg, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 220px 220px;
      opacity: 0.25;
      mix-blend-mode: screen;
      pointer-events: none;
      animation: linesDrift 60s linear infinite;
    }

    @keyframes orbitPulse { 0%{transform:scale(1)}100%{transform:scale(1.05)} }
    @keyframes gridDrift { 0%{transform:translate(0,0)}100%{transform:translate(-40px,-40px)} }
    @keyframes linesDrift { 0%{transform:translate(0,0)}100%{transform:translate(80px,40px)} }

    .page-shell {
      position: relative;
      z-index: 1;
      height: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .header {
      padding: 14px 20px;
      border-radius: 20px;
      background: var(--glass-strong);
      border: 1px solid rgba(255,153,0,0.3);
      box-shadow:
        0 0 40px rgba(0,0,0,0.9),
        inset 0 0 40px rgba(255,153,0,0.15);
      backdrop-filter: blur(18px);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left { display: flex; flex-direction: column; }
    .header-title {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--accent3);
    }
    .header-sub {
      font-size: 10px;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .header-nav {
      display: flex;
      gap: 16px;
      padding: 8px 16px;
      border-radius: 14px;
      background: rgba(255,153,0,0.08);
      border: 1px solid rgba(255,153,0,0.25);
      box-shadow:
        0 0 20px rgba(0,0,0,0.6),
        inset 0 0 20px rgba(255,153,0,0.12);
      backdrop-filter: blur(10px);
    }

    .header-nav a {
      text-decoration: none;
      font-size: 12px;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: var(--accent3);
      padding: 6px 8px;
      border-radius: 10px;
      transition: .2s;
    }

    .header-nav a:hover { background: rgba(255,153,0,0.2); color: #fff; }

    .content {
      flex: 1;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 20px;
      min-height: 0;
    }

    .panel {
      border-radius: 24px;
      background:
        radial-gradient(circle at 0 0, rgba(255,255,255,0.06) 0, transparent 55%),
        radial-gradient(circle at 100% 100%, rgba(255,153,0,0.18) 0, transparent 55%),
        var(--glass);
      border: 1px solid rgba(255,153,0,0.25);
      box-shadow:
        0 0 40px rgba(0,0,0,0.95),
        inset 0 0 40px rgba(255,153,0,0.15);
      backdrop-filter: blur(18px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 0;
    }

    .stream-title {
      padding: 14px 20px;
      font-size: 14px;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--accent3);
      background: rgba(0,0,0,0.35);
      border-bottom: 1px solid rgba(255,153,0,0.25);
      flex-shrink: 0;
    }

    .stream-box {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      overflow: hidden;
      flex-shrink: 0;
    }

    .stream-box video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .chat-title {
      padding: 14px 20px;
      font-size: 14px;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--accent3);
      background: rgba(0,0,0,0.35);
      border-bottom: 1px solid rgba(255,153,0,0.25);
      flex-shrink: 0;
    }

    .chat-box {
      flex: 1;
      background: #000;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 18px 18px 0 0;
    }

    .name-setup {
      padding: 12px;
      background: rgba(0,0,0,0.7);
      border-bottom: 1px solid rgba(255,153,0,0.25);
      display: flex;
      gap: 10px;
    }

    .name-setup input {
      flex: 1;
      padding: 10px;
      background: #111;
      border: 1px solid rgba(255,153,0,0.4);
      color: #fff;
      border-radius: 8px;
    }

    .name-setup button {
      padding: 10px 16px;
      background: var(--accent);
      border: none;
      color: #000;
      font-weight: 700;
      cursor: pointer;
      border-radius: 8px;
    }

    .bank-tabs {
      display: flex;
      gap: 10px;
      padding: 10px;
      background: rgba(0,0,0,0.65);
      border-bottom: 1px solid rgba(255,153,0,0.35);
    }

    .bank-tab {
      position: relative;
      padding: 8px 14px;
      background: rgba(255,153,0,0.15);
      border: 1px solid rgba(255,153,0,0.35);
      border-radius: 8px;
      color: var(--accent3);
      font-size: 12px;
      letter-spacing: .1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.2s;
    }

    .bank-tab:hover {
      background: rgba(255,153,0,0.25);
      transform: translateY(-6px);
      box-shadow:
        0 -6px 20px rgba(255,153,0,0.35),
        0 0 20px rgba(0,0,0,0.8);
    }

    .chat-messages {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      font-size: 13px;
      line-height: 1.5;
    }

    .chat-message {
      margin-bottom: 6px;
      color: #e5e5f5;
      word-break: break-word;
    }

    .chat-input {
      display: flex;
      gap: 10px;
      align-items: center;
      border-top: 1px solid rgba(255,153,0,0.35);
      background: rgba(0,0,0,0.85);
      padding: 10px;
    }

    .chat-input input[type="text"] {
      flex: 1;
      padding: 10px;
      background: transparent;
      border: none;
      color: #fff;
      outline: none;
    }

    .chat-input button {
      padding: 10px 16px;
      background: var(--accent);
      border: none;
      color: #000;
      font-weight: 700;
      cursor: pointer;
    }

    .chat-input button:hover { background: var(--accent2); color: #fff; }

    .chat-input label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--accent3);
      cursor: pointer;
      white-space: nowrap;
    }

    .chat-input input[type="checkbox"] {
      accent-color: var(--accent);
    }

    /* мобильный свайп-чат */
    @media (max-width: 900px) {
      .content {
        display: block;
      }

      .panel-stream {
        margin-bottom: 16px;
      }

      .panel-chat {
        position: fixed;
        top: 0;
        right: -100%;
        width: 100%;
        height: 100%;
        max-width: 100%;
        transition: right 0.3s ease;
        z-index: 9999;
      }

      .panel-chat.chat-open {
        right: 0;
      }

      .stream-box {
        width: 100%;
        aspect-ratio: 16 / 9;
      }
    }
  </style>
</head>
<body>

<div class="bg-orbit"></div>
<div class="bg-grid"></div>
<div class="bg-lines"></div>

<div class="page-shell">

  <header class="header">
    <div class="header-left">
      <div class="header-title">СайтСотика</div>
      <div class="header-sub">стрим · чатик · страницы</div>
    </div>

    <nav class="header-nav">
      <a href="#">Главная</a>
      <a href="#">Обо мне</a>
      <a href="#">Игры</a>
      <a href="#">Команда</a>
      <a href="#">Партнёры</a>
    </nav>
  </header>

  <main class="content">

    <section class="panel panel-stream">
      <div class="stream-title">стрим</div>

      <div class="stream-box">
        <video src="" controls></video>
      </div>
    </section>

    <section class="panel panel-chat">
      <div class="chat-title">чатиксотика</div>

      <div class="chat-box">

        <div id="nameSetup" class="name-setup" style="display:none;">
          <input id="nameInput" type="text" placeholder="Введите НИК или ИМЯ и ФАМИЛИЮ">
          <button onclick="saveName()">OK</button>
        </div>

        <div id="bankTabs" class="bank-tabs" style="display:none;">
          <div class="bank-tab">Сбер</div>
          <div class="bank-tab">Т‑Банк</div>
          <div class="bank-tab">ВТБ</div>
          <div class="bank-tab">ЮMoney</div>
        </div>

        <div class="chat-messages" id="chat"></div>

        <div class="chat-input">
          <label>
            <input type="checkbox" id="donateFlag" onchange="toggleBanks()">
            донат
          </label>

          <input id="msg" type="text" placeholder="Введите сообщение..." disabled />
          <button onclick="sendMsg()" disabled>OK</button>
        </div>
      </div>
    </section>

  </main>

</div>

<script>
let userName = localStorage.getItem("sotik_name");

function validateName(input) {
  input = input.trim().replace(/\s+/g, " ");
  const parts = input.split(" ");

  if (parts.length === 1 && parts[0].length >= 2) return input;
  if (parts.length === 2 && parts[0].length >= 2 && parts[1].length >= 2) return input;

  return null;
}

function saveName() {
  const input = document.getElementById("nameInput").value;
  const valid = validateName(input);

  if (!valid) return;

  localStorage.setItem("sotik_name", valid);

  document.getElementById("nameSetup").style.display = "none";
  document.getElementById("msg").disabled = false;
  document.querySelector(".chat-input button").disabled = false;
}

function toggleBanks() {
  const tabs = document.getElementById("bankTabs");
  const flag = document.getElementById("donateFlag");
  tabs.style.display = flag.checked ? "flex" : "none";
}

if (!userName) {
  document.getElementById("nameSetup").style.display = "flex";
} else {
  document.getElementById("msg").disabled = false;
  document.querySelector(".chat-input button").disabled = false;
}

function sendMsg() {
  const chat = document.getElementById("chat");
  const msg = document.getElementById("msg");

  const text = msg.value.trim();
  if (!text) return;

  const div = document.createElement("div");
  div.className = "chat-message";
  div.textContent = text;

  chat.appendChild(div);
  msg.value = "";
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById("msg").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMsg();
  }
});

/* свайп-чата на мобильных */
let startX = 0;
let endX = 0;

document.addEventListener("touchstart", e => {
  if (window.innerWidth > 900) return;
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  if (window.innerWidth > 900) return;
  endX = e.changedTouches[0].clientX;

  const chatPanel = document.querySelector(".panel-chat");
  if (!chatPanel) return;

  if (endX - startX > 80) {
    chatPanel.classList.add("chat-open");
  } else if (startX - endX > 80) {
    chatPanel.classList.remove("chat-open");
  }
});
</script>

</body>
</html>
