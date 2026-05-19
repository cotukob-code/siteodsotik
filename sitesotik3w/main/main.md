# Описание файла `index.html` в папке `main`

Этот файл представляет собой главную страницу сайта `СайтСотика`, сочетающую в себе онлайн-стрим, чат и систему донатов. Страница выполнена в тёмной теме с градиентами, стеклянными панелями и анимированным фоном.

## Структура и функционал

### 1. Общие настройки
- **Кодировка**: UTF-8
- **Язык**: русский (`ru`)
- **Адаптивность**: поддержка мобильных устройств через `viewport`

### 2. Стили и дизайн
- Используются CSS-переменные (`:root`) для цветов и эффектов:
  - `--bg`: основной фон
  - `--accent`: акцентный оранжевый цвет
  - `--accent2`: более тёмный оранжевый
  - `--accent3`: светлый оранжевый для текста
  - `--muted`: приглушённый цвет для второстепенного текста
  - `--glass`: полупрозрачные стеклянные панели
  - `--glass-strong`: более плотное стекло для шапки
- Фоновые эффекты:
  - `bg-orbit`: пульсирующие радиальные градиенты по углам
  - `bg-grid`: анимированная сетка
  - `bg-lines`: диагональные линии
- Анимации: `orbitPulse`, `gridDrift`, `linesDrift`

### 3. Верстка
- **Шапка (`header`)**: содержит логотип "СайтСотика" и навигационное меню
- **Контент (`content`)**: двухколоночная сетка:
  - Левая колонка: плеер стрима (видео)
  - Правая колонка: онлайн-чат

### 4. Онлайн-чат
- **Ввод имени**: при первом посещении пользователь вводит имя, которое сохраняется в `localStorage`
- **Отправка сообщений**: через поле ввода с поддержкой Enter
- **Сообщения**: отображаются в `chat-messages`, имя пользователя выделяется жирным

### 5. Система донатов
- **Флаг доната**: чекбокс, при активации показывает выбор банка
- **Банки**: Сбер, Т‑Банк, ВТБ, ЮMoney
- **Генерация QR-кодов**: через `api.qrserver.com`
- **ЮMoney**: динамическая форма с вводом суммы и генерацией ссылки оплаты

### 6. Мобильная адаптация
- На экранах < 900px чат становится модальным окном, выезжающим справа
- Управление через свайпы (влево/вправо)

## Полный код `index.html`

```html
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
      display: none;
      gap: 10px;
      padding: 6px 10px 0;
      background: rgba(0,0,0,0.85);
      border-top: 1px solid rgba(255,153,0,0.35);
    }

    .bank-tab {
      position: relative;
      padding: 6px 12px;
      background: rgba(255,153,0,0.15);
      border: 1px solid rgba(255,153,0,0.35);
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      color: var(--accent3);
      font-size: 11px;
      letter-spacing: .1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.2s;
    }

    .bank-tab:hover {
      background: rgba(255,153,0,0.25);
      transform: translateY(-6px);
      box-shadow:
        0 -8px 20px rgba(255,153,0,0.35),
        0 0 20px rgba(0,0,0,0.8);
    }

    #donateContent {
      display: none;
      background: #000;
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