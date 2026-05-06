<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Privacy Policy — Photobooth Kawaii</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      @font-face {
        font-family: 'Puffberry';
        src: url('fonts/Puffberry.woff2') format('woff2'),
             url('fonts/Puffberry.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Perfect Lemonade';
        src: url('fonts/PerfectLemonade.woff2') format('woff2'),
             url('fonts/PerfectLemonade.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      :root {
        --font-display: 'Puffberry', 'Baloo 2', cursive;
        --font-body: 'Perfect Lemonade', 'Nunito', sans-serif;
        --pink: #ff9ec8;
        --pink-deep: #ff6ba8;
        --red: #e8304a;
        --red-deep: #c0203a;
        --jam: #c8183a;
        --jam-light: #f25070;
        --cream: #fff5f0;
        --white: #fffefd;
        --brown: #4a3728;
        --gray: #6b5a52;
      }

      /* ===== RESET & BASE ===== */
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        font-family: var(--font-body);
        background: linear-gradient(160deg, #fff0f4 0%, #ffe4ec 40%, #ffd6e8 70%, #ffe8f0 100%);
        min-height: 100vh;
        overflow-x: hidden;
        padding-bottom: 0;
      }

      /* ===== HEADER ===== */
      .site-header {
        position: sticky;
        top: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: .6rem 1.8rem;
        background: linear-gradient(135deg, #ffb8d4 0%, #ffd4e8 50%, #ffb8d4 100%);
        box-shadow: 0 4px 20px rgba(255,100,168,.22), 0 1px 0 rgba(255,255,255,.6) inset;
        border-bottom: 3px solid rgba(255,150,180,.35);
        backdrop-filter: blur(8px);
        overflow: hidden;
      }
      .cloud-puff {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,.45);
        pointer-events: none;
      }
      .cloud-puff-1 { width: 80px; height: 40px; top: -10px; left: 10%; border-radius: 50px; }
      .cloud-puff-2 { width: 60px; height: 30px; top: -8px; left: 30%; border-radius: 50px; }
      .cloud-puff-3 { width: 100px; height: 45px; top: -12px; right: 15%; border-radius: 50px; }

      .logo {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 1;
        flex-shrink: 0;
      }
      .logo-top {
        font-family: var(--font-display);
        font-size: clamp(.85rem, 2.5vw, 1.1rem);
        color: #fff;
        text-shadow: 1px 2px 0 rgba(200,80,120,.4);
        letter-spacing: .04em;
        display: flex;
        align-items: center;
        gap: .3em;
      }
      .logo-bottom {
        font-family: var(--font-display);
        font-size: clamp(1.2rem, 3.5vw, 1.65rem);
        color: #fff;
        text-shadow: 2px 3px 0 rgba(200,80,120,.4), 0 0 18px rgba(255,200,220,.5);
        letter-spacing: .06em;
      }
      .logo .bow { font-size: .9em; }

      .site-nav { margin-left: auto; }
      .nav-main {
        list-style: none;
        display: flex;
        gap: .2rem;
        flex-wrap: wrap;
      }
      .nav-main a {
        font-family: var(--font-body);
        font-weight: 700;
        font-size: .88rem;
        color: #7a3050;
        text-decoration: none;
        padding: .38rem .8rem;
        border-radius: 999px;
        transition: background .2s, color .2s, transform .15s;
        white-space: nowrap;
        letter-spacing: .02em;
      }
      .nav-main a:hover,
      .nav-main a[aria-current="page"] {
        background: rgba(255,255,255,.55);
        color: #c0204a;
        transform: translateY(-1px);
      }
      .header-bow {
        font-size: 1.5rem;
        flex-shrink: 0;
        animation: bowBounce 2.5s ease-in-out infinite;
      }
      @keyframes bowBounce {
        0%, 100% { transform: rotate(-8deg) scale(1); }
        50%       { transform: rotate(8deg) scale(1.12); }
      }

      /* Hamburger */
      .hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: .4rem;
        margin-left: .5rem;
        flex-shrink: 0;
      }
      .hamburger span {
        display: block;
        width: 24px;
        height: 3px;
        background: #c0204a;
        border-radius: 3px;
        transition: transform .3s, opacity .3s;
      }
      .hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
      .hamburger.open span:nth-child(2) { opacity: 0; }
      .hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

      @media (max-width: 680px) {
        .hamburger { display: flex; }
        .site-nav {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #ffb8d4, #ffd4e8);
          padding: 1rem;
          box-shadow: 0 8px 20px rgba(200,80,120,.2);
        }
        .site-nav.open { display: block; }
        .nav-main { flex-direction: column; gap: .3rem; }
        .nav-main a { display: block; text-align: center; }
      }

      /* ===== JAM SPREAD BACKGROUND ===== */
      .jam-spread-wrap {
        position: relative;
        padding: 3rem 1.5rem 4rem;
        overflow: hidden;
      }

      .jam-blob {
        position: absolute;
        pointer-events: none;
        z-index: 0;
        opacity: .18;
      }
      .jam-blob-1 { top: -40px; left: -60px; width: 420px; }
      .jam-blob-2 { top: 30%; right: -80px; width: 380px; }
      .jam-blob-3 { bottom: 5%; left: -50px; width: 340px; }

      .jam-seed {
        position: absolute;
        width: 6px;
        height: 10px;
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        background: #8b1a2a;
        pointer-events: none;
        z-index: 0;
        opacity: .22;
      }

      .sb-float {
        position: absolute;
        font-size: 1.8rem;
        pointer-events: none;
        z-index: 0;
        opacity: .28;
        animation: floatDrift var(--dur, 5s) ease-in-out infinite;
        animation-delay: var(--delay, 0s);
      }
      @keyframes floatDrift {
        0%, 100% { transform: translateY(0) rotate(var(--r0, -6deg)); }
        50%       { transform: translateY(-18px) rotate(var(--r1, 6deg)); }
      }

      /* ===== PAGE HERO ===== */
      .page-hero {
        position: relative;
        z-index: 2;
        text-align: center;
        margin-bottom: 3rem;
      }
      .page-hero h1 {
        font-family: var(--font-display);
        font-size: clamp(2.4rem, 7vw, 4.2rem);
        color: #c0183a;
        text-shadow: 3px 4px 0 rgba(255,255,255,.8), 0 0 28px rgba(255,80,120,.3);
        letter-spacing: .04em;
        line-height: 1.1;
        margin-bottom: .6rem;
      }
      .page-hero .hero-sub {
        font-family: var(--font-body);
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        color: #7a3050;
        font-weight: 600;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
      }
      .hero-emoji-row {
        font-size: 2rem;
        margin-bottom: .75rem;
        display: flex;
        justify-content: center;
        gap: .6rem;
        animation: heroRow 3s ease-in-out infinite;
      }
      @keyframes heroRow {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-6px); }
      }
      .privacy-date {
        font-family: var(--font-body);
        font-size: .85rem;
        color: #b07090;
        font-weight: 600;
        margin-top: .5rem;
      }

      /* ===== CONTENT WRAPPER ===== */
      .privacy-content {
        max-width: 820px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 2.2rem;
      }

      /* ===== JAM CARD ===== */
      .jam-card {
        background: rgba(255, 252, 250, 0.88);
        border-radius: 28px;
        padding: 2.2rem 2.4rem;
        box-shadow:
          0 6px 32px rgba(200, 50, 80, .12),
          0 2px 0 rgba(255,255,255,.9) inset,
          0 -2px 0 rgba(200,80,100,.08) inset;
        border: 2px solid rgba(255,160,180,.3);
        position: relative;
        overflow: hidden;
        transition: transform .25s, box-shadow .25s;
      }
      .jam-card:hover {
        transform: translateY(-3px);
        box-shadow:
          0 10px 42px rgba(200, 50, 80, .18),
          0 2px 0 rgba(255,255,255,.9) inset;
      }
      .jam-card::before {
        content: '';
        position: absolute;
        top: -20px; right: -20px;
        width: 100px; height: 100px;
        background: radial-gradient(circle at 30% 30%, rgba(220,30,60,.18), transparent 70%);
        border-radius: 50%;
        pointer-events: none;
      }
      .jam-card::after {
        content: '';
        position: absolute;
        bottom: -15px; left: -15px;
        width: 80px; height: 80px;
        background: radial-gradient(circle at 60% 60%, rgba(220,30,60,.13), transparent 70%);
        border-radius: 50%;
        pointer-events: none;
      }

      .card-heading {
        font-family: var(--font-display);
        font-size: clamp(1.4rem, 3.5vw, 1.9rem);
        color: #c0183a;
        letter-spacing: .03em;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: .5rem;
        line-height: 1.2;
      }
      .card-heading .icon { font-size: 1.4em; flex-shrink: 0; }

      .card-text {
        font-family: var(--font-body);
        font-size: clamp(1rem, 2vw, 1.08rem);
        color: #5a3040;
        line-height: 1.85;
        font-weight: 600;
      }
      .card-text + .card-text { margin-top: 1rem; }

      /* Sub-list within cards */
      .jam-list {
        list-style: none;
        margin-top: 1.1rem;
        display: flex;
        flex-direction: column;
        gap: .65rem;
      }
      .jam-list li {
        font-family: var(--font-body);
        font-size: clamp(.98rem, 2vw, 1.06rem);
        color: #5a3040;
        font-weight: 600;
        line-height: 1.6;
        padding-left: 1.8rem;
        position: relative;
      }
      .jam-list li::before {
        content: '🍓';
        position: absolute;
        left: 0; top: 0;
        font-size: .95em;
      }

      /* Negative list (things we DON'T do) */
      .jam-list-no li::before { content: '🔒'; }

      /* ===== INTRO CARD ===== */
      .intro-card {
        background: linear-gradient(135deg, rgba(255,80,100,.08) 0%, rgba(255,200,220,.18) 50%, rgba(255,80,100,.06) 100%);
        border: 2.5px solid rgba(220,50,80,.2);
        border-radius: 28px;
        padding: 2.4rem 2.6rem;
        text-align: center;
        position: relative;
        z-index: 2;
        overflow: hidden;
      }
      .intro-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(255,252,250,.6);
        border-radius: 26px;
        z-index: -1;
      }
      .intro-lead {
        font-family: var(--font-body);
        font-size: clamp(1.05rem, 2.5vw, 1.18rem);
        color: #5a2838;
        line-height: 1.9;
        font-weight: 600;
        max-width: 700px;
        margin: 0 auto;
      }

      /* ===== DIVIDER ===== */
      .jam-divider {
        display: flex;
        align-items: center;
        gap: 1rem;
        position: relative;
        z-index: 2;
      }
      .jam-divider::before,
      .jam-divider::after {
        content: '';
        flex: 1;
        height: 3px;
        background: linear-gradient(90deg, transparent, rgba(200,30,60,.3), transparent);
        border-radius: 3px;
      }
      .jam-divider-icon { font-size: 1.6rem; }

      /* ===== SIDE DECORATIONS ===== */
      .side-strawberry {
        position: fixed;
        pointer-events: none;
        z-index: 0;
        font-size: 3.5rem;
        opacity: .08;
        animation: sideBob 6s ease-in-out infinite;
      }
      .side-strawberry.left  { left: 1.5rem; top: 35%; animation-delay: 0s; }
      .side-strawberry.right { right: 1.5rem; top: 55%; animation-delay: 2s; }
      @keyframes sideBob {
        0%, 100% { transform: translateY(0) rotate(-8deg); }
        50%       { transform: translateY(-20px) rotate(8deg); }
      }

      /* ===== JAM SPREAD SVG EDGES ===== */
      .jam-spread-top {
        width: 100%; overflow: hidden; line-height: 0;
        pointer-events: none; margin-bottom: -4px;
        position: relative; z-index: 1;
      }
      .jam-spread-bottom {
        width: 100%; overflow: hidden; line-height: 0;
        pointer-events: none; margin-top: -4px;
        position: relative; z-index: 1;
      }

      /* ===== FOOTER ===== */
      .site-footer {
        background: linear-gradient(135deg, #ffb8d4 0%, #ffc8dc 50%, #ffb0d0 100%);
        border-top: 3px solid rgba(255,150,180,.3);
        box-shadow: 0 -4px 20px rgba(200,80,130,.12);
        padding: 2.5rem 1.5rem 2rem;
        margin-top: 5rem;
      }
      .footer-inner {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.2rem;
        text-align: center;
      }
      .footer-brand { display: flex; align-items: center; gap: 1rem; }
      .footer-brand-icon { font-size: 2rem; color: #e0507a; line-height: 1; }
      .footer-brand .name {
        font-family: var(--font-display);
        font-size: 1.5rem;
        color: #7a2040;
        letter-spacing: .04em;
        line-height: 1.1;
        text-shadow: 1px 2px 0 rgba(255,255,255,.5);
      }
      .footer-brand .sub {
        font-family: var(--font-body);
        font-size: .9rem;
        color: #a04060;
        font-weight: 600;
      }
      .footer-divider {
        width: 100%; height: 2px;
        background: linear-gradient(90deg, transparent, rgba(200,80,120,.25), transparent);
        border-radius: 2px;
      }
      .footer-divider2 {
        width: 60%; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(200,80,120,.15), transparent);
      }
      .footer-socials { display: flex; gap: 1rem; }
      .footer-socials a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px; height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,.5);
        color: #c0204a;
        font-size: 1.1rem;
        font-weight: 700;
        text-decoration: none;
        border: 2px solid rgba(200,80,120,.2);
        transition: background .2s, transform .2s;
      }
      .footer-socials a:hover { background: rgba(255,255,255,.85); transform: scale(1.12); }
      .copyright {
        font-family: var(--font-body);
        font-size: .82rem;
        color: #a05070;
        font-weight: 600;
        line-height: 1.6;
      }

      /* ===== RESPONSIVE ===== */
      @media (max-width: 540px) {
        .jam-card { padding: 1.6rem 1.4rem; }
        .intro-card { padding: 1.8rem 1.4rem; }
        .jam-spread-wrap { padding: 2rem 1rem 3rem; }
      }
    </style>
  </head>
  <body>

    <!-- Fixed side strawberries -->
    <span class="side-strawberry left">🍓</span>
    <span class="side-strawberry right">🍓</span>

    <!-- ===== HEADER ===== -->
    <header class="site-header">
      <span class="cloud-puff cloud-puff-1" aria-hidden="true"></span>
      <span class="cloud-puff cloud-puff-2" aria-hidden="true"></span>
      <span class="cloud-puff cloud-puff-3" aria-hidden="true"></span>
      <a href="index.html" class="logo">
        <span class="logo-top"><span class="bow">🎀</span> photobooth <span class="bow">🎀</span></span>
        <span class="logo-bottom">kawaii</span>
      </a>
      <nav class="site-nav" id="siteNav" aria-label="Main">
        <ul class="nav-main">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="photobooth.html">Photobooth</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="privacy.html" aria-current="page">Privacy Policy</a></li>
        </ul>
      </nav>
      <span class="header-bow" aria-hidden="true">🎀</span>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </header>

    <!-- ===== JAM SPREAD TOP EDGE ===== -->
    <div class="jam-spread-top" aria-hidden="true">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,60 C120,20 240,80 360,45 C480,10 600,75 720,40 C840,5 960,70 1080,38 C1200,8 1320,65 1440,35 L1440,0 L0,0 Z"
          fill="rgba(220,30,60,0.08)"/>
        <path d="M0,70 C180,30 300,85 480,52 C660,18 780,78 960,50 C1140,22 1300,72 1440,48 L1440,0 L0,0 Z"
          fill="rgba(200,20,50,0.06)"/>
      </svg>
    </div>

    <main>
      <div class="jam-spread-wrap">

        <!-- Background jam blobs -->
        <svg class="jam-blob jam-blob-1" viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M200,20 C280,10 370,80 380,170 C390,260 320,350 220,370 C120,390 30,320 20,220 C10,120 60,40 200,20 Z" fill="#c8183a"/>
        </svg>
        <svg class="jam-blob jam-blob-2" viewBox="0 0 380 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M180,15 C260,5 355,75 365,165 C375,255 305,345 205,360 C105,375 20,310 15,210 C5,110 55,30 180,15 Z" fill="#c8183a"/>
        </svg>
        <svg class="jam-blob jam-blob-3" viewBox="0 0 340 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M160,12 C230,4 315,65 322,148 C330,230 268,308 176,318 C88,328 14,270 10,184 C4,96 48,22 160,12 Z" fill="#c8183a"/>
        </svg>

        <!-- Floating seeds -->
        <div class="jam-seed" style="top:8%;  left:6%;  transform:rotate(22deg)"></div>
        <div class="jam-seed" style="top:15%; left:12%; transform:rotate(-15deg)"></div>
        <div class="jam-seed" style="top:22%; right:8%; transform:rotate(35deg)"></div>
        <div class="jam-seed" style="top:38%; right:5%; transform:rotate(-20deg)"></div>
        <div class="jam-seed" style="top:55%; left:4%; transform:rotate(10deg)"></div>
        <div class="jam-seed" style="top:65%; right:10%;transform:rotate(45deg)"></div>
        <div class="jam-seed" style="top:78%; left:9%; transform:rotate(-30deg)"></div>
        <div class="jam-seed" style="top:88%; right:7%; transform:rotate(18deg)"></div>

        <!-- Floating strawberry emojis -->
        <span class="sb-float" style="top:5%;  left:3%;  --dur:6s; --delay:0s;   --r0:-8deg;  --r1:6deg">🍓</span>
        <span class="sb-float" style="top:28%; right:3%; --dur:7s; --delay:1.5s; --r0:6deg;   --r1:-8deg">🍓</span>
        <span class="sb-float" style="top:62%; left:2%;  --dur:5.5s;--delay:3s;  --r0:-5deg;  --r1:9deg">🍓</span>
        <span class="sb-float" style="top:82%; right:2%; --dur:6.5s;--delay:0.8s;--r0:9deg;   --r1:-5deg">🍓</span>

        <!-- ===== PAGE HERO ===== -->
        <header class="page-hero">
          <div class="hero-emoji-row" aria-hidden="true">🔒 🍓 ✨ 🍓 🔒</div>
          <h1>Privacy Policy</h1>
          <p class="hero-sub">your privacy is safe with us — always ♡</p>
          <p class="privacy-date">Last updated: January 2025</p>
        </header>

        <!-- ===== CONTENT ===== -->
        <div class="privacy-content">

          <!-- INTRO CARD -->
          <div class="intro-card">
            <p class="intro-lead">
              At <strong>Photobooth Kawaii</strong>, we prioritize your privacy by design. Our platform is built to function without collecting, storing, or transmitting your personal data. This Privacy Policy explains in detail how your information is handled when you access and use our website. By using Photobooth Kawaii, you agree to the practices described below. 💖
            </p>
          </div>

          <div class="jam-divider" aria-hidden="true">
            <span class="jam-divider-icon">🍓</span>
          </div>

          <!-- 1. CAMERA ACCESS -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">📸</span> 1. Camera Access</h2>
            <p class="card-text">
              Photobooth Kawaii requires access to your device's camera solely to provide the core photobooth functionality. This permission is requested through your browser and can be granted or denied at your discretion.
            </p>
            <p class="card-text">Camera access is used under the following conditions:</p>
            <ul class="jam-list">
              <li>It is activated only when you explicitly allow it</li>
              <li>It operates entirely within your browser environment</li>
              <li>It is used in real time for preview and capture purposes only</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">At no point do we:</p>
            <ul class="jam-list jam-list-no">
              <li>Record or store your camera feed</li>
              <li>Transmit your camera data to external servers</li>
              <li>Retain access to your camera beyond your active session</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">
              All processing occurs locally on your device, ensuring that your visual data remains private and inaccessible to us or any third party.
            </p>
          </div>

          <!-- 2. PHOTOS & LOCAL DATA -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">🖼️</span> 2. Photos & Local Data Storage</h2>
            <p class="card-text">Photobooth Kawaii is designed so that all photo data remains fully under your control.</p>
            <p class="card-text">When you take photos:</p>
            <ul class="jam-list">
              <li>Images are temporarily stored within your browser session memory</li>
              <li>These images are not written to any external database or server</li>
              <li>Closing, refreshing, or navigating away from the page permanently deletes all session-stored photos</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">If you choose to download your photos:</p>
            <ul class="jam-list">
              <li>Files are saved directly to your device using your browser's download functionality</li>
              <li>No copies are sent to or retained by Photobooth Kawaii</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">
              We do not provide cloud storage, backups, or remote access to your photos. Your images are never exposed beyond your own device unless you choose to share them independently.
            </p>
          </div>

          <!-- 3. COOKIES & TRACKING -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">🍪</span> 3. Cookies & Tracking Technologies</h2>
            <p class="card-text">Photobooth Kawaii minimizes the use of cookies and tracking technologies to protect your browsing privacy.</p>
            <p class="card-text">Our practices include:</p>
            <ul class="jam-list jam-list-no">
              <li>No use of advertising or behavioral tracking cookies</li>
              <li>No cross-site tracking or fingerprinting techniques</li>
              <li>No collection of personally identifiable information through tracking tools</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">
              We may utilize limited, privacy-conscious analytics to measure general site performance, such as page visits or feature usage. These analytics are aggregated and anonymized, do not identify individual users, and are used exclusively to improve functionality and your experience.
            </p>
          </div>

          <!-- 4. THIRD-PARTY SERVICES -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">🌐</span> 4. Third-Party Services</h2>
            <p class="card-text">Photobooth Kawaii integrates a small number of external services to enhance visual presentation and usability:</p>
            <ul class="jam-list">
              <li>Google Fonts for typography</li>
              <li>Font Awesome for icons and visual elements</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">
              These services are delivered via Content Delivery Networks (CDNs), which may automatically process technical information such as your IP address, browser type, or device info as part of standard internet operations. This is outside our direct control. We recommend reviewing the privacy policies of these providers for full details.
            </p>
          </div>

          <!-- 5. DATA SECURITY -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">🛡️</span> 5. Data Security</h2>
            <p class="card-text">
              Although Photobooth Kawaii does not collect or store personal data, we still take reasonable measures to ensure a secure browsing environment:
            </p>
            <ul class="jam-list">
              <li>Using standard web technologies designed to prevent unauthorized data access</li>
              <li>Limiting external integrations to trusted providers</li>
              <li>Ensuring that all core functionality runs locally within your browser</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">
              Because no personal data is transmitted or stored, the risk of data breaches related to user content is significantly reduced.
            </p>
          </div>

          <!-- 6. USER CONTROL -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">✨</span> 6. User Control & Responsibility</h2>
            <p class="card-text">You retain full control over your interaction with Photobooth Kawaii. You are responsible for:</p>
            <ul class="jam-list">
              <li>Granting or denying camera permissions</li>
              <li>Managing any downloaded photos on your device</li>
              <li>Deciding whether to share your images externally</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">
              Because all data remains local, any sharing or storage outside the platform is entirely at your discretion.
            </p>
          </div>

          <!-- 7. CHANGES -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">📝</span> 7. Changes to This Privacy Policy</h2>
            <p class="card-text">
              This Privacy Policy may be updated periodically to reflect changes in functionality, legal requirements, or operational practices. When updates occur, the revision date at the top of this page will be updated accordingly. Continued use of the website constitutes acceptance of the updated policy.
            </p>
            <p class="card-text">
              We encourage you to review this page from time to time to stay informed of any changes. 💕
            </p>
          </div>

          <!-- 8. CONTACT -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">💌</span> 8. Contact</h2>
            <p class="card-text">
              If you have questions, concerns, or requests related to this Privacy Policy, you may reach out to us through our <a href="contact.html" style="color:#c0183a;font-weight:700;text-decoration:underline">Contact</a> page. We are committed to providing clear and transparent information regarding your privacy.
            </p>
          </div>

          <div class="jam-divider" aria-hidden="true">
            <span class="jam-divider-icon">🍓</span>
          </div>

        </div><!-- /.privacy-content -->
      </div><!-- /.jam-spread-wrap -->
    </main>

    <!-- ===== JAM SPREAD BOTTOM EDGE ===== -->
    <div class="jam-spread-bottom" aria-hidden="true">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,20 C180,60 300,10 480,45 C660,80 780,15 960,50 C1140,80 1300,18 1440,42 L1440,80 L0,80 Z"
          fill="rgba(220,30,60,0.07)"/>
        <path d="M0,35 C120,70 260,15 420,48 C580,82 720,22 900,55 C1080,82 1260,25 1440,55 L1440,80 L0,80 Z"
          fill="rgba(200,20,50,0.05)"/>
      </svg>
    </div>

    <!-- ===== FOOTER ===== -->
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-brand-icon">&#9825;</div>
          <div>
            <div class="name">photobooth kawaii</div>
            <div class="sub">cute moments, forever &#9825;</div>
          </div>
        </div>
        <div class="footer-divider" aria-hidden="true"></div>
        <div class="footer-socials">
          <a href="#" aria-label="Instagram">&#128247;</a>
          <a href="#" aria-label="TikTok">&#127925;</a>
          <a href="#" aria-label="Twitter">&#128038;</a>
        </div>
        <div class="footer-divider2" aria-hidden="true"></div>
        <p class="copyright">&copy; 2026 Photobooth Kawaii. All rights reserved. ♡</p>
      </div>
    </footer>

    <script>
      (function () {
        const btn = document.getElementById('hamburger');
        const nav = document.getElementById('siteNav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function () {
          const open = nav.classList.toggle('open');
          btn.classList.toggle('open', open);
          btn.setAttribute('aria-expanded', open);
        });
      })();
    </script>
  </body>
</html>
