<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Photostrip Booth — Photobooth Kawaii</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <style>
      /* ===== CUSTOM FONTS ===== */
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
        --pink:#ff9ec8; --pink-deep:#ff6ba8; --lavender:#e8d4f0;
        --brown:#4a3728; --white:#fffefd; --gray:#6b5a52;
      }
    </style>
    <link rel="stylesheet" href="css/style.css" />
    <style>
      body { background:linear-gradient(165deg,#f5e6ff 0%,#ffd6e8 45%,#e8d4ff 100%); min-height:100vh; padding-bottom: 100px; }
      main { max-width:1040px; margin:0 auto; padding:1.5rem 1rem 5rem; position:relative; z-index:1; }

      /* ===== BACK LINK ===== */
      .back-link {
        display: inline-flex;
        align-items: center;
        gap: .45rem;
        font-family: var(--font-body);
        font-size: .92rem;
        font-weight: 700;
        color: #7a5800;
        text-decoration: none;
        background: radial-gradient(circle at 40% 35%, #fff7a0, #ffd700 60%, #f5b800);
        padding: .55rem 1.3rem .55rem 1rem;
        border-radius: 999px;
        margin-bottom: 1.25rem;
        letter-spacing: .02em;
        box-shadow:
          0 0 10px 2px rgba(255, 220, 0, 0.55),
          0 0 28px 6px rgba(255, 200, 0, 0.30),
          0 0 55px 14px rgba(255, 180, 0, 0.15),
          0 3px 10px rgba(200, 140, 0, 0.25);
        transition: transform .2s, box-shadow .2s;
        animation: backGlow 2.4s ease-in-out infinite;
      }
      .back-link:hover {
        transform: scale(1.06);
        box-shadow:
          0 0 14px 4px rgba(255, 230, 0, 0.75),
          0 0 38px 10px rgba(255, 210, 0, 0.45),
          0 0 70px 20px rgba(255, 190, 0, 0.22),
          0 4px 14px rgba(200, 140, 0, 0.3);
      }
      @keyframes backGlow {
        0%, 100% {
          box-shadow:
            0 0 10px 2px rgba(255,220,0,.55),
            0 0 28px 6px rgba(255,200,0,.30),
            0 0 55px 14px rgba(255,180,0,.15),
            0 3px 10px rgba(200,140,0,.25);
        }
        50% {
          box-shadow:
            0 0 16px 5px rgba(255,230,0,.80),
            0 0 42px 12px rgba(255,210,0,.45),
            0 0 75px 22px rgba(255,185,0,.22),
            0 3px 10px rgba(200,140,0,.25);
        }
      }

      /* ===== STEPS ===== */
      .step { display:none; animation:stepIn .4s ease both; }
      .step.active { display:block; }
      @keyframes stepIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

      /* ===== FLOATING EMOJIS ===== */
      .cam-wrap {
        max-width:560px; margin:0 auto; text-align:center;
        position: relative;
      }
      .float-emoji {
        position: absolute;
        font-size: 1.6rem;
        pointer-events: none;
        user-select: none;
        animation: floatBob var(--dur, 3s) ease-in-out infinite;
        animation-delay: var(--delay, 0s);
        z-index: 2;
      }
      @keyframes floatBob {
        0%,100% { transform: translateY(0) rotate(var(--rot0, -8deg)); }
        50%      { transform: translateY(-12px) rotate(var(--rot1, 8deg)); }
      }
      .cam-title {
        font-family:var(--font-display); font-size:clamp(1.5rem,4vw,2rem);
        color:var(--pink-deep); margin-bottom:.75rem;
        text-shadow:2px 2px 0 var(--white);
      }

      /* ===== SHOT PROGRESS DOTS ===== */
      .shot-dots { display:flex; gap:.6rem; justify-content:center; margin-bottom:1rem; }
      .dot {
        width:14px; height:14px; border-radius:50%;
        background:#e0c0d8; border:2px solid #d0a8c0; transition:background .3s;
      }
      .dot.done { background:var(--pink-deep); border-color:var(--pink-deep); }
      .dot.current { background:var(--pink); border-color:var(--pink-deep); animation:dotPulse 1s ease-in-out infinite; }
      @keyframes dotPulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.3);} }
      .shot-status { color:var(--gray); font-size:.9rem; margin:.5rem 0; font-family:var(--font-body); }

      /* ===== VIDEO SHELL ===== */
      .video-shell {
        position:relative; border-radius:20px; overflow:hidden;
        box-shadow:0 12px 40px rgba(255,100,160,.3);
        background:#1a0a14; aspect-ratio:4/3;
      }
      #video { width:100%; height:100%; object-fit:cover; display:block; transform:scaleX(-1); }
      .countdown-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none; }
      .countdown-num {
        font-family:var(--font-display); font-size:8rem; font-weight:700;
        color:#fff; text-shadow:0 0 40px rgba(255,120,180,.8),0 4px 0 rgba(0,0,0,.2);
        opacity:0; transition:none; animation:none;
      }
      .countdown-num.show { animation:countPop .85s ease forwards; }
      @keyframes countPop {
        0%{opacity:0;transform:scale(2);}
        20%{opacity:1;transform:scale(1);}
        80%{opacity:1;transform:scale(1);}
        100%{opacity:0;transform:scale(0.8);}
      }
      .flash-cap { position:absolute; inset:0; background:#fff; opacity:0; pointer-events:none; border-radius:20px; transition:opacity .08s ease; }
      .flash-cap.pop { opacity:1; }

      .cam-btn {
        margin-top:1.25rem; padding:.85rem 2.5rem;
        background:linear-gradient(145deg,#ffb8d9,var(--pink-deep));
        color:#fff; border:none; border-radius:99px; cursor:pointer;
        font-family:var(--font-display); font-size:1.2rem;
        box-shadow:0 8px 28px rgba(255,100,160,.4);
        transition:transform .2s, box-shadow .2s;
      }
      .cam-btn:hover:not(:disabled) { transform:scale(1.05); box-shadow:0 12px 36px rgba(255,100,160,.5); }
      .cam-btn:disabled { opacity:.5; cursor:not-allowed; }

      canvas { display:none; }

      /* ===== STUDIO STEP ===== */
      .studio-layout {
        display:grid; grid-template-columns:1fr 320px; gap:1.5rem;
        align-items:start;
      }
      @media(max-width:760px){ .studio-layout{ grid-template-columns:1fr; } }

      .preview-panel { text-align:center; }
      .preview-panel h2 {
        font-family:var(--font-display); font-size:1.5rem; color:var(--pink-deep);
        margin-bottom:1rem; text-shadow:2px 2px 0 var(--white);
      }

      /* ===== STRIP CONTAINER ===== */
      .strip-container {
        display:inline-block; position:relative;
        padding:10px 10px 28px;
        background:#fff; border-radius:8px;
        box-shadow:6px 8px 32px rgba(180,120,200,.3);
        transition:box-shadow .3s;
      }
      .strip-photos { display:flex; flex-direction:column; gap:6px; }
      .strip-photos img {
        width:220px; height:160px; object-fit:cover;
        border-radius:3px; display:block;
      }
      .strip-top-band,.strip-bottom-band { height:6px; border-radius:3px; }
      .strip-top-band { margin-bottom:8px; }
      .strip-bottom-band { margin-top:8px; }
      .strip-caption {
        font-family:var(--font-body); font-size:.85rem;
        text-align:center; margin-top:6px; color:#c0b0d0;
      }
      .strip-stickers { display:flex; justify-content:space-between; padding:0 4px; font-size:1.2rem; }

      .action-btns { display:flex; gap:.75rem; justify-content:center; margin-top:1.25rem; flex-wrap:wrap; }
      .btn-retake {
        padding:.7rem 1.5rem; background:var(--white); color:var(--pink-deep);
        border:2px solid var(--pink); border-radius:99px; cursor:pointer;
        font-family:var(--font-display); font-size:1rem; transition:transform .2s;
      }
      .btn-retake:hover { transform:scale(1.04); }
      .btn-download {
        padding:.7rem 1.5rem;
        background:linear-gradient(145deg,#ffb8d9,var(--pink-deep));
        color:#fff; border:none; border-radius:99px; cursor:pointer;
        font-family:var(--font-display); font-size:1rem;
        box-shadow:0 6px 20px rgba(255,100,160,.35); transition:transform .2s;
      }
      .btn-download:hover { transform:scale(1.04); }

      /* ===== FRAMES PANEL ===== */
      .frames-panel {
        background:var(--white); border-radius:20px;
        padding:1rem; box-shadow:0 8px 28px rgba(180,120,200,.15);
        max-height:600px; overflow-y:auto;
      }
      .frames-panel h3 {
        font-family:var(--font-display); font-size:1.1rem; color:var(--pink-deep);
        margin:0 0 .75rem; text-align:center;
      }
      .frames-category { margin-bottom:1rem; }
      .cat-label {
        font-size:.72rem; font-weight:700; letter-spacing:.08em;
        color:var(--gray); text-transform:uppercase; margin-bottom:.4rem;
        padding:.25rem .5rem; background:var(--lavender); border-radius:99px;
        display:inline-block;
      }
      .frames-row { display:flex; flex-wrap:wrap; gap:.5rem; }
      .frame-thumb-btn {
        width:64px; height:80px; border-radius:10px; border:2px solid transparent;
        cursor:pointer; background:none; padding:3px; transition:transform .15s, border-color .15s;
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        gap:2px; font-size:.6rem; color:var(--brown);
        box-shadow:0 2px 8px rgba(180,120,200,.15);
      }
      .frame-thumb-btn:hover { transform:scale(1.08); }
      .frame-thumb-btn.active { border-color:var(--pink-deep); box-shadow:0 0 0 3px rgba(255,107,168,.3); }
      .frame-thumb-btn .thumb-preview {
        width:42px; height:54px; border-radius:4px;
        display:flex; align-items:center; justify-content:center;
        position:relative; overflow:hidden; flex-shrink:0;
        border: none; background: none; padding: 0;
      }
      .frame-thumb-btn .thumb-preview svg { width:42px; height:54px; display:block; border-radius:4px; }
      .frame-thumb-btn .thumb-label { font-size:.5rem; text-align:center; line-height:1.2; color:var(--gray); }

      /* ===== HEADER — cloud shape ===== */
      .site-header {
        background: #fff;
        margin: 1.6rem 1rem 0;
        padding: .75rem 1.75rem 1.1rem;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        position: relative;
        z-index: 100;
        border-radius: 120px 120px 60px 60px / 80px 80px 40px 40px;
        box-shadow:
          0 6px 28px rgba(255,160,200,.22),
          0 2px 8px rgba(255,160,200,.12);
      }
      .site-header::before,
      .site-header::after {
        content: '';
        position: absolute;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 -4px 12px rgba(255,160,200,.15);
        z-index: -1;
      }
      .site-header::before {
        width: 140px; height: 70px;
        top: -30px; left: 12%;
      }
      .site-header::after {
        width: 100px; height: 55px;
        top: -22px; left: 32%;
      }
      .cloud-puff {
        position: absolute;
        background: #fff;
        border-radius: 50%;
        z-index: -1;
        pointer-events: none;
      }
      .cloud-puff-1 { width:80px; height:50px; top:-18px; left:50%; }
      .cloud-puff-2 { width:110px; height:60px; top:-26px; right:22%; }
      .cloud-puff-3 { width:70px; height:45px; top:-14px; right:10%; }

      .logo {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1;
        gap: 0;
        text-align: center;
      }
      .logo-top {
        font-family: var(--font-body);
        font-size: .88rem;
        font-weight: 700;
        color: var(--pink-deep);
        letter-spacing: .04em;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .3rem;
        white-space: nowrap;
      }
      .logo-top .bow { font-size: .9rem; }
      .logo-bottom {
        font-family: var(--font-display);
        font-size: 1.8rem;
        font-weight: 800;
        color: var(--pink-deep);
        line-height: 1;
        margin-top: .05rem;
        letter-spacing: .01em;
      }

      .site-nav {
        display: flex;
        justify-content: center;
      }
      .nav-main {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 2.8rem;
        margin: 0; padding: 0;
      }
      .nav-main a {
        font-family: var(--font-body);
        font-size: 1rem;
        font-weight: 700;
        color: var(--brown);
        text-decoration: none;
        transition: color .2s;
        white-space: nowrap;
        letter-spacing: .02em;
      }
      .nav-main a:hover { color: var(--pink-deep); }
      .nav-main a[aria-current="page"] {
        color: var(--pink-deep);
        border-bottom: 2.5px solid var(--pink-deep);
        padding-bottom: 2px;
      }

      .header-bow {
        font-size: 1.5rem;
        filter: drop-shadow(0 0 5px rgba(255,120,180,.5));
        flex-shrink: 0;
        justify-self: end;
      }
      .hamburger {
        display: none;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        z-index: 200;
      }
      .hamburger span {
        display: block;
        width: 22px; height: 2.5px;
        background: var(--pink-deep);
        border-radius: 99px;
        transition: transform .3s, opacity .3s;
      }
      .hamburger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
      .hamburger.open span:nth-child(2) { opacity: 0; }
      .hamburger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

      @media (max-width: 640px) {
        .site-header {
          display: flex;
          flex-wrap: wrap;
          border-radius: 60px 60px 30px 30px / 50px 50px 25px 25px;
          margin: 1.2rem .75rem 0;
          padding: .65rem 1.1rem .9rem;
        }
        .hamburger { display: flex; }
        .header-bow { order: 2; }
        .hamburger { order: 3; }
        .logo { order: 1; flex: 1; }
        nav.site-nav {
          display: none;
          width: 100%;
          order: 4;
          padding: .5rem 0 .25rem;
          justify-content: flex-start;
        }
        nav.site-nav.open { display: flex; }
        .nav-main {
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          width: 100%;
        }
        .nav-main li { width: 100%; }
        .nav-main a {
          display: block;
          padding: .55rem .25rem;
          border-bottom: 1px solid rgba(255,160,200,.2);
          font-size: 1.05rem;
        }
        .nav-main li:last-child a { border-bottom: none; }
      }

      /* ===== FOOTER ===== */
      .site-footer {
        background: transparent;
        padding: 1.25rem 1rem 1.5rem;
        margin-top: 2.5rem;
      }
      .footer-inner {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1.5px solid rgba(255,160,200,.35);
        padding-top: 1.25rem;
        flex-wrap: wrap;
        gap: .75rem 1.25rem;
      }
      .footer-brand {
        display: flex;
        align-items: center;
        gap: .65rem;
      }
      .footer-brand-icon {
        width: 34px; height: 34px;
        background: var(--pink-deep);
        color: #fff;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: .9rem;
        flex-shrink: 0;
      }
      .footer-brand .name {
        font-family: var(--font-display);
        font-size: .98rem;
        font-weight: 700;
        color: var(--brown);
        line-height: 1.2;
      }
      .footer-brand .sub {
        font-size: .75rem;
        color: var(--gray);
      }
      .footer-divider {
        width: 1px; height: 36px;
        background: rgba(255,160,200,.35);
        flex-shrink: 0;
      }
      .footer-socials {
        display: flex;
        gap: .5rem;
        align-items: center;
      }
      .footer-socials a {
        width: 34px; height: 34px;
        background: var(--pink-deep);
        color: #fff;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: .85rem;
        text-decoration: none;
        transition: transform .2s, background .2s;
      }
      .footer-socials a:hover { transform: scale(1.1); background: var(--brown); }
      .footer-divider2 {
        width: 1px; height: 36px;
        background: rgba(255,160,200,.35);
        flex-shrink: 0;
      }
      .copyright {
        font-size: .75rem;
        color: var(--gray);
        text-align: right;
        margin: 0;
        line-height: 1.5;
      }
      @media (max-width: 640px) {
        .footer-inner { justify-content: center; text-align: center; }
        .footer-divider, .footer-divider2 { display: none; }
        .copyright { text-align: center; width: 100%; }
        .footer-brand { justify-content: center; }
      }

      /* ===== GRASS STRIP ===== */
      .grass-strip {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        height: 110px;
        pointer-events: none;
        z-index: 50;
        overflow: hidden;
      }
      .grass-strip svg { width: 100%; height: 100%; display: block; }

      /* ===== BUTTERFLIES ===== */
      .butterfly {
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 51;
        bottom: var(--bf-bottom, 90px);
        animation:
          bflyX var(--bx-dur, 18s) linear infinite var(--bx-delay, 0s),
          bflyY var(--by-dur, 3.2s) ease-in-out infinite var(--by-delay, 0s),
          bflyFlap var(--flap-dur, .38s) ease-in-out infinite var(--flap-delay, 0s);
      }
      @keyframes bflyX {
        0%   { left: -6%; }
        100% { left: 110%; }
      }
      @keyframes bflyY {
        0%, 100% { transform: translateY(0)      rotate(var(--tilt, -5deg)); }
        50%       { transform: translateY(-26px)  rotate(var(--tilt, -5deg)); }
      }
      @keyframes bflyFlap {
        0%, 100% { letter-spacing: 0; }
        50%       { letter-spacing: -.5em; }
      }

      /* Waiting for next shot overlay */
      .next-shot-msg {
        font-family:var(--font-display); font-size:1.5rem; color:#fff;
        text-shadow:0 2px 12px rgba(0,0,0,.5); position:absolute; inset:0;
        display:flex; align-items:center; justify-content:center;
        background:rgba(80,0,40,.4); border-radius:20px;
      }
    </style>
  </head>
  <body>

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
          <li><a href="photobooth.html" aria-current="page">Photobooth</a></li>
          
          <li><a href="contact.html">Contact</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
        </ul>
      </nav>
      <span class="header-bow" aria-hidden="true">🎀</span>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </header>

    <main>
      <a href="choose-style.html" class="back-link">← back to style select</a>

      <!-- STEP 1: Camera -->
      <div class="step active" id="stepCamera">
        <div class="cam-wrap">
          <!-- Floating emojis -->
          <span class="float-emoji" style="top:10%;left:-8%;--dur:3.2s;--delay:0s;--rot0:-10deg;--rot1:10deg">🎞️</span>
          <span class="float-emoji" style="top:30%;left:-10%;--dur:2.8s;--delay:.4s;--rot0:-6deg;--rot1:8deg">🌸</span>
          <span class="float-emoji" style="top:60%;left:-7%;--dur:3.5s;--delay:.8s;--rot0:-12deg;--rot1:6deg">🎀</span>
          <span class="float-emoji" style="top:80%;left:-5%;--dur:2.6s;--delay:.2s;--rot0:4deg;--rot1:-10deg">⭐</span>
          <span class="float-emoji" style="top:5%;right:-8%;--dur:3.0s;--delay:.6s;--rot0:8deg;--rot1:-8deg">💖</span>
          <span class="float-emoji" style="top:28%;right:-10%;--dur:3.4s;--delay:0s;--rot0:-5deg;--rot1:12deg">✨</span>
          <span class="float-emoji" style="top:55%;right:-8%;--dur:2.9s;--delay:1s;--rot0:10deg;--rot1:-5deg">🍓</span>
          <span class="float-emoji" style="top:78%;right:-5%;--dur:3.1s;--delay:.3s;--rot0:-8deg;--rot1:6deg">🌟</span>
          <span class="float-emoji" style="top:-4%;left:15%;--dur:2.7s;--delay:.7s;--rot0:-5deg;--rot1:9deg">🎬</span>
          <span class="float-emoji" style="top:-4%;right:20%;--dur:3.3s;--delay:.1s;--rot0:6deg;--rot1:-10deg">🌷</span>

          <h1 class="cam-title">🎞️ 4-Photo Strip Session</h1>
          <p style="color:var(--gray);margin-bottom:.75rem;font-family:var(--font-body)">4 poses, 3 seconds each — let's go! ♡</p>

          <div class="shot-dots">
            <div class="dot current" id="dot0"></div>
            <div class="dot" id="dot1"></div>
            <div class="dot" id="dot2"></div>
            <div class="dot" id="dot3"></div>
          </div>
          <p class="shot-status" id="shotStatus">Photo 1 of 4 — Click Ready when you're set!</p>

          <div class="video-shell" id="videoShell">
            <video id="video" autoplay playsinline muted></video>
            <div class="countdown-overlay">
              <div class="countdown-num" id="countNum"></div>
            </div>
            <div class="flash-cap" id="flashCap"></div>
          </div>

          <canvas id="canvas" width="640" height="480"></canvas>

          <div style="margin-top:1rem">
            <button class="cam-btn" id="btnReady" onclick="startShot()">✨ Ready / Start Pose</button>
          </div>
          <p id="camError" style="color:#e06090;margin-top:.75rem;display:none;font-family:var(--font-body)"></p>
        </div>
      </div>

      <!-- STEP 2: Studio -->
      <div class="step" id="stepStudio">
        <div class="studio-layout">
          <div class="preview-panel">
            <h2>🎞️ Photostrip Design Studio</h2>
            <canvas id="stripPreviewCanvas" style="border-radius:12px;box-shadow:6px 8px 32px rgba(180,120,200,.3);display:block;margin:0 auto;max-width:100%;"></canvas>
            <div class="action-btns">
              <button class="btn-retake" onclick="retake()">🔄 Retake All</button>
              <button class="btn-download" onclick="downloadStrip()">⬇️ Download</button>
            </div>
            <p style="margin-top:.75rem"><a href="index.html" style="color:var(--gray);font-size:.85rem;font-family:var(--font-body)">← Back to Home</a></p>
          </div>

          <div class="frames-panel">
            <h3>🎨 Pick a Frame</h3>
            <div id="framesContainer"></div>
          </div>
        </div>
      </div>
    </main>

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
        <p class="copyright">&copy; 2024 Photobooth Kawaii.<br>All rights reserved.</p>
      </div>
    </footer>

    <!-- ===== GRASS STRIP ===== -->
    <div class="grass-strip" aria-hidden="true">
      <!--
        Reference: pink sky bg visible, dense tall dark-green spikes, bright green ground rectangle below spikes,
        small flowers sitting at the base of the spikes.
        KEY FIX: No <rect> background behind spikes — that caused the visible line.
        Instead: spikes go tip-to-bottom of SVG so they ARE the background.
        A bright green ground rect fills only the lower portion beneath the spike bases.
      -->
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Bright green ground (lower 40px) — sits BEHIND spikes visually via layering order -->
        <rect x="0" y="68" width="1440" height="42" fill="#8fd44e"/>

        <!-- Back row: tall dark spikes, tips start at y=0, bases at y=70 — no gap rect above -->
        <g fill="#4a8c1c">
          <polygon points="0,70 7,0 14,70"/><polygon points="10,70 18,4 26,70"/>
          <polygon points="22,70 31,8 40,70"/><polygon points="34,70 43,2 52,70"/>
          <polygon points="46,70 55,10 64,70"/><polygon points="58,70 67,0 76,70"/>
          <polygon points="70,70 79,6 88,70"/><polygon points="82,70 91,12 100,70"/>
          <polygon points="94,70 103,2 112,70"/><polygon points="106,70 115,8 124,70"/>
          <polygon points="118,70 127,0 136,70"/><polygon points="130,70 139,10 148,70"/>
          <polygon points="142,70 151,4 160,70"/><polygon points="154,70 163,0 172,70"/>
          <polygon points="166,70 175,8 184,70"/><polygon points="178,70 187,2 196,70"/>
          <polygon points="190,70 199,10 208,70"/><polygon points="202,70 211,0 220,70"/>
          <polygon points="214,70 223,6 232,70"/><polygon points="226,70 235,12 244,70"/>
          <polygon points="238,70 247,2 256,70"/><polygon points="250,70 259,8 268,70"/>
          <polygon points="262,70 271,0 280,70"/><polygon points="274,70 283,10 292,70"/>
          <polygon points="286,70 295,4 304,70"/><polygon points="298,70 307,0 316,70"/>
          <polygon points="310,70 319,8 328,70"/><polygon points="322,70 331,2 340,70"/>
          <polygon points="334,70 343,10 352,70"/><polygon points="346,70 355,0 364,70"/>
          <polygon points="358,70 367,6 376,70"/><polygon points="370,70 379,12 388,70"/>
          <polygon points="382,70 391,2 400,70"/><polygon points="394,70 403,8 412,70"/>
          <polygon points="406,70 415,0 424,70"/><polygon points="418,70 427,10 436,70"/>
          <polygon points="430,70 439,4 448,70"/><polygon points="442,70 451,0 460,70"/>
          <polygon points="454,70 463,8 472,70"/><polygon points="466,70 475,2 484,70"/>
          <polygon points="478,70 487,10 496,70"/><polygon points="490,70 499,0 508,70"/>
          <polygon points="502,70 511,6 520,70"/><polygon points="514,70 523,12 532,70"/>
          <polygon points="526,70 535,2 544,70"/><polygon points="538,70 547,8 556,70"/>
          <polygon points="550,70 559,0 568,70"/><polygon points="562,70 571,10 580,70"/>
          <polygon points="574,70 583,4 592,70"/><polygon points="586,70 595,0 604,70"/>
          <polygon points="598,70 607,8 616,70"/><polygon points="610,70 619,2 628,70"/>
          <polygon points="622,70 631,10 640,70"/><polygon points="634,70 643,0 652,70"/>
          <polygon points="646,70 655,6 664,70"/><polygon points="658,70 667,12 676,70"/>
          <polygon points="670,70 679,2 688,70"/><polygon points="682,70 691,8 700,70"/>
          <polygon points="694,70 703,0 712,70"/><polygon points="706,70 715,10 724,70"/>
          <polygon points="718,70 727,4 736,70"/><polygon points="730,70 739,0 748,70"/>
          <polygon points="742,70 751,8 760,70"/><polygon points="754,70 763,2 772,70"/>
          <polygon points="766,70 775,10 784,70"/><polygon points="778,70 787,0 796,70"/>
          <polygon points="790,70 799,6 808,70"/><polygon points="802,70 811,12 820,70"/>
          <polygon points="814,70 823,2 832,70"/><polygon points="826,70 835,8 844,70"/>
          <polygon points="838,70 847,0 856,70"/><polygon points="850,70 859,10 868,70"/>
          <polygon points="862,70 871,4 880,70"/><polygon points="874,70 883,0 892,70"/>
          <polygon points="886,70 895,8 904,70"/><polygon points="898,70 907,2 916,70"/>
          <polygon points="910,70 919,10 928,70"/><polygon points="922,70 931,0 940,70"/>
          <polygon points="934,70 943,6 952,70"/><polygon points="946,70 955,12 964,70"/>
          <polygon points="958,70 967,2 976,70"/><polygon points="970,70 979,8 988,70"/>
          <polygon points="982,70 991,0 1000,70"/><polygon points="994,70 1003,10 1012,70"/>
          <polygon points="1006,70 1015,4 1024,70"/><polygon points="1018,70 1027,0 1036,70"/>
          <polygon points="1030,70 1039,8 1048,70"/><polygon points="1042,70 1051,2 1060,70"/>
          <polygon points="1054,70 1063,10 1072,70"/><polygon points="1066,70 1075,0 1084,70"/>
          <polygon points="1078,70 1087,6 1096,70"/><polygon points="1090,70 1099,12 1108,70"/>
          <polygon points="1102,70 1111,2 1120,70"/><polygon points="1114,70 1123,8 1132,70"/>
          <polygon points="1126,70 1135,0 1144,70"/><polygon points="1138,70 1147,10 1156,70"/>
          <polygon points="1150,70 1159,4 1168,70"/><polygon points="1162,70 1171,0 1180,70"/>
          <polygon points="1174,70 1183,8 1192,70"/><polygon points="1186,70 1195,2 1204,70"/>
          <polygon points="1198,70 1207,10 1216,70"/><polygon points="1210,70 1219,0 1228,70"/>
          <polygon points="1222,70 1231,6 1240,70"/><polygon points="1234,70 1243,12 1252,70"/>
          <polygon points="1246,70 1255,2 1264,70"/><polygon points="1258,70 1267,8 1276,70"/>
          <polygon points="1270,70 1279,0 1288,70"/><polygon points="1282,70 1291,10 1300,70"/>
          <polygon points="1294,70 1303,4 1312,70"/><polygon points="1306,70 1315,0 1324,70"/>
          <polygon points="1318,70 1327,8 1336,70"/><polygon points="1330,70 1339,2 1348,70"/>
          <polygon points="1342,70 1351,10 1360,70"/><polygon points="1354,70 1363,0 1372,70"/>
          <polygon points="1366,70 1375,6 1384,70"/><polygon points="1378,70 1387,12 1396,70"/>
          <polygon points="1390,70 1399,2 1408,70"/><polygon points="1402,70 1411,8 1420,70"/>
          <polygon points="1414,70 1423,0 1432,70"/><polygon points="1426,70 1435,10 1444,70"/>
        </g>

        <!-- Front row: slightly shorter, lighter green, offset for depth -->
        <g fill="#5fad28">
          <polygon points="5,70 13,14 21,70"/><polygon points="17,70 25,6 33,70"/>
          <polygon points="29,70 37,18 45,70"/><polygon points="53,70 61,8 69,70"/>
          <polygon points="77,70 85,20 93,70"/><polygon points="101,70 109,4 117,70"/>
          <polygon points="137,70 145,16 153,70"/><polygon points="173,70 181,6 189,70"/>
          <polygon points="209,70 217,20 225,70"/><polygon points="257,70 265,8 273,70"/>
          <polygon points="305,70 313,18 321,70"/><polygon points="365,70 373,4 381,70"/>
          <polygon points="425,70 433,14 441,70"/><polygon points="497,70 505,8 513,70"/>
          <polygon points="557,70 565,20 573,70"/><polygon points="617,70 625,6 633,70"/>
          <polygon points="677,70 685,16 693,70"/><polygon points="749,70 757,4 765,70"/>
          <polygon points="809,70 817,20 825,70"/><polygon points="869,70 877,8 885,70"/>
          <polygon points="929,70 937,14 945,70"/><polygon points="1001,70 1009,6 1017,70"/>
          <polygon points="1061,70 1069,18 1077,70"/><polygon points="1121,70 1129,4 1137,70"/>
          <polygon points="1181,70 1189,20 1197,70"/><polygon points="1253,70 1261,8 1269,70"/>
          <polygon points="1313,70 1321,16 1329,70"/><polygon points="1373,70 1381,4 1389,70"/>
          <polygon points="1433,70 1441,14 1449,70"/>
        </g>

        <!-- Flowers sitting at ground level -->
        <g font-size="15" text-anchor="middle" font-family="serif">
          <text x="90"  y="74">🌸</text>
          <text x="270" y="72">🌼</text>
          <text x="480" y="74">🌸</text>
          <text x="690" y="72">🌼</text>
          <text x="870" y="74">🌸</text>
          <text x="1080" y="72">🌼</text>
          <text x="1290" y="74">🌸</text>
          <text x="1410" y="72">🌼</text>
        </g>
      </svg>
    </div>

    <!-- ===== BUTTERFLIES ===== -->
    <span class="butterfly" aria-hidden="true" style="--bx-dur:22s;--bx-delay:0s;  --by-dur:3.0s;--by-delay:0s;  --flap-dur:.32s;--flap-delay:0s;  --bf-bottom:100px;--tilt:-5deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:17s;--bx-delay:-5s; --by-dur:2.6s;--by-delay:.4s; --flap-dur:.28s;--flap-delay:.1s; --bf-bottom:130px;--tilt:4deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:25s;--bx-delay:-10s;--by-dur:3.4s;--by-delay:.8s; --flap-dur:.36s;--flap-delay:.05s;--bf-bottom:115px;--tilt:-8deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:19s;--bx-delay:-3s; --by-dur:2.8s;--by-delay:.2s; --flap-dur:.30s;--flap-delay:.15s;--bf-bottom:145px;--tilt:6deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:28s;--bx-delay:-14s;--by-dur:3.8s;--by-delay:1s;  --flap-dur:.40s;--flap-delay:0s;  --bf-bottom:105px;--tilt:-3deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:15s;--bx-delay:-7s; --by-dur:2.4s;--by-delay:.6s; --flap-dur:.26s;--flap-delay:.2s; --bf-bottom:160px;--tilt:9deg">🦋</span>

    <script>
    // ===== 50 PHOTOSTRIP FRAME TEMPLATES =====
    const FRAMES = [
      { id:1,  name:"Cherry Blossom", cat:"🌸 Floral",    bg:"#fff0f8", border:"#ff9ec8", accent:"#ffb8d9", s:["🌸","✿","💮","🌺"], caption:"bloom forever ✿", font:"#d4789c" },
      { id:2,  name:"Rose Garden",    cat:"🌸 Floral",    bg:"#fff0f4", border:"#e87090", accent:"#ffb0c8", s:["🌹","🥀","🌹","🌷"], caption:"avec amour ♡",   font:"#c04070" },
      { id:3,  name:"Lavender Dream", cat:"🌸 Floral",    bg:"#f8f0ff", border:"#c090e0", accent:"#d4b0f0", s:["💜","🌿","💐","✨"], caption:"dreamy lavender",  font:"#8050b0" },
      { id:4,  name:"Sunflower Pop",  cat:"🌸 Floral",    bg:"#fffde8", border:"#e0b800", accent:"#ffe040", s:["🌻","☀️","🌻","🌼"], caption:"sunny days ☀",    font:"#a07000" },
      { id:5,  name:"Daisy Fields",   cat:"🌸 Floral",    bg:"#f0ffe0", border:"#90d060", accent:"#b0e880", s:["🌼","🌿","🌸","🍃"], caption:"field of daisies", font:"#507030" },
      { id:6,  name:"Kawaii Pink",    cat:"🍬 Kawaii",    bg:"#fff0f8", border:"#ff80c0", accent:"#ffa0d0", s:["🎀","✨","🎀","💖"], caption:"kawaii desu ♡",   font:"#e0508a" },
      { id:7,  name:"Bunny Hop",      cat:"🍬 Kawaii",    bg:"#f4f0ff", border:"#c0b0f0", accent:"#d8d0ff", s:["🐰","🌸","🐰","🌸"], caption:"hop hop ✿",       font:"#8070c0" },
      { id:8,  name:"Star Girl",      cat:"🍬 Kawaii",    bg:"#fffce0", border:"#e0c000", accent:"#ffe840", s:["⭐","🌟","⭐","✨"], caption:"you're a star ★",  font:"#908000" },
      { id:9,  name:"Candy World",    cat:"🍬 Kawaii",    bg:"#fff4fc", border:"#ff80a0", accent:"#ffb0c8", s:["🍬","🍭","🍬","🍭"], caption:"sweet as candy",   font:"#d04060" },
      { id:10, name:"Strawberry",     cat:"🍬 Kawaii",    bg:"#fff4f4", border:"#e05050", accent:"#ff8080", s:["🍓","💖","🍓","✿"], caption:"berry cute ♡",     font:"#c03040" },
      { id:11, name:"Kitty Paws",     cat:"🍬 Kawaii",    bg:"#fff8f8", border:"#e09090", accent:"#ffb8b8", s:["🐱","🐾","🐱","💗"], caption:"nyaa~ ♡",          font:"#c06060" },
      { id:12, name:"Sailor Moon",    cat:"🍬 Kawaii",    bg:"#f8f8ff", border:"#8090e0", accent:"#b0c0f8", s:["🌙","⭐","🌙","💫"], caption:"moon prism power",  font:"#4050a0" },
      { id:13, name:"Cotton Candy",   cat:"🎨 Pastel",    bg:"#fdf0ff", border:"#c090d0", accent:"#e0b0e8", s:["🌈","💗","🌈","✨"], caption:"soft & sweet ♡",   font:"#9060a0" },
      { id:14, name:"Mint Cream",     cat:"🎨 Pastel",    bg:"#f0fff8", border:"#60c0a0", accent:"#90d8b8", s:["🌿","💚","🌿","🍃"], caption:"fresh & minty",    font:"#307050" },
      { id:15, name:"Baby Blue",      cat:"🎨 Pastel",    bg:"#f0f8ff", border:"#7090c0", accent:"#90b0d8", s:["🌊","💙","☁️","🫧"], caption:"serene blue ♡",    font:"#4060a0" },
      { id:16, name:"Peach Sorbet",   cat:"🎨 Pastel",    bg:"#fff8f0", border:"#e09060", accent:"#f0b080", s:["🍑","🌸","🍑","✿"], caption:"peachy keen ♡",    font:"#c06030" },
      { id:17, name:"Lilac Mist",     cat:"🎨 Pastel",    bg:"#f8f0ff", border:"#c0a0e0", accent:"#d8c0f0", s:["💜","🌸","🌷","✨"], caption:"lilac dreams",     font:"#8060b0" },
      { id:18, name:"Butter Yellow",  cat:"🎨 Pastel",    bg:"#fffff0", border:"#d0b000", accent:"#ffe040", s:["🌼","🌟","🌼","☀️"], caption:"sunny & bright",   font:"#906000" },
      { id:19, name:"Vintage Strip",  cat:"📷 Retro",     bg:"#faf5e8", border:"#a08060", accent:"#c0a070", s:["📷","🎞️","📷","🎞️"], caption:"captured forever",  font:"#604020" },
      { id:20, name:"Film Noir",      cat:"📷 Retro",     bg:"#f2f2f2", border:"#404040", accent:"#606060", s:["🎬","⬛","🎬","📽️"], caption:"lights, camera!",  font:"#202020" },
      { id:21, name:"Kodak Moment",   cat:"📷 Retro",     bg:"#fff8e0", border:"#d09010", accent:"#e8b820", s:["📸","🌟","📸","✨"], caption:"a kodak moment",    font:"#805000" },
      { id:22, name:"Disco Fever",    cat:"📷 Retro",     bg:"#f0f0ff", border:"#9070d0", accent:"#c090e8", s:["🪩","✨","🪩","💫"], caption:"disco queen ♡",    font:"#5030a0" },
      { id:23, name:"Pop Art",        cat:"📷 Retro",     bg:"#ffff80", border:"#ff0000", accent:"#ff6000", s:["🟡","🔴","🟡","🔵"], caption:"pop art vibes!",   font:"#800000" },
      { id:24, name:"Retro Pink",     cat:"📷 Retro",     bg:"#ffe8f8", border:"#e04090", accent:"#ff60a0", s:["💋","🌸","💋","✨"], caption:"groovy baby ♡",    font:"#900040" },
      { id:25, name:"Winter Frost",   cat:"❄️ Seasonal",  bg:"#f0f8ff", border:"#7090c0", accent:"#a0c0e0", s:["❄️","⛄","❄️","🌨️"], caption:"frosty & cozy ✿", font:"#4060a0" },
      { id:26, name:"Summer Breeze",  cat:"❄️ Seasonal",  bg:"#f0fcff", border:"#50b0d0", accent:"#70c8e8", s:["🌊","🌞","🌊","🌴"], caption:"summer lovin' ♡",  font:"#205070" },
      { id:27, name:"Autumn Leaves",  cat:"❄️ Seasonal",  bg:"#fff8e8", border:"#c07020", accent:"#e09040", s:["🍂","🍁","🍂","🍄"], caption:"golden autumn",    font:"#703010" },
      { id:28, name:"Spring Fresh",   cat:"❄️ Seasonal",  bg:"#f4fff0", border:"#60b060", accent:"#80c880", s:["🌱","🌸","🌱","🦋"], caption:"spring is here ♡", font:"#305030" },
      { id:29, name:"Xmas Magic",     cat:"❄️ Seasonal",  bg:"#fff4f4", border:"#c02020", accent:"#e04040", s:["🎄","🎁","❄️","⭐"], caption:"holiday magic ✿",  font:"#900020" },
      { id:30, name:"Halloween",      cat:"❄️ Seasonal",  bg:"#fff8e8", border:"#906030", accent:"#c08050", s:["🎃","🦇","🎃","🕷️"], caption:"boo! so cute ♡",   font:"#503010" },
      { id:31, name:"Pure White",     cat:"🤍 Minimal",   bg:"#ffffff", border:"#e0e0e0", accent:"#f0f0f0", s:["✦","○","✦","○"], caption:"simply you ♡",      font:"#888888" },
      { id:32, name:"Gold Foil",      cat:"🤍 Minimal",   bg:"#fffbf0", border:"#c8a800", accent:"#e0c000", s:["✨","◇","✨","◇"], caption:"golden moment",      font:"#706000" },
      { id:33, name:"Silver Lining",  cat:"🤍 Minimal",   bg:"#f8f8f8", border:"#909090", accent:"#b0b0b0", s:["◈","◇","◈","○"], caption:"silver lining ✦",    font:"#505050" },
      { id:34, name:"Marble Blush",   cat:"🤍 Minimal",   bg:"#fff8f6", border:"#d0a090", accent:"#e8b8a8", s:["◇","✦","◇","✦"], caption:"graceful & chic",    font:"#806050" },
      { id:35, name:"Ink & Paper",    cat:"🤍 Minimal",   bg:"#faf8f0", border:"#806040", accent:"#a08060", s:["🖊️","📝","🖊️","✦"], caption:"written in love",  font:"#503020" },
      { id:36, name:"Rainbow",        cat:"🌈 Fun",       bg:"#fff8ff", border:"#c080c0", accent:"#e0a0e0", s:["🌈","☁️","🌈","⭐"], caption:"over the rainbow", font:"#806090" },
      { id:37, name:"Space Kei",      cat:"🌈 Fun",       bg:"#0a0820", border:"#4040a0", accent:"#6060c0", s:["🚀","⭐","🪐","✨"], caption:"to infinity ✦",    font:"#9090ff" },
      { id:38, name:"Mermaid",        cat:"🌈 Fun",       bg:"#e8f8fc", border:"#3090b0", accent:"#50b0d0", s:["🧜","🐚","🌊","✨"], caption:"ocean dreams ♡",   font:"#105070" },
      { id:39, name:"Magic Girl",     cat:"🌈 Fun",       bg:"#fdf0ff", border:"#c060c0", accent:"#e090d0", s:["🌙","⭐","🔮","✨"], caption:"magical girl ★",   font:"#9030a0" },
      { id:40, name:"Y2K Vibes",      cat:"🌈 Fun",       bg:"#f0fff8", border:"#80a0c0", accent:"#a0c0e0", s:["💿","📱","💿","⚡"], caption:"y2k forever",      font:"#304080" },
      { id:41, name:"Rose Gold",      cat:"💅 Glam",      bg:"#fff8f4", border:"#d09080", accent:"#e8b0a0", s:["🌹","💗","💅","✦"], caption:"rose gold queen",   font:"#905040" },
      { id:42, name:"Amethyst",       cat:"💅 Glam",      bg:"#f8f0ff", border:"#9070c0", accent:"#b090d8", s:["💎","🔮","💎","✨"], caption:"crystal clear ✦",  font:"#6040a0" },
      { id:43, name:"Champagne",      cat:"💅 Glam",      bg:"#fffcf0", border:"#c09848", accent:"#d8b060", s:["🥂","✨","🥂","💫"], caption:"celebrate you ♡",  font:"#806030" },
      { id:44, name:"Holographic",    cat:"💅 Glam",      bg:"#f8f0ff", border:"#a080b0", accent:"#c0a0d0", s:["🦄","🌈","✨","💫"], caption:"holo dream ✦",     font:"#7050a0" },
      { id:45, name:"Black Lace",     cat:"💅 Glam",      bg:"#fdf4f8", border:"#2a1020", accent:"#4a2040", s:["🖤","🌹","🖤","🌹"], caption:"dark romance ♡",   font:"#1a0810" },
      { id:46, name:"Forest Fairy",   cat:"🌿 Nature",    bg:"#f0fff4", border:"#408040", accent:"#60a060", s:["🌿","🦋","🌸","🍃"], caption:"forest fairy ✿",   font:"#204020" },
      { id:47, name:"Ocean Breeze",   cat:"🌿 Nature",    bg:"#e8f8ff", border:"#2080a0", accent:"#40a0c0", s:["🌊","🐚","🌊","🫧"], caption:"ocean child ♡",    font:"#104060" },
      { id:48, name:"Sunset Glow",    cat:"🌿 Nature",    bg:"#fff8f0", border:"#c05020", accent:"#e07040", s:["🌅","🌸","🌅","✨"], caption:"golden hour ♡",     font:"#602010" },
      { id:49, name:"Sakura Park",    cat:"🌿 Nature",    bg:"#fff4f8", border:"#e07090", accent:"#f090b0", s:["🌸","🌸","🌸","🌸"], caption:"sakura forever ♡", font:"#c04060" },
      { id:50, name:"Moonlit Night",  cat:"🌿 Nature",    bg:"#0e0c24", border:"#4040a0", accent:"#6060c0", s:["🌙","⭐","🌙","💫"], caption:"moonlit dreams ✦", font:"#8090f0" },
    ];

    let photos = [];
    let shotIndex = 0;
    let isShooting = false;
    let videoStream = null;
    let currentFrame = FRAMES[0];
    const TOTAL = 4;

    async function initCamera() {
      const video = document.getElementById('video');
      try {
        videoStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
          audio: false
        });
        video.srcObject = videoStream;
        await new Promise((resolve, reject) => {
          video.onloadedmetadata = resolve;
          video.onerror = reject;
        });
        await video.play();
        document.getElementById('btnReady').disabled = false;
      } catch(e) {
        const err = document.getElementById('camError');
        err.style.display = 'block';
        if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
          err.textContent = '📷 Camera permission denied. Please allow access and reload.';
        } else if (e.name === 'NotFoundError') {
          err.textContent = '📷 No camera found. Please connect a camera and reload.';
        } else if (e.name === 'NotReadableError') {
          err.textContent = '📷 Camera is in use by another app. Please close it and reload.';
        } else {
          err.textContent = '📷 Camera access denied. Please allow camera permission and reload.';
        }
        document.getElementById('btnReady').disabled = true;
      }
    }

    function updateDots() {
      for(let i = 0; i < TOTAL; i++) {
        const d = document.getElementById('dot' + i);
        d.className = 'dot' + (i < shotIndex ? ' done' : i === shotIndex ? ' current' : '');
      }
      const s = document.getElementById('shotStatus');
      if(shotIndex < TOTAL) s.textContent = `Photo ${shotIndex + 1} of ${TOTAL} — Click Ready when you're set!`;
    }

    function startShot() {
      if(isShooting) return;
      isShooting = true;
      document.getElementById('btnReady').disabled = true;
      const el = document.getElementById('countNum');
      let count = 3;

      function tick() {
        el.className = 'countdown-num';
        void el.offsetWidth;
        el.textContent = count;
        el.className = 'countdown-num show';
        count--;
        if(count >= 0) setTimeout(tick, 900);
        else setTimeout(() => { el.textContent = ''; captureShot(); }, 400);
      }
      tick();
    }

    function captureShot() {
      const flash = document.getElementById('flashCap');
      flash.classList.add('pop');
      try {
        const ctx = new AudioContext();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for(let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.03));
        const src = ctx.createBufferSource(); src.buffer = buf; src.connect(ctx.destination); src.start();
      } catch(e) {}

      const video = document.getElementById('video');
      const canvas = document.getElementById('canvas');
      const ctx2 = canvas.getContext('2d');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      ctx2.save();
      ctx2.translate(canvas.width, 0); ctx2.scale(-1, 1);
      ctx2.drawImage(video, 0, 0);
      ctx2.restore();
      photos[shotIndex] = canvas.toDataURL('image/jpeg', 0.92);

      setTimeout(() => {
        flash.classList.remove('pop');
        shotIndex++;
        isShooting = false;

        if(shotIndex < TOTAL) {
          updateDots();
          document.getElementById('btnReady').disabled = false;
          document.getElementById('shotStatus').textContent = `📸 Got it! Photo ${shotIndex + 1} of ${TOTAL} next ♡`;
        } else {
          goToStudio();
        }
      }, 250);
    }

    function goToStudio() {
      if(videoStream) videoStream.getTracks().forEach(t => t.stop());
      document.getElementById('stepCamera').classList.remove('active');
      document.getElementById('stepStudio').classList.add('active');
      buildFramePicker();
      applyFrame(FRAMES[0]);
    }

    function retake() {
      photos = []; shotIndex = 0;
      document.getElementById('stepStudio').classList.remove('active');
      document.getElementById('stepCamera').classList.add('active');
      document.getElementById('btnReady').disabled = true;
      document.getElementById('countNum').textContent = '';
      updateDots();
      initCamera();
    }

    // ===== Frames =====
    // ===== UNIQUE FRAME THUMBNAIL SVG GENERATORS =====
    function makeFrameSVG(f) {
      const w = 42, h = 54;
      const id = f.id;
      const bg = f.bg, border = f.border, accent = f.accent;

      // Floral frames (1-5)
      if (id === 1) { // Cherry Blossom - scattered petals border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="1.5"/>
          <rect x="6" y="6" width="30" height="42" rx="1" fill="white" opacity="0.5"/>
          ${[  [5,5],[w-7,5],[5,h-7],[w-7,h-7],[5,h/2],[w-7,h/2],[w/2,4],[w/2,h-4] ].map(([x,y]) =>
            `<g transform="translate(${x},${y})">
              <ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(0)"/>
              <ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(72)"/>
              <ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(144)"/>
              <ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(216)"/>
              <ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(288)"/>
              <circle cx="0" cy="0" r="1.5" fill="#ffe0f0"/>
            </g>`).join('')}
        </svg>`;
      }
      if (id === 2) { // Rose Garden - vine border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="none" stroke="#c0d090" stroke-width="1" stroke-dasharray="3,2"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          ${[[4,4],[38,4],[4,50],[38,50],[4,27],[38,27],[21,4],[21,50]].map(([x,y])=>
            `<circle cx="${x}" cy="${y}" r="3" fill="#e87090"/><circle cx="${x}" cy="${y}" r="1.5" fill="#ffb0c8"/>`).join('')}
          <path d="M3,12 Q12,9 21,12 Q30,15 39,12" stroke="#80b040" stroke-width="1" fill="none"/>
          <path d="M3,40 Q12,37 21,40 Q30,43 39,40" stroke="#80b040" stroke-width="1" fill="none"/>
        </svg>`;
      }
      if (id === 3) { // Lavender Dream - wave + dots
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <path d="M0,8 Q10,4 21,8 Q32,12 42,8 L42,0 L0,0 Z" fill="${accent}"/>
          <path d="M0,46 Q10,50 21,46 Q32,42 42,46 L42,54 L0,54 Z" fill="${accent}"/>
          <rect x="2" y="2" width="38" height="50" rx="2" fill="none" stroke="${border}" stroke-width="1.5"/>
          ${[6,14,22,30,38].map(x=>`<circle cx="${x}" cy="27" r="1.5" fill="${border}"/>`).join('')}
          <text x="21" y="18" text-anchor="middle" font-size="10">💜</text>
          <text x="21" y="44" text-anchor="middle" font-size="8">✨</text>
        </svg>`;
      }
      if (id === 4) { // Sunflower Pop - sunray border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          ${Array.from({length:20},(_,i)=>{const a=i*18*Math.PI/180,x1=21+14*Math.cos(a),y1=27+18*Math.sin(a),x2=21+18*Math.cos(a),y2=27+22*Math.sin(a);return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e0b800" stroke-width="1.5"/>`;}).join('')}
          <rect x="4" y="5" width="34" height="44" rx="2" fill="${bg}" stroke="${border}" stroke-width="2"/>
          <text x="21" y="30" text-anchor="middle" font-size="14">🌻</text>
        </svg>`;
      }
      if (id === 5) { // Daisy Fields - dotted grass bottom
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="40" width="${w}" height="14" rx="0" fill="#c8f090"/>
          <rect x="0" y="38" width="${w}" height="4" fill="#90d060"/>
          ${[4,10,16,22,28,34,40].map(x=>`<rect x="${x}" y="30" width="2" height="10" fill="#60a030"/>`).join('')}
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          <text x="21" y="24" text-anchor="middle" font-size="12">🌼</text>
          <text x="9" y="39" text-anchor="middle" font-size="8">🌸</text>
          <text x="33" y="39" text-anchor="middle" font-size="8">🌸</text>
        </svg>`;
      }

      // Kawaii frames (6-12)
      if (id === 6) { // Kawaii Pink - bow corners
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="4" y="4" width="34" height="46" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          <rect x="4" y="4" width="34" height="8" rx="2" fill="${accent}"/>
          <rect x="4" y="42" width="34" height="8" rx="2" fill="${accent}"/>
          ${[[5,5],[37,5],[5,49],[37,49]].map(([x,y])=>`<text x="${x}" y="${y+4}" text-anchor="middle" font-size="8">🎀</text>`).join('')}
          <text x="21" y="32" text-anchor="middle" font-size="12">💖</text>
        </svg>`;
      }
      if (id === 7) { // Bunny Hop - bunny ear corners
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <ellipse cx="6" cy="8" rx="3" ry="6" fill="#e0d0ff"/><ellipse cx="6" cy="8" rx="1.5" ry="4" fill="#ffb0d0"/>
          <ellipse cx="36" cy="8" rx="3" ry="6" fill="#e0d0ff"/><ellipse cx="36" cy="8" rx="1.5" ry="4" fill="#ffb0d0"/>
          <rect x="4" y="10" width="34" height="40" rx="3" fill="none" stroke="${border}" stroke-width="1.5"/>
          <text x="21" y="35" text-anchor="middle" font-size="14">🐰</text>
          ${[8,16,24,32,40].map(x=>`<circle cx="${x}" cy="52" r="1" fill="${border}"/>`).join('')}
        </svg>`;
      }
      if (id === 8) { // Star Girl - star burst corners
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="1.5" stroke-dasharray="2,2"/>
          ${[[5,5],[37,5],[5,49],[37,49]].map(([x,y])=>`
            <polygon points="${x},${y-4} ${x+1.5},${y-1} ${x+4},${y-1} ${x+2},${y+1} ${x+3},${y+4} ${x},${y+2} ${x-3},${y+4} ${x-2},${y+1} ${x-4},${y-1} ${x-1.5},${y-1}" fill="#e0c000"/>`).join('')}
          <text x="21" y="32" text-anchor="middle" font-size="13">⭐</text>
        </svg>`;
      }
      if (id === 9) { // Candy World - candy stripe border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="candy${id}" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="3" height="6" fill="#ff80a0"/><rect x="3" width="3" height="6" fill="#fff"/>
          </pattern></defs>
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="0" width="6" height="${h}" rx="2" fill="url(#candy${id})"/>
          <rect x="${w-6}" y="0" width="6" height="${h}" rx="2" fill="url(#candy${id})"/>
          <rect x="6" y="0" width="${w-12}" height="6" fill="url(#candy${id})"/>
          <rect x="6" y="${h-6}" width="${w-12}" height="6" fill="url(#candy${id})"/>
          <rect x="6" y="6" width="30" height="42" fill="${bg}"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">🍬</text>
        </svg>`;
      }
      if (id === 10) { // Strawberry - polka dot + red
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="dots${id}" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill="#ff8080" opacity="0.5"/>
          </pattern></defs>
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="0" width="7" height="${h}" fill="url(#dots${id})"/>
          <rect x="${w-7}" y="0" width="7" height="${h}" fill="url(#dots${id})"/>
          <rect x="7" y="0" width="${w-14}" height="7" fill="url(#dots${id})"/>
          <rect x="7" y="${h-7}" width="${w-14}" height="7" fill="url(#dots${id})"/>
          <rect x="3" y="3" width="36" height="48" rx="2" fill="none" stroke="${border}" stroke-width="2"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">🍓</text>
        </svg>`;
      }
      if (id === 11) { // Kitty Paws - paw print border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          ${[[5,12],[37,12],[5,42],[37,42],[21,5],[21,49]].map(([x,y])=>
            `<ellipse cx="${x}" cy="${y}" rx="3" ry="2.5" fill="${accent}"/>
             <circle cx="${x-2}" cy="${y-3}" r="1.2" fill="${accent}"/>
             <circle cx="${x+2}" cy="${y-3}" r="1.2" fill="${accent}"/>
             <circle cx="${x}" cy="${y-4}" r="1.2" fill="${accent}"/>`).join('')}
          <text x="21" y="31" text-anchor="middle" font-size="10">🐱</text>
        </svg>`;
      }
      if (id === 12) { // Sailor Moon - star + moon border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="url(#stars${id})" opacity="0.3"/>
          <defs><pattern id="stars${id}" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <text x="5" y="8" text-anchor="middle" font-size="6">⭐</text>
          </pattern></defs>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="${bg}"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          <text x="21" y="32" text-anchor="middle" font-size="14">🌙</text>
        </svg>`;
      }

      // Pastel frames (13-18)
      if (id === 13) { // Cotton Candy - gradient swirl
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="ccg${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffd0f8"/><stop offset="50%" stop-color="#d0f0ff"/><stop offset="100%" stop-color="#f0ffd0"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="url(#ccg${id})"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          <path d="M0,20 Q21,10 42,20" stroke="white" stroke-width="3" fill="none" opacity="0.6"/>
          <path d="M0,35 Q21,25 42,35" stroke="white" stroke-width="3" fill="none" opacity="0.6"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">🌈</text>
        </svg>`;
      }
      if (id === 14) { // Mint Cream - leaf border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          ${[0,8,16,24,32,40,48].map((y,i)=>`
            <path d="M${i%2===0?3:0},${y+3} Q${i%2===0?-2:8},${y+7} ${i%2===0?3:0},${y+11}" fill="#80d0b0"/>
            <path d="M${i%2===0?39:42},${y+3} Q${i%2===0?47:37},${y+7} ${i%2===0?39:42},${y+11}" fill="#80d0b0"/>
          `).join('')}
          <text x="21" y="31" text-anchor="middle" font-size="10">🌿</text>
        </svg>`;
      }
      if (id === 15) { // Baby Blue - cloud corners
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="4" y="4" width="34" height="46" rx="3" fill="none" stroke="${border}" stroke-width="1.5"/>
          ${[[5,6],[37,6],[5,50],[37,50]].map(([x,y])=>`
            <ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="white" opacity="0.8"/>
            <ellipse cx="${x-2}" cy="${y+1}" rx="3" ry="2.5" fill="white" opacity="0.8"/>
            <ellipse cx="${x+2}" cy="${y+1}" rx="3" ry="2.5" fill="white" opacity="0.8"/>`).join('')}
          <text x="21" y="32" text-anchor="middle" font-size="12">☁️</text>
        </svg>`;
      }
      if (id === 16) { // Peach Sorbet - wavy border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <path d="M4,4 Q10,0 16,4 Q22,8 28,4 Q34,0 40,4 L40,50 Q34,54 28,50 Q22,46 16,50 Q10,54 4,50 Z" fill="none" stroke="${border}" stroke-width="2"/>
          <rect x="6" y="8" width="30" height="38" rx="2" fill="white" opacity="0.4"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">🍑</text>
        </svg>`;
      }
      if (id === 17) { // Lilac Mist - dots grid border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="lg${id}" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1" fill="${border}" opacity="0.5"/>
          </pattern></defs>
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="0" width="8" height="${h}" fill="url(#lg${id})"/>
          <rect x="${w-8}" y="0" width="8" height="${h}" fill="url(#lg${id})"/>
          <rect x="8" y="0" width="${w-16}" height="8" fill="url(#lg${id})"/>
          <rect x="8" y="${h-8}" width="${w-16}" height="8" fill="url(#lg${id})"/>
          <rect x="8" y="8" width="26" height="38" fill="${bg}"/>
          <text x="21" y="32" text-anchor="middle" font-size="11">💜</text>
        </svg>`;
      }
      if (id === 18) { // Butter Yellow - honeycomb border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="2.5"/>
          <path d="M4,4 L11,4 L14,10 L11,16 L4,16 Z" fill="${accent}" stroke="${border}" stroke-width="0.5"/>
          <path d="M38,4 L31,4 L28,10 L31,16 L38,16 Z" fill="${accent}" stroke="${border}" stroke-width="0.5"/>
          <path d="M4,50 L11,50 L14,44 L11,38 L4,38 Z" fill="${accent}" stroke="${border}" stroke-width="0.5"/>
          <path d="M38,50 L31,50 L28,44 L31,38 L38,38 Z" fill="${accent}" stroke="${border}" stroke-width="0.5"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">🌼</text>
        </svg>`;
      }

      // Retro frames (19-24)
      if (id === 19) { // Vintage Strip - film holes
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="2" fill="#1a1008"/>
          ${[4,12,20,28,36,44].map(y=>`
            <rect x="2" y="${y}" width="5" height="5" rx="1" fill="#333"/>
            <rect x="${w-7}" y="${y}" width="5" height="5" rx="1" fill="#333"/>`).join('')}
          <rect x="9" y="3" width="24" height="48" rx="1" fill="${bg}"/>
          <rect x="9" y="3" width="24" height="48" rx="1" fill="none" stroke="${border}" stroke-width="1"/>
          <text x="21" y="31" text-anchor="middle" font-size="10">📷</text>
        </svg>`;
      }
      if (id === 20) { // Film Noir - black and white checker
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="checker${id}" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="3" height="3" fill="#222"/><rect x="3" y="3" width="3" height="3" fill="#222"/>
            <rect x="3" y="0" width="3" height="3" fill="#eee"/><rect x="0" y="3" width="3" height="3" fill="#eee"/>
          </pattern></defs>
          <rect width="${w}" height="${h}" rx="3" fill="url(#checker${id})"/>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="#f2f2f2"/>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="none" stroke="#404040" stroke-width="2"/>
          <text x="21" y="31" text-anchor="middle" font-size="10">🎬</text>
        </svg>`;
      }
      if (id === 21) { // Kodak - yellow top/bottom bands
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="0" width="${w}" height="10" rx="2" fill="#e8b820"/>
          <rect x="0" y="${h-10}" width="${w}" height="10" rx="2" fill="#e8b820"/>
          <rect x="3" y="10" width="36" height="34" fill="${bg}"/>
          <rect x="2" y="2" width="38" height="50" rx="2" fill="none" stroke="#d09010" stroke-width="1.5"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">📸</text>
        </svg>`;
      }
      if (id === 22) { // Disco - geometric triangles
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="#f0f0ff"/>
          <polygon points="0,0 12,0 0,12" fill="#c090f0"/><polygon points="${w},0 ${w-12},0 ${w},12" fill="#c090f0"/>
          <polygon points="0,${h} 12,${h} 0,${h-12}" fill="#c090f0"/><polygon points="${w},${h} ${w-12},${h} ${w},${h-12}" fill="#c090f0"/>
          <rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="1.5"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">🪩</text>
        </svg>`;
      }
      if (id === 23) { // Pop Art - thick bold border + halftone
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="half${id}" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#ff0000" opacity="0.4"/>
          </pattern></defs>
          <rect width="${w}" height="${h}" rx="0" fill="#ffff80"/>
          <rect x="0" y="0" width="${w}" height="${h}" fill="url(#half${id})"/>
          <rect x="5" y="5" width="32" height="44" rx="0" fill="white" stroke="#ff0000" stroke-width="3"/>
          <text x="21" y="30" text-anchor="middle" font-size="10" font-weight="bold" fill="#ff0000">POP</text>
          <text x="21" y="42" text-anchor="middle" font-size="8">ART!</text>
        </svg>`;
      }
      if (id === 24) { // Retro Pink - groovy swirls
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <circle cx="5" cy="5" r="8" fill="none" stroke="${border}" stroke-width="1.5"/>
          <circle cx="${w-5}" cy="5" r="8" fill="none" stroke="${border}" stroke-width="1.5"/>
          <circle cx="5" cy="${h-5}" r="8" fill="none" stroke="${border}" stroke-width="1.5"/>
          <circle cx="${w-5}" cy="${h-5}" r="8" fill="none" stroke="${border}" stroke-width="1.5"/>
          <rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="2"/>
          <text x="21" y="32" text-anchor="middle" font-size="11">💋</text>
        </svg>`;
      }

      // Seasonal frames (25-30)
      if (id === 25) { // Winter Frost - snowflake corners
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="snow${id}" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <text x="5" y="8" text-anchor="middle" font-size="6" opacity="0.25">❄</text>
          </pattern></defs>
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="0" width="${w}" height="${h}" fill="url(#snow${id})"/>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="rgba(255,255,255,0.7)"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          ${[[5,5],[37,5],[5,49],[37,49]].map(([x,y])=>`<text x="${x}" y="${y+5}" text-anchor="middle" font-size="9">❄️</text>`).join('')}
          <text x="21" y="32" text-anchor="middle" font-size="10">⛄</text>
        </svg>`;
      }
      if (id === 26) { // Summer Breeze - waves + sun
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="sky${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#87ceeb"/><stop offset="60%" stop-color="#87ceeb"/><stop offset="100%" stop-color="#70c8e8"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="url(#sky${id})"/>
          <rect x="0" y="36" width="${w}" height="18" rx="2" fill="#1a9050"/>
          <path d="M0,34 Q10,30 21,34 Q32,38 42,34 L42,38 Q32,42 21,38 Q10,34 0,38 Z" fill="#50b0d0"/>
          <circle cx="32" cy="10" r="6" fill="#ffe040"/>
          ${[0,45,90,135,180,225,270,315].map(a=>{const r=a*Math.PI/180;return `<line x1="${32+6*Math.cos(r)}" y1="${10+6*Math.sin(r)}" x2="${32+9*Math.cos(r)}" y2="${10+9*Math.sin(r)}" stroke="#ffe040" stroke-width="1.5"/>`}).join('')}
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="1.5"/>
          <text x="11" y="26" text-anchor="middle" font-size="10">🌊</text>
        </svg>`;
      }
      if (id === 27) { // Autumn Leaves - leaf scatter
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          ${[
            [5,5,'🍁'],[37,5,'🍂'],[5,49,'🍂'],[37,49,'🍁'],
            [5,27,'🍁'],[37,27,'🍂'],[21,4,'🍄'],[21,50,'🍁']
          ].map(([x,y,e])=>`<text x="${x}" y="${y+4}" text-anchor="middle" font-size="9">${e}</text>`).join('')}
          <text x="21" y="32" text-anchor="middle" font-size="12">🍂</text>
        </svg>`;
      }
      if (id === 28) { // Spring Fresh - growing vines
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <path d="M3,54 Q3,40 8,30 Q14,18 8,6 Q5,0 3,0" stroke="#60b060" stroke-width="2" fill="none"/>
          <path d="M39,54 Q39,40 34,30 Q28,18 34,6 Q37,0 39,0" stroke="#60b060" stroke-width="2" fill="none"/>
          ${[10,20,30,40].map(y=>`
            <ellipse cx="10" cy="${y}" rx="4" ry="6" fill="#90d060" transform="rotate(-20 10 ${y})"/>
            <ellipse cx="32" cy="${y+5}" rx="4" ry="6" fill="#90d060" transform="rotate(20 32 ${y+5})"/>
          `).join('')}
          <rect x="7" y="4" width="28" height="46" rx="2" fill="${bg}" opacity="0.7"/>
          <text x="21" y="30" text-anchor="middle" font-size="12">🌱</text>
          <text x="21" y="44" text-anchor="middle" font-size="8">🦋</text>
        </svg>`;
      }
      if (id === 29) { // Xmas Magic - christmas pattern
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="#c02020"/>
          ${Array.from({length:5},(_,i)=>`<line x1="0" y1="${i*12}" x2="${w}" y2="${i*12+12}" stroke="#fff" stroke-width="0.5" opacity="0.2"/>`).join('')}
          <rect x="4" y="4" width="34" height="46" rx="2" fill="white"/>
          <rect x="4" y="4" width="34" height="8" rx="2" fill="#e04040"/>
          <rect x="4" y="42" width="34" height="8" rx="2" fill="#e04040"/>
          <text x="21" y="14" text-anchor="middle" font-size="7" fill="white">⭐⭐⭐</text>
          <text x="21" y="32" text-anchor="middle" font-size="14">🎄</text>
          <text x="21" y="46" text-anchor="middle" font-size="7" fill="white">🎁 🎁</text>
        </svg>`;
      }
      if (id === 30) { // Halloween - spiderweb corner
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="#1a0a00"/>
          <g stroke="#666" stroke-width="0.5" fill="none">
            <line x1="0" y1="0" x2="12" y2="12"/><line x1="6" y1="0" x2="12" y2="6"/><line x1="0" y1="6" x2="6" y2="12"/>
            <path d="M2,2 Q7,2 7,7"/><path d="M4,0 Q10,0 10,6"/>
          </g>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="#fff8e8"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="1.5"/>
          <text x="21" y="28" text-anchor="middle" font-size="12">🎃</text>
          <text x="21" y="42" text-anchor="middle" font-size="10">🦇</text>
        </svg>`;
      }

      // Minimal (31-35)
      if (id === 31) { // Pure White - thin double border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="white"/>
          <rect x="2" y="2" width="38" height="50" rx="2" fill="none" stroke="#d0d0d0" stroke-width="1"/>
          <rect x="5" y="5" width="32" height="44" rx="1" fill="none" stroke="#e8e8e8" stroke-width="0.5"/>
          <text x="21" y="30" text-anchor="middle" font-size="10" fill="#aaa">✦</text>
          <text x="21" y="42" text-anchor="middle" font-size="8" fill="#bbb">○  ○</text>
        </svg>`;
      }
      if (id === 32) { // Gold Foil - shimmer lines
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="gold${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f5d900"/><stop offset="40%" stop-color="#fffbe0"/><stop offset="100%" stop-color="#c8a800"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="#fffbf0"/>
          <rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="url(#gold${id})" opacity="0.2"/>
          <rect x="2" y="2" width="38" height="50" rx="3" fill="none" stroke="url(#gold${id})" stroke-width="3"/>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="none" stroke="#e0c000" stroke-width="0.5"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">✨</text>
        </svg>`;
      }
      if (id === 33) { // Silver Lining - brushed metal
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="silver${id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#909090"/><stop offset="40%" stop-color="#e0e0e0"/><stop offset="70%" stop-color="#b0b0b0"/><stop offset="100%" stop-color="#808080"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="url(#silver${id})"/>
          <rect x="4" y="4" width="34" height="46" rx="2" fill="#f8f8f8"/>
          <rect x="2" y="2" width="38" height="50" rx="3" fill="none" stroke="url(#silver${id})" stroke-width="3"/>
          <text x="21" y="32" text-anchor="middle" font-size="10" fill="#606060">◈  ◇</text>
        </svg>`;
      }
      if (id === 34) { // Marble Blush - marble texture
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="#fff8f6"/>
          <path d="M5,0 Q15,15 10,30 Q5,45 15,54" stroke="#e8c0b0" stroke-width="2" fill="none" opacity="0.5"/>
          <path d="M20,0 Q25,10 30,25 Q35,40 25,54" stroke="#ddb0a0" stroke-width="1.5" fill="none" opacity="0.4"/>
          <path d="M35,5 Q30,20 38,35 Q42,45 35,54" stroke="#e8c0b0" stroke-width="1" fill="none" opacity="0.3"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          <text x="21" y="32" text-anchor="middle" font-size="10" fill="${border}">◇  ✦</text>
        </svg>`;
      }
      if (id === 35) { // Ink & Paper - handwritten lines
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="#faf8f0"/>
          ${[10,16,22,28,34,40,46].map(y=>`<line x1="5" y1="${y}" x2="37" y2="${y}" stroke="#c0b090" stroke-width="0.5"/>`).join('')}
          <rect x="3" y="3" width="36" height="48" rx="2" fill="none" stroke="${border}" stroke-width="1.5"/>
          <line x1="10" y1="3" x2="10" y2="51" stroke="#e0d0b0" stroke-width="1"/>
          <text x="21" y="30" text-anchor="middle" font-size="10">🖊️</text>
          <text x="21" y="44" text-anchor="middle" font-size="7" fill="#806040">love</text>
        </svg>`;
      }

      // Fun (36-40)
      if (id === 36) { // Rainbow - arc rainbow
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          ${['#ff4444','#ff8800','#ffee00','#44cc44','#4488ff','#8844cc'].map((c,i)=>
            `<path d="M${4+i},${h} Q${w/2},${8+i*3} ${w-4-i},${h}" fill="none" stroke="${c}" stroke-width="2" opacity="0.7"/>`).join('')}
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="1.5"/>
          <text x="21" y="22" text-anchor="middle" font-size="8">☁️</text>
        </svg>`;
      }
      if (id === 37) { // Space Kei - star field
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="#0a0820"/>
          ${Array.from({length:30},(_,i)=>{const x=(i*17+7)%40,y=(i*23+5)%52;return `<circle cx="${x}" cy="${y}" r="${i%3===0?1.5:0.8}" fill="white" opacity="${0.4+i%4*0.15}"/>`}).join('')}
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="#4040a0" stroke-width="1.5"/>
          <text x="21" y="24" text-anchor="middle" font-size="10">🪐</text>
          <text x="21" y="40" text-anchor="middle" font-size="9">🚀</text>
        </svg>`;
      }
      if (id === 38) { // Mermaid - scales texture
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="scales${id}" x="0" y="0" width="8" height="7" patternUnits="userSpaceOnUse">
            <path d="M0,7 Q4,0 8,7" fill="none" stroke="#3090b0" stroke-width="0.8" opacity="0.4"/>
            <path d="M-4,3.5 Q0,-3.5 4,3.5" fill="none" stroke="#3090b0" stroke-width="0.8" opacity="0.4"/>
          </pattern></defs>
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="0" width="${w}" height="${h}" fill="url(#scales${id})"/>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="${bg}" opacity="0.8"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          <text x="21" y="30" text-anchor="middle" font-size="12">🧜</text>
          <text x="21" y="44" text-anchor="middle" font-size="8">🐚</text>
        </svg>`;
      }
      if (id === 39) { // Magic Girl - sparkle burst
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          ${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180,r1=18,r2=22,cx=21,cy=27;return `<line x1="${cx+r1*Math.cos(a)}" y1="${cy+r1*Math.sin(a)}" x2="${cx+r2*Math.cos(a)}" y2="${cy+r2*Math.sin(a)}" stroke="${border}" stroke-width="1" opacity="0.5"/>`}).join('')}
          <rect x="4" y="4" width="34" height="46" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          <text x="21" y="26" text-anchor="middle" font-size="12">🔮</text>
          <text x="21" y="40" text-anchor="middle" font-size="9">✨  ⭐</text>
        </svg>`;
      }
      if (id === 40) { // Y2K - chrome/futuristic
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="chrome${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a0c0e0"/><stop offset="50%" stop-color="#e0f0ff"/><stop offset="100%" stop-color="#80a0c0"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="0" width="10" height="${h}" fill="url(#chrome${id})" opacity="0.7"/>
          <rect x="${w-10}" y="0" width="10" height="${h}" fill="url(#chrome${id})" opacity="0.7"/>
          <rect x="10" y="0" width="${w-20}" height="8" fill="url(#chrome${id})" opacity="0.7"/>
          <rect x="10" y="${h-8}" width="${w-20}" height="8" fill="url(#chrome${id})" opacity="0.7"/>
          <rect x="10" y="8" width="22" height="38" fill="${bg}"/>
          <text x="21" y="26" text-anchor="middle" font-size="9">💿</text>
          <text x="21" y="38" text-anchor="middle" font-size="7">Y2K ⚡</text>
        </svg>`;
      }

      // Glam (41-45)
      if (id === 41) { // Rose Gold - diagonal gradient + gems
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="rg${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f0c0b0"/><stop offset="50%" stop-color="#ffd8c8"/><stop offset="100%" stop-color="#d09080"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="url(#rg${id})"/>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="white" opacity="0.5"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="#d09080" stroke-width="2.5"/>
          ${[[5,5],[37,5],[5,49],[37,49]].map(([x,y])=>`
            <polygon points="${x},${y-3} ${x+2},${y} ${x},${y+3} ${x-2},${y}" fill="#d09080"/>`).join('')}
          <text x="21" y="32" text-anchor="middle" font-size="12">🌹</text>
        </svg>`;
      }
      if (id === 42) { // Amethyst - gem pattern
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="ameth${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#c0a0f0"/><stop offset="100%" stop-color="#8060c0"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="url(#ameth${id})"/>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="#f8f0ff" opacity="0.8"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="#9070c0" stroke-width="2"/>
          ${[[5,5],[37,5],[5,49],[37,49]].map(([x,y])=>`
            <polygon points="${x},${y-4} ${x+3},${y} ${x},${y+4} ${x-3},${y}" fill="#c090e0"/>`).join('')}
          <text x="21" y="32" text-anchor="middle" font-size="12">💎</text>
        </svg>`;
      }
      if (id === 43) { // Champagne - bubbles
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="champ${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#e8d080"/><stop offset="100%" stop-color="#c09040"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="#fffcf0"/>
          <rect x="0" y="0" width="6" height="${h}" rx="2" fill="url(#champ${id})" opacity="0.6"/>
          <rect x="${w-6}" y="0" width="6" height="${h}" rx="2" fill="url(#champ${id})" opacity="0.6"/>
          <rect x="6" y="0" width="${w-12}" height="6" fill="url(#champ${id})" opacity="0.6"/>
          <rect x="6" y="${h-6}" width="${w-12}" height="6" fill="url(#champ${id})" opacity="0.6"/>
          ${[[8,10],[15,20],[25,8],[33,30],[10,40],[30,45],[20,35],[7,25]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${1+Math.random()}" fill="rgba(200,160,40,0.4)"/>`).join('')}
          <rect x="6" y="6" width="30" height="42" fill="#fffcf0"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">🥂</text>
        </svg>`;
      }
      if (id === 44) { // Holographic - rainbow shift
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="holo${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffb0e0"/><stop offset="25%" stop-color="#b0e0ff"/><stop offset="50%" stop-color="#ffe0b0"/><stop offset="75%" stop-color="#b0ffb0"/><stop offset="100%" stop-color="#e0b0ff"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="url(#holo${id})" opacity="0.8"/>
          <rect x="5" y="5" width="32" height="44" rx="2" fill="white" opacity="0.4"/>
          <rect x="2" y="2" width="38" height="50" rx="3" fill="none" stroke="url(#holo${id})" stroke-width="3"/>
          <text x="21" y="32" text-anchor="middle" font-size="12">🦄</text>
        </svg>`;
      }
      if (id === 45) { // Black Lace - lace pattern
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="lace${id}" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2" fill="none" stroke="#2a1020" stroke-width="0.5"/>
            <circle cx="0" cy="0" r="1" fill="#2a1020" opacity="0.5"/>
            <circle cx="8" cy="0" r="1" fill="#2a1020" opacity="0.5"/>
            <circle cx="0" cy="8" r="1" fill="#2a1020" opacity="0.5"/>
            <circle cx="8" cy="8" r="1" fill="#2a1020" opacity="0.5"/>
          </pattern></defs>
          <rect width="${w}" height="${h}" rx="3" fill="#fdf4f8"/>
          <rect x="0" y="0" width="7" height="${h}" fill="url(#lace${id})"/>
          <rect x="${w-7}" y="0" width="7" height="${h}" fill="url(#lace${id})"/>
          <rect x="7" y="0" width="${w-14}" height="7" fill="url(#lace${id})"/>
          <rect x="7" y="${h-7}" width="${w-14}" height="7" fill="url(#lace${id})"/>
          <rect x="7" y="7" width="28" height="40" fill="#fdf4f8"/>
          <text x="21" y="28" text-anchor="middle" font-size="11">🖤</text>
          <text x="21" y="42" text-anchor="middle" font-size="9">🌹</text>
        </svg>`;
      }

      // Nature (46-50)
      if (id === 46) { // Forest Fairy - mushroom/leaf border
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="0" y="${h-14}" width="${w}" height="14" rx="2" fill="#90d060"/>
          ${[3,10,17,24,31,38].map(x=>`<polygon points="${x},${h-14} ${x+3},${h-22} ${x+6},${h-14}" fill="#408040"/>`).join('')}
          <rect x="3" y="3" width="36" height="${h-16}" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          <text x="21" y="26" text-anchor="middle" font-size="11">🌿</text>
          <text x="10" y="40" text-anchor="middle" font-size="8">🍄</text>
          <text x="32" y="40" text-anchor="middle" font-size="8">🦋</text>
        </svg>`;
      }
      if (id === 47) { // Ocean Breeze - wave bands
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="ocean${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#87ceeb"/><stop offset="100%" stop-color="#1a6090"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="url(#ocean${id})"/>
          ${[10,20,30,40].map(y=>`<path d="M0,${y} Q10,${y-4} 21,${y} Q32,${y+4} 42,${y}" stroke="white" stroke-width="1" fill="none" opacity="0.4"/>`).join('')}
          <rect x="5" y="5" width="32" height="44" rx="2" fill="rgba(255,255,255,0.15)"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          <text x="21" y="30" text-anchor="middle" font-size="12">🌊</text>
          <text x="21" y="44" text-anchor="middle" font-size="8">🐚</text>
        </svg>`;
      }
      if (id === 48) { // Sunset Glow - gradient sky
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="sunset${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ff9060"/><stop offset="40%" stop-color="#ffb060"/><stop offset="70%" stop-color="#ff6040"/><stop offset="100%" stop-color="#c03020"/>
          </linearGradient></defs>
          <rect width="${w}" height="${h}" rx="3" fill="url(#sunset${id})"/>
          <rect x="0" y="${h-12}" width="${w}" height="12" rx="2" fill="#1a3010"/>
          ${[0,8,16,24,32].map(x=>`<polygon points="${x},${h-12} ${x+4},${h-20} ${x+8},${h-12}" fill="#2a5020"/>`).join('')}
          <rect x="4" y="4" width="34" height="${h-18}" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
          <circle cx="21" cy="18" r="8" fill="#ffe060" opacity="0.7"/>
          <text x="21" y="40" text-anchor="middle" font-size="10">🌅</text>
        </svg>`;
      }
      if (id === 49) { // Sakura Park - pink blossoms falling
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="${bg}"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>
          ${Array.from({length:14},(_,i)=>{
            const x=(i*13+5)%36+3, y=(i*17+8)%46+3;
            return `<g transform="translate(${x},${y}) rotate(${i*25})">
              <ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8"/>
              <ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8" transform="rotate(72)"/>
              <ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8" transform="rotate(144)"/>
              <ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8" transform="rotate(216)"/>
              <ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8" transform="rotate(288)"/>
              <circle r="1.5" fill="#ffe0f0"/>
            </g>`;}).join('')}
        </svg>`;
      }
      if (id === 50) { // Moonlit Night - starry dark
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${w}" height="${h}" rx="3" fill="#0e0c24"/>
          ${Array.from({length:35},(_,i)=>{const x=(i*13+3)%40,y=(i*17+3)%52;return `<circle cx="${x}" cy="${y}" r="${i%5===0?1.5:0.7}" fill="white" opacity="${0.3+i%5*0.15}"/>`}).join('')}
          <path d="M28,8 Q22,14 22,20 Q22,28 30,30 Q20,32 14,26 Q10,20 14,14 Q18,8 28,8 Z" fill="#e0e080" opacity="0.85"/>
          <rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="#4040a0" stroke-width="1.5"/>
          <text x="21" y="48" text-anchor="middle" font-size="9" fill="#8090f0">✦ dream ✦</text>
        </svg>`;
      }

      // Default fallback
      return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${w}" height="${h}" rx="3" fill="${bg}" stroke="${border}" stroke-width="2"/>
        <text x="${w/2}" y="${h/2+4}" text-anchor="middle" font-size="14">${f.s[0]}</text>
      </svg>`;
    }

    function buildFramePicker() {
      const container = document.getElementById('framesContainer');
      container.innerHTML = '';
      const cats = {};
      FRAMES.forEach(f => { if(!cats[f.cat]) cats[f.cat] = []; cats[f.cat].push(f); });
      Object.entries(cats).forEach(([cat, frames]) => {
        const sec = document.createElement('div');
        sec.className = 'frames-category';
        sec.innerHTML = `<div class="cat-label">${cat}</div><div class="frames-row"></div>`;
        container.appendChild(sec);
        const row = sec.querySelector('.frames-row');
        frames.forEach(f => {
          const btn = document.createElement('button');
          btn.className = 'frame-thumb-btn' + (f.id === 1 ? ' active' : '');
          btn.title = f.name;
          const svgHTML = makeFrameSVG(f);
          btn.innerHTML = `<div class="thumb-preview" style="padding:0;overflow:hidden;border:none;background:none">${svgHTML}</div><span class="thumb-label">${f.name}</span>`;
          btn.onclick = () => {
            document.querySelectorAll('.frame-thumb-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFrame(f);
          };
          row.appendChild(btn);
        });
      });
    }

    // Shared strip render params
    const STRIP = { PAD:20, PHOTO_W:360, PHOTO_H:270, GAP:8, TOP_BAND:56, BOT_BAND:64 };
    STRIP.W = STRIP.PHOTO_W + STRIP.PAD * 2;
    STRIP.H = STRIP.TOP_BAND + (STRIP.PHOTO_H + STRIP.GAP) * 4 - STRIP.GAP + STRIP.BOT_BAND;

    async function renderStripToCanvas(canvas, f, photoDataUrls, scale) {
      const { PAD, PHOTO_W, PHOTO_H, GAP, TOP_BAND, W, H } = STRIP;
      canvas.width = Math.round(W * scale);
      canvas.height = Math.round(H * scale);
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);

      // 1. Fill background
      ctx.fillStyle = f.bg;
      ctx.fillRect(0, 0, W, H);

      // 2. Draw photos
      for (let i = 0; i < TOTAL; i++) {
        if (!photoDataUrls[i]) continue;
        const img = new Image();
        img.src = photoDataUrls[i];
        await new Promise(r => { img.onload = r; img.onerror = r; });
        const y = TOP_BAND + i * (PHOTO_H + GAP);
        ctx.drawImage(img, PAD, y, PHOTO_W, PHOTO_H);
      }

      // 3. Generate and draw full-size frame SVG overlay
      const svgStr = makeFrameSVGFull(f, W, H, PAD, PHOTO_W, PHOTO_H, GAP);
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const fImg = new Image();
      await new Promise((res, rej) => { fImg.onload = res; fImg.onerror = rej; fImg.src = url; });
      ctx.drawImage(fImg, 0, 0, W, H);
      URL.revokeObjectURL(url);
    }

    function applyFrame(f) {
      currentFrame = f;
      const canvas = document.getElementById('stripPreviewCanvas');
      // Preview at 0.66x scale so it fits the panel (~260px wide)
      renderStripToCanvas(canvas, f, photos, 0.66).catch(console.error);
    }

    // ===== Full-size Frame SVG (mirrors makeFrameSVG at canvas dimensions) =====
    function makeFrameSVGFull(f, W, H, PAD, PHOTO_W, PHOTO_H, GAP) {
      const id = f.id;
      const bg = f.bg, border = f.border, accent = f.accent;
      // photo area starts at y = PAD (after top sticker row)
      // bottom band starts after last photo
      const photoAreaY = PAD + 40; // room for top stickers
      const captionY = photoAreaY + (PHOTO_H + GAP) * TOTAL + 8;

      // Helper: scale a thumbnail coordinate (0..42) to full width
      const sx = v => (v / 42) * W;
      const sy = v => (v / 54) * H;

      // Build a clipPath that covers only the BORDER region (full rect minus photo slots).
      // This ensures any frameBg/frameOverlay fill never blocks photos drawn on canvas underneath.
      const { TOP_BAND } = STRIP;
      // Generate photo-slot hole rects (one per photo)
      const photoHoles = Array.from({length: TOTAL}, (_, i) => {
        const py = TOP_BAND + i * (PHOTO_H + GAP);
        return `<rect x="${PAD}" y="${py}" width="${PHOTO_W}" height="${PHOTO_H}"/>`;
      }).join('');
      // The borderClip mask: full rect with photo holes cut out (evenodd rule)
      const borderClipId = `borderClip_${id}`;
      const borderClipDef = `<clipPath id="${borderClipId}" clipPathUnits="userSpaceOnUse">
        <path fill-rule="evenodd" d="
          M0,0 L${W},0 L${W},${H} L0,${H} Z
          ${Array.from({length: TOTAL}, (_, i) => {
            const py = TOP_BAND + i * (PHOTO_H + GAP);
            return `M${PAD},${py} L${PAD+PHOTO_W},${py} L${PAD+PHOTO_W},${py+PHOTO_H} L${PAD},${py+PHOTO_H} Z`;
          }).join(' ')}
        "/>
      </clipPath>`;

      // --- unique per-frame SVG backgrounds / borders ---
      // frameBg is now transparent by default — background color is painted on canvas directly
      let frameBg = ``;
      let frameOverlay = '';

      if (id === 1) { // Cherry Blossom - scattered petals all around border
        const petalPositions = [];
        for (let i = 0; i < 28; i++) {
          // left edge
          petalPositions.push([PAD * 0.4, (H / 27) * i]);
          // right edge
          petalPositions.push([W - PAD * 0.4, (H / 27) * i]);
        }
        for (let i = 0; i < 18; i++) {
          petalPositions.push([(W / 17) * i, PAD * 0.4]);
          petalPositions.push([(W / 17) * i, H - PAD * 0.4]);
        }
        const petals = petalPositions.map(([px, py], idx) => {
          const rot = idx * 37;
          return `<g transform="translate(${px},${py}) rotate(${rot})">
            <ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75"/>
            <ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75" transform="rotate(72 0 0)"/>
            <ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75" transform="rotate(144 0 0)"/>
            <ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75" transform="rotate(216 0 0)"/>
            <ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75" transform="rotate(288 0 0)"/>
            <circle r="3" fill="#ffe0f0"/>
          </g>`;
        }).join('');
        frameOverlay = `${petals}
          <rect x="${PAD}" y="${PAD}" width="${W - PAD*2}" height="${H - PAD*2}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 2) { // Rose Garden - rose corner decorations
        const corners = [[PAD, PAD], [W-PAD, PAD], [PAD, H-PAD], [W-PAD, H-PAD]];
        const roses = corners.map(([cx, cy]) =>
          `<g transform="translate(${cx},${cy})">
            <circle r="12" fill="#e87090" opacity="0.85"/>
            <circle r="8" fill="#ff9ab0"/>
            <circle r="5" fill="#ffb8c8"/>
            <circle r="2.5" fill="#ffe0e8"/>
          </g>`).join('');
        frameOverlay = `${roses}
          <rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="6" fill="none" stroke="${border}" stroke-width="5"/>`;
      } else if (id === 3) { // Lavender Dream - wavy top/bottom accent bands
        frameOverlay = `
          <path d="M0,${PAD} Q${W*0.25},${PAD-10} ${W*0.5},${PAD} Q${W*0.75},${PAD+10} ${W},${PAD} L${W},0 L0,0 Z" fill="${accent}"/>
          <path d="M0,${H-PAD} Q${W*0.25},${H-PAD-10} ${W*0.5},${H-PAD} Q${W*0.75},${H-PAD+10} ${W},${H-PAD} L${W},${H} L0,${H} Z" fill="${accent}"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="8" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 4) { // Sunflower Pop - sunray border
        const rays = Array.from({length:36}, (_,i) => {
          const a = i * 10 * Math.PI / 180;
          const r1 = Math.min(W, H) * 0.48, r2 = Math.min(W, H) * 0.52;
          const cx = W/2, cy = H/2;
          return `<line x1="${cx + r1*Math.cos(a)}" y1="${cy + r1*Math.sin(a)}" x2="${cx + r2*Math.cos(a)}" y2="${cy + r2*Math.sin(a)}" stroke="#e0b800" stroke-width="5"/>`;
        }).join('');
        frameOverlay = `${rays}
          <rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="6" fill="none" stroke="${border}" stroke-width="5"/>`;
      } else if (id === 5) { // Daisy Fields - grass bottom strip
        const grass = Array.from({length: Math.floor(W/8)}, (_,i) =>
          `<rect x="${i*8+1}" y="${H - PAD*1.2}" width="3" height="${PAD*0.9}" rx="1" fill="#60a030"/>`).join('');
        frameOverlay = `
          <rect x="0" y="${H-PAD*1.5}" width="${W}" height="${PAD*1.5}" fill="#c8f090"/>
          <rect x="0" y="${H-PAD*1.8}" width="${W}" height="${PAD*0.4}" fill="#90d060"/>
          ${grass}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 6) { // Kawaii Pink - bow corners + accent bands
        const corners = [[PAD*0.4,PAD*0.4],[W-PAD*0.4,PAD*0.4],[PAD*0.4,H-PAD*0.4],[W-PAD*0.4,H-PAD*0.4]];
        const bows = corners.map(([cx,cy]) =>
          `<text x="${cx}" y="${cy+8}" text-anchor="middle" font-size="28">🎀</text>`).join('');
        frameOverlay = `
          <rect x="0" y="0" width="${W}" height="${PAD*1.2}" rx="4" fill="${accent}"/>
          <rect x="0" y="${H-PAD*1.2}" width="${W}" height="${PAD*1.2}" rx="4" fill="${accent}"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>
          ${bows}`;
      } else if (id === 7) { // Bunny Hop - bunny ears top corners
        frameOverlay = `
          <ellipse cx="${PAD*0.6}" cy="${PAD*0.5}" rx="10" ry="22" fill="#e0d0ff"/>
          <ellipse cx="${PAD*0.6}" cy="${PAD*0.5}" rx="5" ry="14" fill="#ffb0d0"/>
          <ellipse cx="${W-PAD*0.6}" cy="${PAD*0.5}" rx="10" ry="22" fill="#e0d0ff"/>
          <ellipse cx="${W-PAD*0.6}" cy="${PAD*0.5}" rx="5" ry="14" fill="#ffb0d0"/>
          <rect x="${PAD/2}" y="${PAD}" width="${W-PAD}" height="${H-PAD*1.5}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 8) { // Star Girl - dashed border + star corners
        const corners = [[PAD*0.4,PAD*0.4],[W-PAD*0.4,PAD*0.4],[PAD*0.4,H-PAD*0.4],[W-PAD*0.4,H-PAD*0.4]];
        const stars = corners.map(([cx,cy]) => {
          const pts = Array.from({length:5}, (_,i) => {
            const a = (i*72-90)*Math.PI/180, b = (i*72-90+36)*Math.PI/180;
            return `${cx+14*Math.cos(a)},${cy+14*Math.sin(a)} ${cx+6*Math.cos(b)},${cy+6*Math.sin(b)}`;
          }).join(' ');
          return `<polygon points="${pts}" fill="#e0c000"/>`;
        }).join('');
        frameOverlay = `${stars}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="3" stroke-dasharray="8,6"/>`;
      } else if (id === 9) { // Candy World - candy stripe border
        frameOverlay = `
          <defs><pattern id="candyFull" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="16" fill="#ff80a0"/><rect x="8" width="8" height="16" fill="#fff"/>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#candyFull)"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#candyFull)"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#candyFull)"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#candyFull)"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="#ff80a0" stroke-width="2"/>`;
      } else if (id === 10) { // Strawberry - polka dots border
        frameOverlay = `
          <defs><pattern id="dotsFull" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="4" fill="#ff8080" opacity="0.5"/>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#dotsFull)"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#dotsFull)"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#dotsFull)"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#dotsFull)"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="5"/>`;
      } else if (id === 11) { // Kitty Paws - paw prints on border
        const pawPositions = [
          [PAD*0.5, H*0.15], [PAD*0.5, H*0.4], [PAD*0.5, H*0.65],
          [W-PAD*0.5, H*0.25], [W-PAD*0.5, H*0.5], [W-PAD*0.5, H*0.75],
          [W*0.25, PAD*0.5], [W*0.75, PAD*0.5],
          [W*0.25, H-PAD*0.5], [W*0.75, H-PAD*0.5]
        ];
        const paws = pawPositions.map(([px,py]) =>
          `<ellipse cx="${px}" cy="${py}" rx="8" ry="7" fill="${accent}"/>
           <circle cx="${px-5}" cy="${py-8}" r="3.5" fill="${accent}"/>
           <circle cx="${px+5}" cy="${py-8}" r="3.5" fill="${accent}"/>
           <circle cx="${px}" cy="${py-10}" r="3.5" fill="${accent}"/>`).join('');
        frameOverlay = `${paws}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="8" fill="none" stroke="${border}" stroke-width="5"/>`;
      } else if (id === 12) { // Sailor Moon - stars pattern border
        frameOverlay = `
          <defs><pattern id="starsFull" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <text x="14" y="20" text-anchor="middle" font-size="16">⭐</text>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#starsFull)" opacity="0.6"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#starsFull)" opacity="0.6"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#starsFull)" opacity="0.6"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#starsFull)" opacity="0.6"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="5"/>`;
      } else if (id === 13) { // Cotton Candy - gradient border bands + wave lines
        frameOverlay = `
          <defs><linearGradient id="ccgFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffd0f8"/><stop offset="50%" stop-color="#d0f0ff"/><stop offset="100%" stop-color="#f0ffd0"/>
          </linearGradient></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#ccgFull)" opacity="0.9"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#ccgFull)" opacity="0.9"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#ccgFull)" opacity="0.9"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#ccgFull)" opacity="0.9"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="8" fill="none" stroke="#d0b0f0" stroke-width="3"/>`;
      } else if (id === 14) { // Mint Cream - leaf side decorations
        const leaves = Array.from({length:10}, (_,i) => {
          const y = (H / 9) * i;
          return `
            <path d="M${PAD},${y+10} Q${-5},${y+18} ${PAD},${y+26}" fill="#80d0b0"/>
            <path d="M${W-PAD},${y+10} Q${W+5},${y+18} ${W-PAD},${y+26}" fill="#80d0b0"/>`;
        }).join('');
        frameOverlay = `${leaves}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 15) { // Baby Blue - cloud corners
        const cloudCorners = [[PAD,PAD],[W-PAD,PAD],[PAD,H-PAD],[W-PAD,H-PAD]];
        const clouds = cloudCorners.map(([cx,cy]) =>
          `<ellipse cx="${cx}" cy="${cy}" rx="18" ry="11" fill="white" opacity="0.85"/>
           <ellipse cx="${cx-7}" cy="${cy+4}" rx="12" ry="9" fill="white" opacity="0.85"/>
           <ellipse cx="${cx+7}" cy="${cy+4}" rx="12" ry="9" fill="white" opacity="0.85"/>`).join('');
        frameOverlay = `${clouds}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="8" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 16) { // Peach Sorbet - wavy border path
        frameOverlay = `
          <path d="M${PAD},${PAD} Q${W*0.25},${PAD-12} ${W*0.5},${PAD} Q${W*0.75},${PAD+12} ${W-PAD},${PAD}
                   L${W-PAD},${H-PAD} Q${W*0.75},${H-PAD-12} ${W*0.5},${H-PAD} Q${W*0.25},${H-PAD+12} ${PAD},${H-PAD} Z"
                fill="none" stroke="${border}" stroke-width="5"/>`;
      } else if (id === 17) { // Lilac Mist - dotted border
        frameOverlay = `
          <defs><pattern id="lgFull" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="2.5" fill="${border}" opacity="0.5"/>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#lgFull)"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#lgFull)"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#lgFull)"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#lgFull)"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="2"/>`;
      } else if (id === 18) { // Butter Yellow - honeycomb border strips
        const hSize = 18;
        // Draw hexagon grid along the 4 border strips
        const hexRow = (x1, y1, x2, y2, count, horiz) => {
          return Array.from({length: count}, (_, i) => {
            const cx = horiz ? x1 + i * hSize * 1.8 : (x1 + x2) / 2;
            const cy = horiz ? (y1 + y2) / 2 : y1 + i * hSize * 1.8;
            const pts = Array.from({length:6}, (_, k) => {
              const a = (k * 60 - 30) * Math.PI / 180;
              return `${cx + hSize*0.55*Math.cos(a)},${cy + hSize*0.55*Math.sin(a)}`;
            }).join(' ');
            return `<polygon points="${pts}" fill="${accent}" stroke="${border}" stroke-width="1.2" opacity="0.85"/>`;
          }).join('');
        };
        const topHex = hexRow(0, 0, W, PAD, Math.ceil(W/(hSize*1.8)), true);
        const botHex = hexRow(0, H-PAD, W, H, Math.ceil(W/(hSize*1.8)), true);
        const leftHex = hexRow(0, 0, PAD, H, Math.ceil(H/(hSize*1.8)), false);
        const rightHex = hexRow(W-PAD, 0, W, H, Math.ceil(H/(hSize*1.8)), false);
        frameOverlay = `${topHex}${botHex}${leftHex}${rightHex}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="3"/>`;
      } else if (id === 19) { // Vintage Strip - film holes on sides
        const holeCount = Math.floor(H / 28);
        const holes = Array.from({length: holeCount}, (_,i) => {
          const y = 8 + i * 28;
          return `<rect x="4" y="${y}" width="12" height="12" rx="2" fill="#0a0502" opacity="0.9"/>
                  <rect x="${W-16}" y="${y}" width="12" height="12" rx="2" fill="#0a0502" opacity="0.9"/>`;
        }).join('');
        frameBg = ``;
        // Draw dark film strips only on left and right edges (not covering photos)
        frameOverlay = `
          <rect x="0" y="0" width="${PAD}" height="${H}" rx="2" fill="#2a1808"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" rx="2" fill="#2a1808"/>
          ${holes}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="3" fill="none" stroke="${border}" stroke-width="2"/>`;
      } else if (id === 20) { // Film Noir - checkerboard border
        frameOverlay = `
          <defs><pattern id="checkerFull" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#222"/><rect x="8" y="8" width="8" height="8" fill="#222"/>
            <rect x="8" y="0" width="8" height="8" fill="#eee"/><rect x="0" y="8" width="8" height="8" fill="#eee"/>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#checkerFull)"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#checkerFull)"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#checkerFull)"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#checkerFull)"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="3"/>`;
      } else if (id === 21) { // Kodak - yellow top/bottom bands
        frameOverlay = `
          <rect x="0" y="0" width="${W}" height="${PAD*1.5}" rx="4" fill="#e8b820"/>
          <rect x="0" y="${H-PAD*1.5}" width="${W}" height="${PAD*1.5}" rx="4" fill="#e8b820"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 22) { // Disco Fever - geometric triangles border
        const tris = [];
        for(let i=0;i<Math.floor(W/20);i++){
          tris.push(`<polygon points="${i*20},0 ${i*20+10},${PAD} ${i*20+20},0" fill="${i%2===0?accent:border}"/>`);
          tris.push(`<polygon points="${i*20},${H} ${i*20+10},${H-PAD} ${i*20+20},${H}" fill="${i%2===0?border:accent}"/>`);
        }
        for(let i=0;i<Math.floor(H/20);i++){
          tris.push(`<polygon points="0,${i*20} ${PAD},${i*20+10} 0,${i*20+20}" fill="${i%2===0?accent:border}"/>`);
          tris.push(`<polygon points="${W},${i*20} ${W-PAD},${i*20+10} ${W},${i*20+20}" fill="${i%2===0?border:accent}"/>`);
        }
        frameOverlay = `${tris.join('')}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;
      } else if (id === 23) { // Pop Art - thick bold border
        frameOverlay = `
          <rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="none" stroke="#ff0000" stroke-width="${PAD}"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#ff6000" stroke-width="4"/>
          <rect x="${PAD*1.2}" y="${PAD*1.2}" width="${W-PAD*2.4}" height="${H-PAD*2.4}" rx="2" fill="none" stroke="#ff0000" stroke-width="2"/>`;
      } else if (id === 24) { // Retro Pink - groovy wavy sides
        const waveL = Array.from({length: Math.floor(H/20)}, (_,i) =>
          `Q${PAD*0.3},${i*20+10} ${PAD},${i*20+20}`).join(' ');
        const waveR = Array.from({length: Math.floor(H/20)}, (_,i) =>
          `Q${W-PAD*0.3},${i*20+10} ${W-PAD},${i*20+20}`).join(' ');
        frameOverlay = `
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="${accent}" opacity="0.7"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="${accent}" opacity="0.7"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="${accent}" opacity="0.7"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="${accent}" opacity="0.7"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="3"/>`;
      } else if (id === 25) { // Winter Frost - snowflake corners + icy border
        // Draw snowflakes at each corner (small, contained within PAD area)
        const snowCorners = [[PAD*1.2,PAD*1.2],[W-PAD*1.2,PAD*1.2],[PAD*1.2,H-PAD*1.2],[W-PAD*1.2,H-PAD*1.2]];
        const flakes = snowCorners.map(([cx,cy]) => {
          const arms = Array.from({length:6}, (_,i) => {
            const a = i*60*Math.PI/180;
            const len = PAD * 0.9;
            return `<line x1="${cx}" y1="${cy}" x2="${cx+len*Math.cos(a)}" y2="${cy+len*Math.sin(a)}" stroke="${border}" stroke-width="2.5"/>
                    <line x1="${cx+len*0.55*Math.cos(a)}" y1="${cy+len*0.55*Math.sin(a)}" x2="${cx+len*0.75*Math.cos(a+0.5)}" y2="${cy+len*0.75*Math.sin(a+0.5)}" stroke="${border}" stroke-width="1.8"/>
                    <line x1="${cx+len*0.55*Math.cos(a)}" y1="${cy+len*0.55*Math.sin(a)}" x2="${cx+len*0.75*Math.cos(a-0.5)}" y2="${cy+len*0.75*Math.sin(a-0.5)}" stroke="${border}" stroke-width="1.8"/>`;
          }).join('');
          return arms;
        }).join('');
        // Small snowflakes along the border edges
        const edgeFlakes = [
          [W/2, PAD*0.6], [W/2, H-PAD*0.6],
          [PAD*0.6, H/2], [W-PAD*0.6, H/2]
        ].map(([cx,cy]) => {
          const r = PAD * 0.5;
          return Array.from({length:6}, (_,i) => {
            const a = i*60*Math.PI/180;
            return `<line x1="${cx}" y1="${cy}" x2="${cx+r*Math.cos(a)}" y2="${cy+r*Math.sin(a)}" stroke="${border}" stroke-width="2" opacity="0.7"/>`;
          }).join('');
        }).join('');
        frameOverlay = `${flakes}${edgeFlakes}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="3" stroke-dasharray="6,4"/>`;
      } else if (id === 26) { // Summer Breeze - wave bands
        frameOverlay = `
          <path d="M0,${PAD} Q${W*0.25},${PAD*0.4} ${W*0.5},${PAD} Q${W*0.75},${PAD*1.6} ${W},${PAD} L${W},0 L0,0 Z" fill="${accent}"/>
          <path d="M0,${H-PAD} Q${W*0.25},${H-PAD*0.4} ${W*0.5},${H-PAD} Q${W*0.75},${H-PAD*1.6} ${W},${H-PAD} L${W},${H} L0,${H} Z" fill="${accent}"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 27) { // Autumn Leaves - leaf emoji corners
        const leafCorners = [[PAD*0.5,PAD*0.5,'🍁'],[W-PAD*0.5,PAD*0.5,'🍂'],[PAD*0.5,H-PAD*0.5,'🍂'],[W-PAD*0.5,H-PAD*0.5,'🍁']];
        const leafMids = [[PAD*0.5,H/2,'🍁'],[W-PAD*0.5,H/2,'🍂'],[W/2,PAD*0.5,'🍄'],[W/2,H-PAD*0.5,'🍁']];
        const allLeaves = [...leafCorners,...leafMids].map(([x,y,e]) =>
          `<text x="${x}" y="${y+10}" text-anchor="middle" font-size="22">${e}</text>`).join('');
        frameOverlay = `${allLeaves}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 28) { // Spring Fresh - vine sides
        const vines = Array.from({length: 8}, (_,i) => {
          const y = (H/7)*i;
          return `<ellipse cx="${PAD*0.7}" cy="${y+15}" rx="10" ry="16" fill="#90d060" transform="rotate(-20 ${PAD*0.7} ${y+15})"/>
                  <ellipse cx="${W-PAD*0.7}" cy="${y+22}" rx="10" ry="16" fill="#90d060" transform="rotate(20 ${W-PAD*0.7} ${y+22})"/>`;
        }).join('');
        frameOverlay = `
          <path d="M${PAD*0.5},${H} Q${PAD*0.5},${H*0.6} ${PAD},${H*0.4} Q${PAD*1.2},${H*0.2} ${PAD},0" stroke="#60b060" stroke-width="5" fill="none"/>
          <path d="M${W-PAD*0.5},${H} Q${W-PAD*0.5},${H*0.6} ${W-PAD},${H*0.4} Q${W-PAD*1.2},${H*0.2} ${W-PAD},0" stroke="#60b060" stroke-width="5" fill="none"/>
          ${vines}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="3"/>`;
      } else if (id === 29) { // Xmas Magic - red border + festive decorations
        frameOverlay = `
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="#c02020"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="#c02020"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="#c02020"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="#c02020"/>
          <text x="${W/2}" y="${PAD*0.8}" text-anchor="middle" font-size="16" fill="white">⭐ ⭐ ⭐ ⭐ ⭐</text>
          <text x="${W/2}" y="${H-PAD*0.3}" text-anchor="middle" font-size="16" fill="white">🎁 🎁 🎁</text>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#ff4040" stroke-width="3"/>`;
      } else if (id === 30) { // Halloween - spiderweb corner + dark border
        frameBg = ``;
        const webSize = PAD * 3;
        const webLines = [0,30,60,90,120,150].map(angle => {
          const a = angle * Math.PI / 180;
          return `<line x1="0" y1="0" x2="${webSize*Math.cos(a)}" y2="${webSize*Math.sin(a)}" stroke="#888" stroke-width="1.5"/>`;
        }).join('');
        const webArcs = [webSize*0.3, webSize*0.6, webSize].map(r =>
          `<path d="M${r},0 A${r},${r} 0 0,1 0,${r}" fill="none" stroke="#888" stroke-width="1.5"/>`).join('');
        frameOverlay = `
          <g transform="translate(0,0)">${webLines}${webArcs}</g>
          <g transform="translate(${W},0) scale(-1,1)">${webLines}${webArcs}</g>
          <g transform="translate(0,${H}) scale(1,-1)">${webLines}${webArcs}</g>
          <g transform="translate(${W},${H}) scale(-1,-1)">${webLines}${webArcs}</g>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="#553300" stroke-width="4"/>`;
      } else if (id === 31) { // Pure White - double border
        frameOverlay = `
          <rect x="4" y="4" width="${W-8}" height="${H-8}" rx="6" fill="none" stroke="#d0d0d0" stroke-width="3"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#e8e8e8" stroke-width="1.5"/>`;
      } else if (id === 32) { // Gold Foil - shimmer gradient border
        frameOverlay = `
          <defs><linearGradient id="goldFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f5d900"/><stop offset="40%" stop-color="#fffbe0"/><stop offset="100%" stop-color="#c8a800"/>
          </linearGradient></defs>
          <rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="url(#goldFull)" opacity="0.25"/>
          <rect x="4" y="4" width="${W-8}" height="${H-8}" rx="8" fill="none" stroke="url(#goldFull)" stroke-width="8"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#e0c000" stroke-width="1.5"/>`;
      } else if (id === 33) { // Silver Lining - brushed metal border
        frameOverlay = `
          <defs><linearGradient id="silverFull" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#909090"/><stop offset="40%" stop-color="#e0e0e0"/><stop offset="70%" stop-color="#b0b0b0"/><stop offset="100%" stop-color="#808080"/>
          </linearGradient></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#silverFull)"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#silverFull)"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#silverFull)"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#silverFull)"/>
          <rect x="4" y="4" width="${W-8}" height="${H-8}" rx="8" fill="none" stroke="url(#silverFull)" stroke-width="4"/>`;
      } else if (id === 34) { // Marble Blush - marble border with veins
        frameBg = ``;
        frameOverlay = `
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="#f5ece8"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="#f5ece8"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="#f5ece8"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="#f5ece8"/>
          <path d="M${W*0.1},0 Q${W*0.3},${H*0.3} ${W*0.2},${H*0.6} Q${W*0.3},${H*0.8} ${W*0.25},${H}" stroke="#d4a090" stroke-width="4" fill="none" opacity="0.6"/>
          <path d="M${W*0.45},0 Q${W*0.55},${H*0.2} ${W*0.65},${H*0.5} Q${W*0.75},${H*0.8} ${W*0.55},${H}" stroke="#c09080" stroke-width="2.5" fill="none" opacity="0.45"/>
          <path d="M${W*0.8},${H*0.1} Q${W*0.7},${H*0.35} ${W*0.85},${H*0.65} Q${W*0.9},${H*0.8} ${W*0.8},${H}" stroke="#d4a090" stroke-width="2" fill="none" opacity="0.4"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="8" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 35) { // Ink & Paper - ruled lines + red margin
        const lines = Array.from({length: Math.floor(H/24)}, (_,i) =>
          `<line x1="${PAD*1.5}" y1="${20+i*24}" x2="${W-PAD}" y2="${20+i*24}" stroke="#c0b090" stroke-width="1.2"/>`).join('');
        frameOverlay = `${lines}
          <line x1="${PAD*1.5}" y1="0" x2="${PAD*1.5}" y2="${H}" stroke="#e0d0b0" stroke-width="2.5"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 36) { // Rainbow - arc rainbow at bottom
        const rainbowColors = ['#ff4444','#ff8800','#ffee00','#44cc44','#4488ff','#8844cc'];
        const arcs = rainbowColors.map((c,i) =>
          `<path d="M${10+i*6},${H} Q${W/2},${H*0.05+i*22} ${W-10-i*6},${H}" fill="none" stroke="${c}" stroke-width="5" opacity="0.65"/>`).join('');
        frameOverlay = `${arcs}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 37) { // Space Kei - starfield background with photo windows
        const { TOP_BAND: TB } = STRIP;
        // Build evenodd path: outer rect minus each photo slot = shows canvas through holes
        const photoHolePaths = Array.from({length: TOTAL}, (_, i) => {
          const py = TB + i * (PHOTO_H + GAP);
          return `M${PAD},${py} L${PAD+PHOTO_W},${py} L${PAD+PHOTO_W},${py+PHOTO_H} L${PAD},${py+PHOTO_H} Z`;
        }).join(' ');
        const stars = Array.from({length:120}, (_,i) => {
          const x = (i*173+7) % W, y = (i*231+5) % H;
          return `<circle cx="${x}" cy="${y}" r="${i%7===0?2.5:i%3===0?1.5:0.8}" fill="white" opacity="${0.2+i%7*0.12}"/>`;
        }).join('');
        // Shooting stars
        const shoots = [[W*0.2,H*0.15,W*0.35,H*0.22],[W*0.6,H*0.08,W*0.8,H*0.18],[W*0.1,H*0.55,W*0.28,H*0.62]].map(
          ([x1,y1,x2,y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="1.5" opacity="0.6"/>`).join('');
        // Planets/dots
        const planets = `<circle cx="${W*0.85}" cy="${H*0.12}" r="12" fill="#6040a0" opacity="0.7"/>
          <circle cx="${W*0.85}" cy="${H*0.12}" r="8" fill="#8060c0" opacity="0.5"/>
          <circle cx="${W*0.12}" cy="${H*0.88}" r="8" fill="#2080a0" opacity="0.7"/>`;
        frameBg = `<path fill-rule="evenodd" fill="#0a0820"
          d="M0,0 L${W},0 L${W},${H} L0,${H} Z ${photoHolePaths}"/>
          ${stars}${shoots}${planets}`;
        frameOverlay = `
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="#5050c0" stroke-width="3"/>`;
      } else if (id === 38) { // Mermaid - ocean wave border
        const waves = Array.from({length: 5}, (_,i) => {
          const y = (H/4)*i;
          return `<path d="M0,${y} Q${W*0.25},${y-12} ${W*0.5},${y} Q${W*0.75},${y+12} ${W},${y}" stroke="${border}" stroke-width="2.5" fill="none" opacity="0.35"/>`;
        }).join('');
        frameOverlay = `${waves}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="8" fill="none" stroke="${border}" stroke-width="5"/>`;
      } else if (id === 39) { // Magic Girl - sparkle dots border
        const sparkles = Array.from({length: 30}, (_,i) => {
          let x, y;
          if (i < 8) { x = (W/7)*i; y = PAD*0.5; }
          else if (i < 16) { x = (W/7)*(i-8); y = H-PAD*0.5; }
          else if (i < 23) { x = PAD*0.5; y = (H/6)*(i-16); }
          else { x = W-PAD*0.5; y = (H/6)*(i-23); }
          return `<text x="${x}" y="${y+6}" text-anchor="middle" font-size="14">✨</text>`;
        }).join('');
        frameOverlay = `${sparkles}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 40) { // Y2K Vibes - circuit board lines
        const circuits = Array.from({length:8}, (_,i) => {
          const y = (H/7)*i;
          return `<line x1="0" y1="${y+10}" x2="${W*0.2}" y2="${y+10}" stroke="${border}" stroke-width="2" opacity="0.4"/>
                  <circle cx="${W*0.2}" cy="${y+10}" r="3" fill="${border}" opacity="0.4"/>
                  <line x1="${W*0.8}" y1="${y+10}" x2="${W}" y2="${y+10}" stroke="${border}" stroke-width="2" opacity="0.4"/>
                  <circle cx="${W*0.8}" cy="${y+10}" r="3" fill="${border}" opacity="0.4"/>`;
        }).join('');
        frameOverlay = `${circuits}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 41) { // Rose Gold - subtle shimmer border
        frameOverlay = `
          <defs><linearGradient id="rgFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e8b0a0"/><stop offset="50%" stop-color="#f8d0c0"/><stop offset="100%" stop-color="#d09080"/>
          </linearGradient></defs>
          <rect x="4" y="4" width="${W-8}" height="${H-8}" rx="8" fill="none" stroke="url(#rgFull)" stroke-width="8"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;
      } else if (id === 42) { // Amethyst - gem-cut corner accents
        const gemCorners = [[0,0],[W,0],[0,H],[W,H]];
        const gems = gemCorners.map(([cx,cy]) => {
          const size = PAD * 1.4;
          const sx = cx === 0 ? 1 : -1, sy = cy === 0 ? 1 : -1;
          return `<polygon points="${cx},${cy} ${cx+sx*size},${cy} ${cx+sx*size*0.6},${cy+sy*size*0.6} ${cx},${cy+sy*size}" fill="${accent}" opacity="0.8"/>`;
        }).join('');
        frameOverlay = `${gems}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="5"/>`;
      } else if (id === 43) { // Champagne - bubble dots border
        const bubbles = Array.from({length: 40}, (_,i) => {
          let x, y;
          if (i < 12) { x = (W/11)*i; y = PAD*0.6; }
          else if (i < 24) { x = (W/11)*(i-12); y = H-PAD*0.6; }
          else if (i < 32) { x = PAD*0.6; y = (H/7)*(i-24); }
          else { x = W-PAD*0.6; y = (H/7)*(i-32); }
          const r = 3 + (i%4)*1.5;
          return `<circle cx="${x}" cy="${y}" r="${r}" fill="${accent}" opacity="0.6"/>`;
        }).join('');
        frameOverlay = `${bubbles}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 44) { // Holographic - rainbow gradient border
        frameOverlay = `
          <defs><linearGradient id="holoFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff80c0"/><stop offset="20%" stop-color="#ff80ff"/>
            <stop offset="40%" stop-color="#8080ff"/><stop offset="60%" stop-color="#80ffff"/>
            <stop offset="80%" stop-color="#80ff80"/><stop offset="100%" stop-color="#ffff80"/>
          </linearGradient></defs>
          <rect x="4" y="4" width="${W-8}" height="${H-8}" rx="8" fill="none" stroke="url(#holoFull)" stroke-width="10"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2" opacity="0.5"/>`;
      } else if (id === 45) { // Black Lace - dark lace pattern border only
        frameBg = ``;
        frameOverlay = `
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="#2a1020" opacity="0.85"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="#2a1020" opacity="0.85"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="#2a1020" opacity="0.85"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="#2a1020" opacity="0.85"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#2a1020" stroke-width="3"/>`;
      } else if (id === 46) { // Forest Fairy - leaf vine border
        const forestVines = Array.from({length:12}, (_,i) => {
          const y = (H/11)*i;
          return `<ellipse cx="${PAD*0.5}" cy="${y+12}" rx="8" ry="13" fill="#90d060" opacity="0.7" transform="rotate(-15 ${PAD*0.5} ${y+12})"/>
                  <ellipse cx="${W-PAD*0.5}" cy="${y+18}" rx="8" ry="13" fill="#90d060" opacity="0.7" transform="rotate(15 ${W-PAD*0.5} ${y+18})"/>`;
        }).join('');
        frameOverlay = `${forestVines}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 47) { // Ocean Breeze - gradient border with photo windows
        const { TOP_BAND: TB } = STRIP;
        const photoHolePaths47 = Array.from({length: TOTAL}, (_, i) => {
          const py = TB + i * (PHOTO_H + GAP);
          return `M${PAD},${py} L${PAD+PHOTO_W},${py} L${PAD+PHOTO_W},${py+PHOTO_H} L${PAD},${py+PHOTO_H} Z`;
        }).join(' ');
        const waveLines = [H*0.15, H*0.3, H*0.5, H*0.7, H*0.85].map(wy =>
          `<path d="M0,${wy} Q${W*0.25},${wy-10} ${W*0.5},${wy} Q${W*0.75},${wy+10} ${W},${wy}" stroke="white" stroke-width="2.5" fill="none" opacity="0.35"/>`).join('');
        frameBg = `<defs><linearGradient id="oceanFull" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#87ceeb"/><stop offset="100%" stop-color="#1a6090"/>
          </linearGradient></defs>
          <path fill-rule="evenodd" fill="url(#oceanFull)"
            d="M0,0 L${W},0 L${W},${H} L0,${H} Z ${photoHolePaths47}"/>
          ${waveLines}`;
        frameOverlay = `
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
      } else if (id === 48) { // Sunset Glow - gradient sky + silhouette trees with photo windows
        const { TOP_BAND: TB } = STRIP;
        const photoHolePaths48 = Array.from({length: TOTAL}, (_, i) => {
          const py = TB + i * (PHOTO_H + GAP);
          return `M${PAD},${py} L${PAD+PHOTO_W},${py} L${PAD+PHOTO_W},${py+PHOTO_H} L${PAD},${py+PHOTO_H} Z`;
        }).join(' ');
        const treeCount = Math.floor(W / 22);
        const trees = Array.from({length: treeCount}, (_,i) =>
          `<polygon points="${i*22},${H} ${i*22+11},${H-50} ${i*22+22},${H}" fill="#1a3010"/>`).join('');
        frameBg = `<defs><linearGradient id="sunsetFull" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ff9060"/><stop offset="40%" stop-color="#ffb060"/>
            <stop offset="70%" stop-color="#ff6040"/><stop offset="100%" stop-color="#c03020"/>
          </linearGradient></defs>
          <path fill-rule="evenodd" fill="url(#sunsetFull)"
            d="M0,0 L${W},0 L${W},${H} L0,${H} Z ${photoHolePaths48}"/>
          <rect x="0" y="${H-30}" width="${W}" height="30" fill="#1a3010"/>
          ${trees}
          <circle cx="${W/2}" cy="${PAD*1.5}" r="${PAD*1.0}" fill="#ffe060" opacity="0.65"/>`;
        frameOverlay = `
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>`;
      } else if (id === 49) { // Sakura Park - falling blossoms
        const blossomCount = 30;
        const blossoms = Array.from({length: blossomCount}, (_,i) => {
          const bx = (i*137+10) % W, by = (i*173+10) % H;
          return `<g transform="translate(${bx},${by}) rotate(${i*25})">
            <ellipse cx="5" cy="0" rx="5" ry="9" fill="#ffb0d0" opacity="0.75"/>
            <ellipse cx="5" cy="0" rx="5" ry="9" fill="#ffb0d0" opacity="0.75" transform="rotate(72)"/>
            <ellipse cx="5" cy="0" rx="5" ry="9" fill="#ffb0d0" opacity="0.75" transform="rotate(144)"/>
            <ellipse cx="5" cy="0" rx="5" ry="9" fill="#ffb0d0" opacity="0.75" transform="rotate(216)"/>
            <ellipse cx="5" cy="0" rx="5" ry="9" fill="#ffb0d0" opacity="0.75" transform="rotate(288)"/>
            <circle r="4" fill="#ffe0f0"/>
          </g>`;
        }).join('');
        frameOverlay = `${blossoms}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="5"/>`;
      } else if (id === 50) { // Moonlit Night - starry dark with photo windows
        const { TOP_BAND: TB } = STRIP;
        const photoHolePaths = Array.from({length: TOTAL}, (_, i) => {
          const py = TB + i * (PHOTO_H + GAP);
          return `M${PAD},${py} L${PAD+PHOTO_W},${py} L${PAD+PHOTO_W},${py+PHOTO_H} L${PAD},${py+PHOTO_H} Z`;
        }).join(' ');
        const nightStars = Array.from({length:120}, (_,i) => {
          const x=(i*173+3)%W, y=(i*137+3)%H;
          return `<circle cx="${x}" cy="${y}" r="${i%5===0?2:i%3===0?1.2:0.7}" fill="white" opacity="${0.2+i%6*0.12}"/>`;
        }).join('');
        const moonPath = `<path d="M${W*0.78},${PAD*0.5} Q${W*0.62},${PAD*1.5} ${W*0.62},${PAD*3} Q${W*0.62},${PAD*5} ${W*0.80},${PAD*6} Q${W*0.62},${PAD*6.2} ${W*0.50},${PAD*5} Q${W*0.40},${PAD*3} ${W*0.50},${PAD*1.5} Q${W*0.56},${PAD*0.5} ${W*0.78},${PAD*0.5} Z" fill="#e8e860" opacity="0.85"/>`;
        frameBg = `<path fill-rule="evenodd" fill="#0e0c24"
          d="M0,0 L${W},0 L${W},${H} L0,${H} Z ${photoHolePaths}"/>
          ${nightStars}${moonPath}`;
        frameOverlay = `
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="#5050b0" stroke-width="3"/>`;
      } else {
        // Generic fallback
        frameOverlay = `
          <rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="none" stroke="${border}" stroke-width="8"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${accent}" stroke-width="3"/>`;
      }

      // Top sticker row
      const stickerRow = `
        <text x="${PAD*1.2}" y="${PAD*2.2}" font-size="28" font-family="serif">${f.s[0]}</text>
        <text x="${W-PAD*1.2}" y="${PAD*2.2}" text-anchor="end" font-size="28" font-family="serif">${f.s[1]}</text>
        <text x="${PAD*1.2}" y="${H-PAD*0.6}" font-size="28" font-family="serif">${f.s[2]}</text>
        <text x="${W-PAD*1.2}" y="${H-PAD*0.6}" text-anchor="end" font-size="28" font-family="serif">${f.s[3]}</text>`;

      // Extract any <defs>...</defs> from frameBg and frameOverlay so they live at top level
      const defsRegex = /<defs>([\s\S]*?)<\/defs>/g;
      let embeddedDefs = '';
      const cleanFrameBg = frameBg.replace(defsRegex, (_, d) => { embeddedDefs += d; return ''; });
      const cleanFrameOverlay = frameOverlay.replace(defsRegex, (_, d) => { embeddedDefs += d; return ''; });

      return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
        <defs>${borderClipDef}${embeddedDefs}</defs>
        ${cleanFrameBg}
        <g clip-path="url(#${borderClipId})">${cleanFrameOverlay}</g>
        ${stickerRow}
      </svg>`;
    }

    // ===== Download =====
    async function downloadStrip() {
      const f = currentFrame;
      const canvas = document.createElement('canvas');
      // Render at full 1x scale for download
      await renderStripToCanvas(canvas, f, photos, 1);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `kawaii-strip-${f.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
    }

    // ===== Hamburger Menu =====
    (function() {
      const btn = document.getElementById('hamburger');
      const nav = document.getElementById('siteNav');
      if(!btn || !nav) return;
      btn.addEventListener('click', function() {
        const open = nav.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
      });
    })();

    window.addEventListener('DOMContentLoaded', () => { initCamera(); updateDots(); });
    </script>
  </body>
</html>
