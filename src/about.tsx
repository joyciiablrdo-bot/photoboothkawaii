 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About — Photobooth Kawaii</title>
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

      /* ===== HEADER (matches polaroid/photostrip) ===== */
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
      /* cloud puff decorations in header */
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

      /* ===== STRAWBERRY JAM SPREAD BACKGROUND ===== */
      .jam-spread-wrap {
        position: relative;
        padding: 3rem 1.5rem 4rem;
        overflow: hidden;
      }

      /* Big SVG jam blobs in background */
      .jam-blob {
        position: absolute;
        pointer-events: none;
        z-index: 0;
        opacity: .18;
      }
      .jam-blob-1 { top: -40px; left: -60px; width: 420px; }
      .jam-blob-2 { top: 30%; right: -80px; width: 380px; }
      .jam-blob-3 { bottom: 5%; left: -50px; width: 340px; }

      /* Drizzle lines simulating jam streaks */
      .jam-drip {
        position: absolute;
        pointer-events: none;
        z-index: 0;
        opacity: .13;
      }

      /* Floating seeds */
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

      /* Small strawberry floats */
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

      /* ===== CONTENT WRAPPER ===== */
      .about-content {
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

      /* jam smear accent on card corner */
      .jam-card::before {
        content: '';
        position: absolute;
        top: -20px;
        right: -20px;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle at 30% 30%, rgba(220,30,60,.18), transparent 70%);
        border-radius: 50%;
        pointer-events: none;
      }
      .jam-card::after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: -15px;
        width: 80px;
        height: 80px;
        background: radial-gradient(circle at 60% 60%, rgba(220,30,60,.13), transparent 70%);
        border-radius: 50%;
        pointer-events: none;
      }

      /* Section heading inside card */
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
      .card-heading .icon {
        font-size: 1.4em;
        flex-shrink: 0;
      }

      .card-text {
        font-family: var(--font-body);
        font-size: clamp(1rem, 2vw, 1.08rem);
        color: #5a3040;
        line-height: 1.85;
        font-weight: 600;
      }
      .card-text + .card-text {
        margin-top: 1rem;
      }

      /* Bullet list */
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
        left: 0;
        top: 0;
        font-size: .95em;
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

      /* ===== INTRO CARD (wide highlight) ===== */
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

      /* ===== CTA ROW ===== */
      .cta-row {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        position: relative;
        z-index: 2;
        margin-top: .5rem;
      }
      .cta-btn {
        font-family: var(--font-body);
        font-weight: 700;
        font-size: 1rem;
        text-decoration: none;
        padding: .8rem 2rem;
        border-radius: 999px;
        letter-spacing: .03em;
        transition: transform .2s, box-shadow .2s;
        display: inline-flex;
        align-items: center;
        gap: .5rem;
      }
      .cta-btn-primary {
        background: linear-gradient(135deg, #e8304a, #c0203a);
        color: #fff;
        box-shadow: 0 4px 18px rgba(200,30,60,.35), 0 2px 0 rgba(255,255,255,.25) inset;
      }
      .cta-btn-primary:hover {
        transform: translateY(-3px) scale(1.04);
        box-shadow: 0 8px 28px rgba(200,30,60,.45);
      }
      .cta-btn-secondary {
        background: rgba(255,255,255,.75);
        color: #c0203a;
        border: 2px solid rgba(200,50,80,.25);
        box-shadow: 0 3px 12px rgba(200,30,60,.12);
      }
      .cta-btn-secondary:hover {
        background: rgba(255,255,255,.95);
        transform: translateY(-3px) scale(1.04);
        box-shadow: 0 6px 20px rgba(200,30,60,.18);
      }

      /* ===== JAM SPREAD SVG DECORATION ===== */
      .jam-spread-top {
        width: 100%;
        overflow: hidden;
        line-height: 0;
        pointer-events: none;
        margin-bottom: -4px;
        position: relative;
        z-index: 1;
      }
      .jam-spread-bottom {
        width: 100%;
        overflow: hidden;
        line-height: 0;
        pointer-events: none;
        margin-top: -4px;
        position: relative;
        z-index: 1;
      }

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

      /* ===== FOOTER (matches polaroid/photostrip) ===== */
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
      .footer-brand {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .footer-brand-icon {
        font-size: 2rem;
        color: #e0507a;
        line-height: 1;
      }
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
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(200,80,120,.25), transparent);
        border-radius: 2px;
      }
      .footer-divider2 {
        width: 60%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(200,80,120,.15), transparent);
      }
      .footer-socials {
        display: flex;
        gap: 1rem;
      }
      .footer-socials a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,.5);
        color: #c0204a;
        font-size: 1.1rem;
        font-weight: 700;
        text-decoration: none;
        border: 2px solid rgba(200,80,120,.2);
        transition: background .2s, transform .2s;
      }
      .footer-socials a:hover {
        background: rgba(255,255,255,.85);
        transform: scale(1.12);
      }
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
          <li><a href="about.html" aria-current="page">About</a></li>
          <li><a href="photobooth.html">Photobooth</a></li>
          
          <li><a href="contact.html">Contact</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
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

        <!-- Floating seeds scattered around -->
        <div class="jam-seed" style="top:8%;  left:6%;  transform:rotate(22deg)"></div>
        <div class="jam-seed" style="top:15%; left:12%; transform:rotate(-15deg)"></div>
        <div class="jam-seed" style="top:22%; right:8%; transform:rotate(35deg)"></div>
        <div class="jam-seed" style="top:38%; right:5%; transform:rotate(-20deg)"></div>
        <div class="jam-seed" style="top:55%; left:4%; transform:rotate(10deg)"></div>
        <div class="jam-seed" style="top:65%; right:10%;transform:rotate(45deg)"></div>
        <div class="jam-seed" style="top:78%; left:9%; transform:rotate(-30deg)"></div>
        <div class="jam-seed" style="top:88%; right:7%; transform:rotate(18deg)"></div>
        <div class="jam-seed" style="top:12%; left:90%; transform:rotate(28deg)"></div>
        <div class="jam-seed" style="top:48%; left:92%; transform:rotate(-12deg)"></div>
        <div class="jam-seed" style="top:72%; left:88%; transform:rotate(40deg)"></div>

        <!-- Floating strawberry emojis (super subtle) -->
        <span class="sb-float" style="top:5%;  left:3%;  --dur:6s; --delay:0s;   --r0:-8deg;  --r1:6deg">🍓</span>
        <span class="sb-float" style="top:28%; right:3%; --dur:7s; --delay:1.5s; --r0:6deg;   --r1:-8deg">🍓</span>
        <span class="sb-float" style="top:62%; left:2%;  --dur:5.5s;--delay:3s;  --r0:-5deg;  --r1:9deg">🍓</span>
        <span class="sb-float" style="top:82%; right:2%; --dur:6.5s;--delay:0.8s;--r0:9deg;   --r1:-5deg">🍓</span>

        <!-- ===== PAGE HERO ===== -->
        <header class="page-hero">
          <div class="hero-emoji-row" aria-hidden="true">📸 🍓 ✨ 🍓 📸</div>
          <h1>About Photobooth Kawaii</h1>
          <p class="hero-sub">
            a soft, happy little world where memories are captured in the cutest way possible ♡
          </p>
        </header>

        <!-- ===== CONTENT ===== -->
        <div class="about-content">

          <!-- INTRO CARD -->
          <div class="intro-card">
            <p class="intro-lead">
              What started as a simple idea — making photos more fun — turned into a full experience built around charm, creativity, and self-expression. Inspired by the playful and heartwarming spirit of kawaii culture, we designed a photobooth that feels light, colorful, and full of personality from the very first click. Here, taking photos isn't just about capturing how you look — it's about capturing how the moment feels. 💖
            </p>
          </div>

          <div class="jam-divider" aria-hidden="true">
            <span class="jam-divider-icon">🍓</span>
          </div>

          <!-- OUR STORY -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">💖</span> Our Story</h2>
            <p class="card-text">
              We believe that the best memories aren't always the big, dramatic ones. Sometimes, it's the quiet laughs, the random selfies, the "just because" moments with friends, or the little dates that mean the most.
            </p>
            <p class="card-text">
              Photobooth Kawaii was created for those moments. We wanted a space where anyone can instantly turn a simple photo into something special — something you'd want to keep, share, or even look back on years from now and smile.
            </p>
          </div>

          <!-- WHAT MAKES IT SPECIAL -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">🎀</span> What Makes It Special</h2>
            <p class="card-text">
              Our photobooth is designed to be simple, but never boring. From soft pastel tones to playful designs, every detail is made to bring out that cozy, cute feeling. You'll find:
            </p>
            <ul class="jam-list">
              <li>Unique kawaii-inspired frames, each with its own personality</li>
              <li>Thoughtfully designed layouts that make every shot feel polished</li>
              <li>A smooth, easy-to-use camera experience — no stress, just fun</li>
              <li>Photo strips that feel like little souvenirs you can keep forever</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">
              Everything is made to feel light, creative, and effortlessly enjoyable.
            </p>
          </div>

          <!-- MADE FOR EVERY MOMENT -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">🌸</span> Made for Every Kind of Moment</h2>
            <p class="card-text">
              Photobooth Kawaii fits right into all the little (and big) moments in your life:
            </p>
            <ul class="jam-list">
              <li>Birthdays filled with laughter and cake</li>
              <li>Sweet and simple date days</li>
              <li>Best-friend hangouts and chaotic selfies</li>
              <li>Solo moments when you just feel cute and confident</li>
              <li>Random days you want to remember for no reason at all</li>
            </ul>
            <p class="card-text" style="margin-top:1.1rem;">
              You don't need a special occasion to create a special memory.
            </p>
          </div>

          <!-- OUR GOAL -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">✨</span> Our Goal</h2>
            <p class="card-text">
              We're here to make photography feel fun again — not complicated, not serious, and definitely not boring. Just open the booth, strike a pose, and keep the memory.
            </p>
            <p class="card-text">
              Because at the end of the day, it's not just about photos — it's about the feeling you get when you look back at them. 💕
            </p>
          </div>

          <div class="jam-divider" aria-hidden="true">
            <span class="jam-divider-icon">🍓</span>
          </div>

          <!-- CTA BUTTONS -->
          <div class="cta-row">
            <a href="photobooth.html" class="cta-btn cta-btn-primary">📸 Open the Booth</a>
            <a href="frames.html"     class="cta-btn cta-btn-secondary">🎀 Browse Frames</a>
          </div>

        </div><!-- /.about-content -->
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
      // Hamburger menu toggle
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