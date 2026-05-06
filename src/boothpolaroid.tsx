<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Polaroid Booth — Photobooth Kawaii</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <!-- Fallback Google Fonts while custom fonts load -->
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <style>
      /* ===== CUSTOM FONTS ===== */
      /* Puffberry by StuArt Foundry — big display text */
      @font-face {
        font-family: 'Puffberry';
        src: url('fonts/Puffberry.woff2') format('woff2'),
             url('fonts/Puffberry.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      /* Perfect Lemonade by Keithzo — small/body text */
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
      }
    </style>
    <link rel="stylesheet" href="css/style.css" />
    <style>
      :root {
        --pink:#ff9ec8; --pink-deep:#ff6ba8; --lavender:#e8d4f0;
        --brown:#4a3728; --white:#fffefd; --gray:#6b5a52;
      }
      body { background:linear-gradient(165deg,#f5e6ff 0%,#ffd6e8 45%,#e8d4ff 100%); min-height:100vh; padding-bottom: 100px; }
      main { max-width:980px; margin:0 auto; padding:1.5rem 1rem 5rem; position:relative; z-index:1; }

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
        max-width:520px; margin:0 auto; text-align:center;
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
      .video-shell {
        position:relative; border-radius:20px; overflow:hidden;
        box-shadow:0 12px 40px rgba(255,100,160,.3);
        background:#1a0a14; aspect-ratio:1/1;
      }
      #video {
        width:100%; height:100%; object-fit:cover; display:block;
        transform:scaleX(-1);
      }
      .countdown-overlay {
        position:absolute; inset:0; display:flex; align-items:center;
        justify-content:center; pointer-events:none;
      }
      .countdown-num {
        font-family:var(--font-display); font-size:8rem; font-weight:700;
        color:#fff; text-shadow:0 0 40px rgba(255,120,180,.8),0 4px 0 rgba(0,0,0,.2);
        opacity:0; transition:none;
        animation:none;
      }
      .countdown-num.show { animation:countPop .85s ease forwards; }
      @keyframes countPop {
        0%{opacity:0;transform:scale(2);}
        20%{opacity:1;transform:scale(1);}
        80%{opacity:1;transform:scale(1);}
        100%{opacity:0;transform:scale(0.8);}
      }
      .flash-cap {
        position:absolute; inset:0; background:#fff;
        opacity:0; pointer-events:none; border-radius:20px;
        transition:opacity .08s ease;
      }
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
      @media(max-width:740px){ .studio-layout{grid-template-columns:1fr;} }

      .preview-panel { text-align:center; }
      .preview-panel h2 {
        font-family:var(--font-display); font-size:1.5rem; color:var(--pink-deep);
        margin-bottom:1rem; text-shadow:2px 2px 0 var(--white);
      }

      .polaroid-preview {
        display:inline-block;
        border-radius:6px;
        position:relative;
        max-width:282px;
        line-height:0;
      }
      #polaroidPreviewCanvas {
        display:block;
        border-radius:6px;
        width:282px;
        height:auto;
        box-shadow:6px 8px 32px rgba(180,120,200,.3);
      }

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
        max-height:560px; overflow-y:auto;
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
        display:flex; align-items:center; justify-content:center; font-size:1.2rem;
        position:relative; overflow:hidden; flex-shrink:0;
      }
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
        /* Cloud bumps via border-radius */
        border-radius: 120px 120px 60px 60px / 80px 80px 40px 40px;
        box-shadow:
          0 6px 28px rgba(255,160,200,.22),
          0 2px 8px rgba(255,160,200,.12);
      }
      /* Cloud puffs on top using pseudo-elements */
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
      /* Extra cloud puff via a wrapper span */
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

      /* Logo: small "photobooth" on top, big "kawaii" below — both center-aligned */
      .logo {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;   /* center both lines */
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

      /* Nav — centered in the middle grid column */
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

      /* Bow & hamburger */
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

      /* Mobile drawer */
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
        height: 90px;
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
          <span class="float-emoji" style="top:10%;left:-8%;--dur:3.2s;--delay:0s;--rot0:-10deg;--rot1:10deg">🌸</span>
          <span class="float-emoji" style="top:30%;left:-10%;--dur:2.8s;--delay:.4s;--rot0:-6deg;--rot1:8deg">🍓</span>
          <span class="float-emoji" style="top:60%;left:-7%;--dur:3.5s;--delay:.8s;--rot0:-12deg;--rot1:6deg">🎀</span>
          <span class="float-emoji" style="top:80%;left:-5%;--dur:2.6s;--delay:.2s;--rot0:4deg;--rot1:-10deg">⭐</span>
          <span class="float-emoji" style="top:5%;right:-8%;--dur:3.0s;--delay:.6s;--rot0:8deg;--rot1:-8deg">💖</span>
          <span class="float-emoji" style="top:28%;right:-10%;--dur:3.4s;--delay:0s;--rot0:-5deg;--rot1:12deg">🌟</span>
          <span class="float-emoji" style="top:55%;right:-8%;--dur:2.9s;--delay:1s;--rot0:10deg;--rot1:-5deg">🐰</span>
          <span class="float-emoji" style="top:78%;right:-5%;--dur:3.1s;--delay:.3s;--rot0:-8deg;--rot1:6deg">✨</span>
          <span class="float-emoji" style="top:-4%;left:15%;--dur:2.7s;--delay:.7s;--rot0:-5deg;--rot1:9deg">🍬</span>
          <span class="float-emoji" style="top:-4%;right:20%;--dur:3.3s;--delay:.1s;--rot0:6deg;--rot1:-10deg">🌷</span>
          <h1 class="cam-title">🎀 Polaroid Selfie</h1>
          <p style="color:var(--gray);margin-bottom:1rem">Strike a pose — you've got 5 seconds after you're ready! ♡</p>

          <div class="video-shell">
            <video id="video" autoplay playsinline muted disablepictureinpicture></video>
            <div class="countdown-overlay">
              <div class="countdown-num" id="countNum"></div>
            </div>
            <div class="flash-cap" id="flashCap"></div>
          </div>

          <canvas id="canvas" width="640" height="480"></canvas>

          <div style="margin-top:1rem">
            <button class="cam-btn" id="btnReady" onclick="startCountdown()">✨ Ready / Start Pose</button>
          </div>
          <p id="camError" style="color:#e06090;margin-top:.75rem;display:none"></p>
        </div>
      </div>

      <!-- STEP 2: Studio -->
      <div class="step" id="stepStudio">
        <div class="studio-layout">
          <!-- Preview -->
          <div class="preview-panel">
            <h2>🌸 Polaroid Design Studio</h2>
            <div class="polaroid-preview" id="polaroidPreview">
              <canvas id="polaroidPreviewCanvas" style="display:block;border-radius:6px;max-width:280px;width:100%;height:auto;"></canvas>
            </div>

            <div class="action-btns">
              <button class="btn-retake" onclick="retake()">🔄 Retake Photo</button>
              <button class="btn-download" onclick="downloadPolaroid()">⬇️ Download</button>
            </div>
            <p style="margin-top:.75rem"><a href="index.html" style="color:var(--gray);font-size:.85rem">← Back to Home</a></p>
          </div>

          <!-- Frames -->
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

    <script>
    // ===== 50 POLAROID FRAME TEMPLATES =====
    const FRAMES = [
      // Floral & Spring
      { id:1, name:"Cherry Blossom", cat:"🌸 Floral", bg:"linear-gradient(135deg,#ffe8f4,#f0d4ff)", border:"#ff9ec8", accent:"#ffb8d9", s:["🌸","🌺","🌷","✿"], caption:"bloom forever ✿", font:"#d4789c" },
      { id:2, name:"Rose Garden", cat:"🌸 Floral", bg:"linear-gradient(135deg,#ffe0e8,#ffd4e8)", border:"#e87090", accent:"#ffb0c8", s:["🌹","🥀","🌹","🌷"], caption:"avec amour ♡", font:"#c04070" },
      { id:3, name:"Lavender Dream", cat:"🌸 Floral", bg:"linear-gradient(135deg,#e8d4ff,#d4c0f0)", border:"#c090e0", accent:"#d4b0f0", s:["💜","🌿","💜","🌿"], caption:"dreamy lavender ✿", font:"#8050b0" },
      { id:4, name:"Sunflower Pop", cat:"🌸 Floral", bg:"linear-gradient(135deg,#fff4c0,#ffe880)", border:"#e0b800", accent:"#ffe040", s:["🌻","☀️","🌻","🌼"], caption:"sunny days ☀", font:"#a07000" },
      { id:5, name:"Daisy Fields", cat:"🌸 Floral", bg:"linear-gradient(135deg,#f0ffe0,#e0ffd0)", border:"#90d060", accent:"#b0e880", s:["🌼","🌿","🌸","🍃"], caption:"field of daisies", font:"#507030" },

      // Kawaii & Cute
      { id:6, name:"Kawaii Pink", cat:"🍬 Kawaii", bg:"linear-gradient(135deg,#ffe0f0,#ffc0e0)", border:"#ff80c0", accent:"#ffa0d0", s:["🎀","✨","🎀","💖"], caption:"kawaii desu ♡", font:"#e0508a" },
      { id:7, name:"Bunny Hop", cat:"🍬 Kawaii", bg:"linear-gradient(135deg,#f0f0ff,#e8e0ff)", border:"#c0b0f0", accent:"#d8d0ff", s:["🐰","🌸","🐰","🌸"], caption:"hop hop ✿", font:"#8070c0" },
      { id:8, name:"Star Girl", cat:"🍬 Kawaii", bg:"linear-gradient(135deg,#fff8d0,#fff0a0)", border:"#e0c000", accent:"#ffe840", s:["⭐","🌟","⭐","✨"], caption:"you're a star ★", font:"#908000" },
      { id:9, name:"Candy World", cat:"🍬 Kawaii", bg:"linear-gradient(135deg,#ffd0e8,#d0f0ff)", border:"#ff80a0", accent:"#ffb0c8", s:["🍬","🍭","🍬","🍭"], caption:"sweet as candy", font:"#d04060" },
      { id:10, name:"Strawberry", cat:"🍬 Kawaii", bg:"linear-gradient(135deg,#ffd4d4,#ffe0d0)", border:"#e05050", accent:"#ff8080", s:["🍓","💖","🍓","✿"], caption:"berry cute ♡", font:"#c03040" },
      { id:11, name:"Kitty Paws", cat:"🍬 Kawaii", bg:"linear-gradient(135deg,#fff0f0,#ffe8e8)", border:"#e09090", accent:"#ffb8b8", s:["🐱","🐾","🐱","💗"], caption:"nyaa~ ♡", font:"#c06060" },
      { id:12, name:"Sailor Moon", cat:"🍬 Kawaii", bg:"linear-gradient(135deg,#fff0d0,#d0e8ff)", border:"#8090e0", accent:"#b0c0f8", s:["🌙","⭐","🌙","💫"], caption:"moon prism power", font:"#4050a0" },

      // Pastel
      { id:13, name:"Cotton Candy", cat:"🎨 Pastel", bg:"linear-gradient(135deg,#ffd0f0,#d0f0ff)", border:"#c090d0", accent:"#e0b0e8", s:["🌈","💗","🌈","✨"], caption:"soft & sweet ♡", font:"#9060a0" },
      { id:14, name:"Mint Cream", cat:"🎨 Pastel", bg:"linear-gradient(135deg,#d0fff0,#e8fff8)", border:"#60c0a0", accent:"#90d8b8", s:["🌿","💚","🌿","🍃"], caption:"fresh & minty", font:"#307050" },
      { id:15, name:"Baby Blue", cat:"🎨 Pastel", bg:"linear-gradient(135deg,#d0e8ff,#c0d8f8)", border:"#7090c0", accent:"#90b0d8", s:["🌊","💙","☁️","🫧"], caption:"serene blue ♡", font:"#4060a0" },
      { id:16, name:"Peach Sorbet", cat:"🎨 Pastel", bg:"linear-gradient(135deg,#ffe8d0,#ffd8b8)", border:"#e09060", accent:"#f0b080", s:["🍑","🌸","🍑","✿"], caption:"peachy keen ♡", font:"#c06030" },
      { id:17, name:"Lilac Mist", cat:"🎨 Pastel", bg:"linear-gradient(135deg,#f0e0ff,#e8d0f8)", border:"#c0a0e0", accent:"#d8c0f0", s:["💜","🌸","🌷","✨"], caption:"lilac dreams", font:"#8060b0" },
      { id:18, name:"Butter Yellow", cat:"🎨 Pastel", bg:"linear-gradient(135deg,#fff8d0,#fff0b0)", border:"#d0b000", accent:"#ffe040", s:["🌼","🌟","🌼","☀️"], caption:"sunny & bright", font:"#906000" },

      // Retro Booth
      { id:19, name:"Vintage Strip", cat:"📷 Retro", bg:"linear-gradient(135deg,#f0e8d0,#e8d8b8)", border:"#a08060", accent:"#c0a070", s:["📷","🎞️","📷","🎞️"], caption:"captured forever", font:"#604020" },
      { id:20, name:"Film Noir", cat:"📷 Retro", bg:"linear-gradient(135deg,#e8e8e8,#d0d0d0)", border:"#404040", accent:"#606060", s:["🎬","⬛","🎬","📽️"], caption:"lights, camera, action", font:"#202020" },
      { id:21, name:"Kodak Moment", cat:"📷 Retro", bg:"linear-gradient(135deg,#fff0c0,#ffe890)", border:"#d09010", accent:"#e8b820", s:["📸","🌟","📸","✨"], caption:"a kodak moment", font:"#805000" },
      { id:22, name:"Disco Fever", cat:"📷 Retro", bg:"linear-gradient(135deg,#d0d0ff,#f0d0f8)", border:"#9070d0", accent:"#c090e8", s:["🪩","✨","🪩","💫"], caption:"disco queen ♡", font:"#5030a0" },
      { id:23, name:"Pop Art", cat:"📷 Retro", bg:"linear-gradient(135deg,#ffff00,#ff8000)", border:"#ff0000", accent:"#ff6000", s:["🟡","🔴","🟡","🔵"], caption:"pop art vibes!", font:"#800000" },
      { id:24, name:"Retro Pink", cat:"📷 Retro", bg:"linear-gradient(135deg,#ffd0e8,#ff90c0)", border:"#e04090", accent:"#ff60a0", s:["💋","🌸","💋","✨"], caption:"groovy baby ♡", font:"#900040" },

      // Seasonal
      { id:25, name:"Winter Frost", cat:"❄️ Seasonal", bg:"linear-gradient(135deg,#e8f4ff,#d0eaff)", border:"#7090c0", accent:"#a0c0e0", s:["❄️","⛄","❄️","🌨️"], caption:"frosty & cozy ✿", font:"#4060a0" },
      { id:26, name:"Summer Breeze", cat:"❄️ Seasonal", bg:"linear-gradient(135deg,#d0f0ff,#ffe8b0)", border:"#50b0d0", accent:"#70c8e8", s:["🌊","🌞","🌊","🌴"], caption:"summer lovin' ♡", font:"#205070" },
      { id:27, name:"Autumn Leaves", cat:"❄️ Seasonal", bg:"linear-gradient(135deg,#ffe8b0,#ffcc70)", border:"#c07020", accent:"#e09040", s:["🍂","🍁","🍂","🍄"], caption:"golden autumn", font:"#703010" },
      { id:28, name:"Spring Fresh", cat:"❄️ Seasonal", bg:"linear-gradient(135deg,#e0ffd0,#d0f0e0)", border:"#60b060", accent:"#80c880", s:["🌱","🌸","🌱","🦋"], caption:"spring is here ♡", font:"#305030" },
      { id:29, name:"Xmas Magic", cat:"❄️ Seasonal", bg:"linear-gradient(135deg,#ffe8e8,#d0f0d0)", border:"#c02020", accent:"#e04040", s:["🎄","🎁","❄️","⭐"], caption:"holiday magic ✿", font:"#900020" },
      { id:30, name:"Halloween Cute", cat:"❄️ Seasonal", bg:"linear-gradient(135deg,#ffe0b0,#f0c0e8)", border:"#906030", accent:"#c08050", s:["🎃","🦇","🎃","🕷️"], caption:"boo! so cute ♡", font:"#503010" },

      // Elegant/Minimal
      { id:31, name:"Pure White", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#ffffff,#f8f8f8)", border:"#e0e0e0", accent:"#f0f0f0", s:["✦","○","✦","○"], caption:"simply you ♡", font:"#888888" },
      { id:32, name:"Gold Foil", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#fff8d8,#f8e898)", border:"#c8a800", accent:"#e0c000", s:["✨","◇","✨","◇"], caption:"golden moment", font:"#706000" },
      { id:33, name:"Silver Lining", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#f0f0f0,#e4e4e4)", border:"#909090", accent:"#b0b0b0", s:["◈","◇","◈","○"], caption:"silver lining ✦", font:"#505050" },
      { id:34, name:"Marble Blush", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#fff0ec,#f8e8e0)", border:"#d0a090", accent:"#e8b8a8", s:["◇","✦","◇","✦"], caption:"graceful & chic", font:"#806050" },
      { id:35, name:"Ink & Paper", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#f8f4e8,#f0ecdc)", border:"#806040", accent:"#a08060", s:["🖊️","📝","🖊️","✦"], caption:"written in love", font:"#503020" },

      // Sticker & Fun
      { id:36, name:"Rainbow", cat:"🌈 Fun", bg:"linear-gradient(135deg,#ffd0d0,#ffebd0,#d0ffd8,#d0e8ff,#f0d0ff)", border:"#c080c0", accent:"#e0a0e0", s:["🌈","☁️","🌈","⭐"], caption:"somewhere over ♡", font:"#806090" },
      { id:37, name:"Space Kei", cat:"🌈 Fun", bg:"linear-gradient(135deg,#101030,#201060)", border:"#4040a0", accent:"#6060c0", s:["🚀","⭐","🪐","✨"], caption:"to infinity ✦", font:"#9090ff" },
      { id:38, name:"Mermaid", cat:"🌈 Fun", bg:"linear-gradient(135deg,#a0e8f0,#90d0f8)", border:"#3090b0", accent:"#50b0d0", s:["🧜","🐚","🌊","✨"], caption:"ocean dreams ♡", font:"#105070" },
      { id:39, name:"Magic Girl", cat:"🌈 Fun", bg:"linear-gradient(135deg,#ffd8f8,#d8f0ff)", border:"#c060c0", accent:"#e090d0", s:["🌙","⭐","🔮","✨"], caption:"magical girl ★", font:"#9030a0" },
      { id:40, name:"Y2K Vibes", cat:"🌈 Fun", bg:"linear-gradient(135deg,#d0f8f0,#f0d0f8)", border:"#80a0c0", accent:"#a0c0e0", s:["💿","📱","💿","⚡"], caption:"y2k forever", font:"#304080" },

      // Elegant Colorful
      { id:41, name:"Rose Gold", cat:"💅 Glam", bg:"linear-gradient(135deg,#ffe8d8,#f8d0c0)", border:"#d09080", accent:"#e8b0a0", s:["🌹","💗","💅","✦"], caption:"rose gold queen", font:"#905040" },
      { id:42, name:"Amethyst", cat:"💅 Glam", bg:"linear-gradient(135deg,#e0d0f8,#d8c0f0)", border:"#9070c0", accent:"#b090d8", s:["💎","🔮","💎","✨"], caption:"crystal clear ✦", font:"#6040a0" },
      { id:43, name:"Champagne", cat:"💅 Glam", bg:"linear-gradient(135deg,#fff0d0,#f8e0b0)", border:"#c09848", accent:"#d8b060", s:["🥂","✨","🥂","💫"], caption:"celebrate you ♡", font:"#806030" },
      { id:44, name:"Holographic", cat:"💅 Glam", bg:"linear-gradient(135deg,#f0d8ff,#d8f0ff,#d8ffd8,#fff0d8)", border:"#a080b0", accent:"#c0a0d0", s:["🦄","🌈","✨","💫"], caption:"holographic dream", font:"#7050a0" },
      { id:45, name:"Black Lace", cat:"💅 Glam", bg:"linear-gradient(135deg,#f8e8f0,#f0d8e8)", border:"#2a1020", accent:"#4a2040", s:["🖤","🌹","🖤","🌹"], caption:"dark romance ♡", font:"#1a0810" },

      // Nature
      { id:46, name:"Forest Fairy", cat:"🌿 Nature", bg:"linear-gradient(135deg,#d8f0d0,#c8e8c0)", border:"#408040", accent:"#60a060", s:["🌿","🦋","🌸","🍃"], caption:"forest fairy ✿", font:"#204020" },
      { id:47, name:"Ocean Breeze", cat:"🌿 Nature", bg:"linear-gradient(135deg,#c0e8f8,#b0d8f0)", border:"#2080a0", accent:"#40a0c0", s:["🌊","🐚","🌊","🫧"], caption:"ocean child ♡", font:"#104060" },
      { id:48, name:"Sunset Glow", cat:"🌿 Nature", bg:"linear-gradient(135deg,#ffd0a0,#ff9060)", border:"#c05020", accent:"#e07040", s:["🌅","🌸","🌅","✨"], caption:"golden hour ♡", font:"#602010" },
      { id:49, name:"Sakura Park", cat:"🌿 Nature", bg:"linear-gradient(135deg,#ffe8f4,#ffd8ec)", border:"#e07090", accent:"#f090b0", s:["🌸","🌸","🌸","🌸"], caption:"sakura forever ♡", font:"#c04060" },
      { id:50, name:"Moonlit Night", cat:"🌿 Nature", bg:"linear-gradient(135deg,#1a1a3a,#2a2060)", border:"#4040a0", accent:"#6060c0", s:["🌙","⭐","🌙","💫"], caption:"moonlit dreams ✦", font:"#8090f0" },
    ];

    let capturedDataURL = null;
    let currentFrame = FRAMES[0];
    let videoStream = null;

    // ===== Camera Init =====
    async function initCamera() {
      const video = document.getElementById('video');
      const btn   = document.getElementById('btnReady');
      const err   = document.getElementById('camError');

      btn.disabled = true;
      btn.textContent = '⏳ Starting camera…';
      err.style.display = 'none';

      // Release any existing stream first
      if (videoStream) {
        videoStream.getTracks().forEach(t => t.stop());
        videoStream = null;
      }

      try {
        videoStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
          audio: false
        });

        video.srcObject = videoStream;

        // Wait for video metadata to load so dimensions are known
        await new Promise((resolve, reject) => {
          video.onloadedmetadata = resolve;
          video.onerror = reject;
        });

        // Explicitly play — required on many browsers
        await video.play();

        btn.disabled = false;
        btn.textContent = '✨ Ready / Start Pose';

      } catch (e) {
        console.error('Camera error:', e);
        err.style.display = 'block';
        if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
          err.textContent = '📷 Camera permission denied. Please allow access in your browser and reload.';
        } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
          err.textContent = '📷 No camera found. Please connect a camera and reload.';
        } else if (e.name === 'NotReadableError' || e.name === 'TrackStartError') {
          err.textContent = '📷 Camera is in use by another app. Please close it and reload.';
        } else {
          err.textContent = '📷 Could not start camera: ' + e.message;
        }
        btn.disabled = true;
        btn.textContent = '✨ Ready / Start Pose';
      }
    }

    // ===== Countdown =====
    function startCountdown() {
      const btn = document.getElementById('btnReady');
      btn.disabled = true;
      const el = document.getElementById('countNum');
      let count = 5;

      function tick() {
        el.className = 'countdown-num';
        void el.offsetWidth; // reflow to restart animation
        el.textContent = count;
        el.className = 'countdown-num show';
        count--;
        if (count >= 0) {
          setTimeout(tick, 900);
        } else {
          setTimeout(() => { el.textContent = ''; capturePhoto(); }, 400);
        }
      }
      tick();
    }

    function capturePhoto() {
      // Flash effect
      const flash = document.getElementById('flashCap');
      flash.classList.add('pop');
      // Shutter sound
      try {
        const ctx = new AudioContext();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*0.03));
        const src=ctx.createBufferSource(); src.buffer=buf; src.connect(ctx.destination); src.start();
      } catch(e){}

      const video = document.getElementById('video');
      const canvas = document.getElementById('canvas');
      const ctx2 = canvas.getContext('2d');
      const vw = video.videoWidth || 640;
      const vh = video.videoHeight || 480;
      const side = Math.min(vw, vh);
      canvas.width = side;
      canvas.height = side;
      ctx2.save();
      ctx2.translate(side, 0);
      ctx2.scale(-1, 1);
      ctx2.drawImage(video, (vw - side) / 2, (vh - side) / 2, side, side, 0, 0, side, side);
      ctx2.restore();
      capturedDataURL = canvas.toDataURL('image/jpeg', 0.95);

      setTimeout(() => {
        flash.classList.remove('pop');
        goToStudio();
      }, 250);
    }

    function goToStudio() {
      // Stop camera stream completely
      if (videoStream) {
        videoStream.getTracks().forEach(t => t.stop());
        videoStream = null;
      }
      const video = document.getElementById('video');
      video.srcObject = null;

      document.getElementById('stepCamera').classList.remove('active');
      document.getElementById('stepStudio').classList.add('active');
      buildFramePicker();
      applyFrame(FRAMES[0]);
    }

    function retake() {
      document.getElementById('stepStudio').classList.remove('active');
      document.getElementById('stepCamera').classList.add('active');
      document.getElementById('btnReady').disabled = true;
      document.getElementById('btnReady').textContent = '⏳ Starting camera…';
      document.getElementById('countNum').textContent = '';
      initCamera();
    }

    // ===== Frame Picker =====
    function buildFramePicker() {
      const container = document.getElementById('framesContainer');
      container.innerHTML = '';
      const cats = {};
      FRAMES.forEach(f => {
        if(!cats[f.cat]) cats[f.cat] = [];
        cats[f.cat].push(f);
      });
      Object.entries(cats).forEach(([cat, frames]) => {
        const sec = document.createElement('div');
        sec.className = 'frames-category';
        sec.innerHTML = `<div class="cat-label">${cat}</div><div class="frames-row" id="cat-${cat.replace(/\s+/g,'-')}"></div>`;
        container.appendChild(sec);
        const row = sec.querySelector('.frames-row');
        frames.forEach(f => {
          const btn = document.createElement('button');
          btn.className = 'frame-thumb-btn' + (f.id===1?' active':'');
          btn.title = f.name;
          btn.innerHTML = `<div class="thumb-preview" style="background:${f.bg};border:2px solid ${f.border}">${f.s[0]}</div><span class="thumb-label">${f.name}</span>`;
          btn.onclick = () => {
            document.querySelectorAll('.frame-thumb-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            applyFrame(f);
          };
          row.appendChild(btn);
        });
      });
    }

    function applyFrame(f) {
      currentFrame = f;
      const canvas = document.getElementById('polaroidPreviewCanvas');
      renderPolaroidToCanvas(canvas, f, capturedDataURL, 0.47).catch(console.error);
    }

    // ===== Polaroid dimensions =====
    const POL = {
      W: 600,
      BORDER: 14,
      PHOTO_SIZE: 572,  // W - BORDER*2
      BOTTOM: 100,
      get H() { return this.BORDER + this.PHOTO_SIZE + this.BOTTOM; }
    };

    async function renderPolaroidToCanvas(canvas, f, photoSrc, scale) {
      const { W, BORDER, PHOTO_SIZE, BOTTOM, H } = POL;
      canvas.width  = Math.round(W * scale);
      canvas.height = Math.round(H * scale);
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);

      // 1. White polaroid base
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, W, H);

      // 2. Draw photo
      if (photoSrc) {
        const img = new Image();
        img.src = photoSrc;
        await new Promise(r => { img.onload = r; img.onerror = r; });
        const iw = img.naturalWidth || img.width;
        const ih = img.naturalHeight || img.height;
        const side = Math.min(iw, ih);
        const sx = (iw - side) / 2;
        const sy = (ih - side) / 2;
        ctx.drawImage(img, sx, sy, side, side, BORDER, BORDER, PHOTO_SIZE, PHOTO_SIZE);
      }

      // 3. Draw SVG frame overlay
      const svgStr = makePolaroidFrameSVG(f, W, H, BORDER, PHOTO_SIZE, BOTTOM);
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const fImg = new Image();
      await new Promise((res, rej) => { fImg.onload = res; fImg.onerror = rej; fImg.src = url; });
      ctx.drawImage(fImg, 0, 0, W, H);
      URL.revokeObjectURL(url);
    }

    // ===== Build the SVG frame overlay for the polaroid =====
    // The photo occupies: x=BORDER, y=BORDER, w=PHOTO_SIZE, h=PHOTO_SIZE
    // The bottom strip:   y=BORDER+PHOTO_SIZE, h=BOTTOM
    // Frame overlays must NOT draw filled rects over the photo area.
    // For solid-bg frames (Space Kei, Moonlit Night etc.) we punch a photo hole via evenodd.
    function makePolaroidFrameSVG(f, W, H, BORDER, PHOTO_SIZE, BOTTOM) {
      const id    = f.id;
      const bg    = f.bg.includes('gradient') ? '#ffffff' : f.bg; // fallback solid for SVG fill
      const border = f.border, accent = f.accent;
      const PAD   = BORDER;

      // Photo slot coords
      const PX = BORDER, PY = BORDER, PS = PHOTO_SIZE;
      // Bottom caption strip
      const BY = BORDER + PHOTO_SIZE;

      // Clip path: entire rect minus the photo slot ONLY (border strips + bottom caption remain drawable)
      const borderClipId = `bclip${id}`;
      const borderClipDef = `<clipPath id="${borderClipId}">
        <path d="M0,0 L${W},0 L${W},${H} L0,${H} Z M${PX},${PY} L${PX+PS},${PY} L${PX+PS},${PY+PS} L${PX},${PY+PS} Z" fill-rule="evenodd"/>
      </clipPath>`;

      // Photo-hole path for fully-filled frames (evenodd punches out the photo)
      const photoHolePath = `M0,0 L${W},0 L${W},${H} L0,${H} Z M${PX},${PY} L${PX+PS},${PY} L${PX+PS},${PY+PS} L${PX},${PY+PS} Z`;

      let frameBg      = '';   // drawn OUTSIDE clip (can cover photo area if it has holes)
      let frameOverlay = '';   // drawn INSIDE clip (photo area clipped out automatically)

      // ── per-frame designs ────────────────────────────────────────────────────
      if (id === 1) { // Cherry Blossom
        const petals = [];
        for(let i=0;i<16;i++) { petals.push([PAD*0.4, (H/15)*i]); petals.push([W-PAD*0.4, (H/15)*i]); }
        for(let i=0;i<10;i++) { petals.push([(W/9)*i, PAD*0.4]); petals.push([(W/9)*i, H-PAD*0.4]); }
        const petalSvg = petals.map(([px,py],idx)=>{
          const rot=idx*37;
          return `<g transform="translate(${px},${py}) rotate(${rot})">
            <ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8"/>
            <ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8" transform="rotate(72 0 0)"/>
            <ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8" transform="rotate(144 0 0)"/>
            <ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8" transform="rotate(216 0 0)"/>
            <ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8" transform="rotate(288 0 0)"/>
            <circle r="2.5" fill="#ffe0f0"/></g>`;
        }).join('');
        frameOverlay = `${petalSvg}<rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 2) { // Rose Garden
        const corners = [[PAD,PAD],[W-PAD,PAD],[PAD,H-PAD],[W-PAD,H-PAD]];
        const roses = corners.map(([cx,cy])=>`<g transform="translate(${cx},${cy})"><circle r="11" fill="#e87090" opacity="0.85"/><circle r="7" fill="#ff9ab0"/><circle r="4" fill="#ffb8c8"/><circle r="2" fill="#ffe0e8"/></g>`).join('');
        frameOverlay = `${roses}<rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;

      } else if (id === 3) { // Lavender Dream
        frameOverlay = `
          <path d="M0,${PAD} Q${W*0.25},${PAD-8} ${W*0.5},${PAD} Q${W*0.75},${PAD+8} ${W},${PAD} L${W},0 L0,0 Z" fill="${accent}"/>
          <path d="M0,${H-PAD} Q${W*0.25},${H-PAD-8} ${W*0.5},${H-PAD} Q${W*0.75},${H-PAD+8} ${W},${H-PAD} L${W},${H} L0,${H} Z" fill="${accent}"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 4) { // Sunflower Pop
        const rays = Array.from({length:36},(_,i)=>{
          const a=i*10*Math.PI/180, r1=Math.min(W,H)*0.48, r2=Math.min(W,H)*0.52, cx=W/2, cy=H/2;
          return `<line x1="${cx+r1*Math.cos(a)}" y1="${cy+r1*Math.sin(a)}" x2="${cx+r2*Math.cos(a)}" y2="${cy+r2*Math.sin(a)}" stroke="#e0b800" stroke-width="4"/>`;
        }).join('');
        frameOverlay = `${rays}<rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;

      } else if (id === 5) { // Daisy Fields
        const grass = Array.from({length:Math.floor(W/7)},(_,i)=>`<rect x="${i*7+1}" y="${H-PAD*1.1}" width="3" height="${PAD*0.8}" rx="1" fill="#60a030"/>`).join('');
        frameOverlay = `
          <rect x="0" y="${H-PAD*1.4}" width="${W}" height="${PAD*1.4}" fill="#c8f090"/>
          <rect x="0" y="${H-PAD*1.7}" width="${W}" height="${PAD*0.35}" fill="#90d060"/>
          ${grass}
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 6) { // Kawaii Pink
        const bows = [[PAD*0.5,PAD*0.5],[W-PAD*0.5,PAD*0.5],[PAD*0.5,H-PAD*0.5],[W-PAD*0.5,H-PAD*0.5]].map(([cx,cy])=>`<text x="${cx}" y="${cy+7}" text-anchor="middle" font-size="22">🎀</text>`).join('');
        frameOverlay = `
          <rect x="0" y="0" width="${W}" height="${PAD*1.1}" fill="${accent}"/>
          <rect x="0" y="${H-PAD*1.1}" width="${W}" height="${PAD*1.1}" fill="${accent}"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>
          ${bows}`;

      } else if (id === 7) { // Bunny Hop
        frameOverlay = `
          <ellipse cx="${PAD*0.7}" cy="${PAD*0.5}" rx="9" ry="20" fill="#e0d0ff"/>
          <ellipse cx="${PAD*0.7}" cy="${PAD*0.5}" rx="5" ry="12" fill="#ffb0d0"/>
          <ellipse cx="${W-PAD*0.7}" cy="${PAD*0.5}" rx="9" ry="20" fill="#e0d0ff"/>
          <ellipse cx="${W-PAD*0.7}" cy="${PAD*0.5}" rx="5" ry="12" fill="#ffb0d0"/>
          <rect x="${PAD/2}" y="${PAD}" width="${W-PAD}" height="${H-PAD*1.5}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 8) { // Star Girl
        const starCorners = [[PAD*0.5,PAD*0.5],[W-PAD*0.5,PAD*0.5],[PAD*0.5,H-PAD*0.5],[W-PAD*0.5,H-PAD*0.5]];
        const stars = starCorners.map(([cx,cy])=>{
          const pts=Array.from({length:5},(_,i)=>{
            const a=(i*72-90)*Math.PI/180, b=(i*72-90+36)*Math.PI/180;
            return `${cx+12*Math.cos(a)},${cy+12*Math.sin(a)} ${cx+5*Math.cos(b)},${cy+5*Math.sin(b)}`;
          }).join(' ');
          return `<polygon points="${pts}" fill="#e0c000"/>`;
        }).join('');
        frameOverlay = `${stars}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2" stroke-dasharray="7,5"/>`;

      } else if (id === 9) { // Candy World
        frameOverlay = `
          <defs><pattern id="candy${id}" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="7" height="14" fill="#ff80a0"/><rect x="7" width="7" height="14" fill="#fff"/>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#candy${id})"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#candy${id})"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#candy${id})"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#candy${id})"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="#ff80a0" stroke-width="2"/>`;

      } else if (id === 10) { // Strawberry
        frameOverlay = `
          <defs><pattern id="dots${id}" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="3.5" fill="#ff8080" opacity="0.5"/>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#dots${id})"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#dots${id})"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#dots${id})"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#dots${id})"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;

      } else if (id === 11) { // Kitty Paws
        const pawPos = [[PAD*0.5,H*0.2],[PAD*0.5,H*0.5],[PAD*0.5,H*0.8],[W-PAD*0.5,H*0.3],[W-PAD*0.5,H*0.6],[W/3,PAD*0.5],[W*2/3,PAD*0.5],[W/3,H-PAD*0.5],[W*2/3,H-PAD*0.5]];
        const paws = pawPos.map(([px,py])=>`<ellipse cx="${px}" cy="${py}" rx="7" ry="6" fill="${accent}"/><circle cx="${px-4}" cy="${py-7}" r="3" fill="${accent}"/><circle cx="${px+4}" cy="${py-7}" r="3" fill="${accent}"/><circle cx="${px}" cy="${py-9}" r="3" fill="${accent}"/>`).join('');
        frameOverlay = `${paws}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="4"/>`;

      } else if (id === 12) { // Sailor Moon
        frameOverlay = `
          <defs><pattern id="stars${id}" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
            <text x="13" y="18" text-anchor="middle" font-size="14">⭐</text>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#stars${id})" opacity="0.6"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#stars${id})" opacity="0.6"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#stars${id})" opacity="0.6"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#stars${id})" opacity="0.6"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;

      } else if (id === 13) { // Cotton Candy
        frameOverlay = `
          <defs><linearGradient id="ccg${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffd0f8"/><stop offset="50%" stop-color="#d0f0ff"/><stop offset="100%" stop-color="#f0ffd0"/>
          </linearGradient></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#ccg${id})" opacity="0.95"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#ccg${id})" opacity="0.95"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#ccg${id})" opacity="0.95"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#ccg${id})" opacity="0.95"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="#d0b0f0" stroke-width="2"/>`;

      } else if (id === 14) { // Mint Cream
        const leaves = Array.from({length:8},(_,i)=>{
          const y=(H/7)*i;
          return `<path d="M${PAD},${y+8} Q${-4},${y+16} ${PAD},${y+24}" fill="#80d0b0"/>
                  <path d="M${W-PAD},${y+8} Q${W+4},${y+16} ${W-PAD},${y+24}" fill="#80d0b0"/>`;
        }).join('');
        frameOverlay = `${leaves}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 15) { // Baby Blue
        const clouds = [[PAD,PAD],[W-PAD,PAD],[PAD,H-PAD],[W-PAD,H-PAD]].map(([cx,cy])=>`<ellipse cx="${cx}" cy="${cy}" rx="16" ry="10" fill="white" opacity="0.85"/><ellipse cx="${cx-6}" cy="${cy+4}" rx="11" ry="8" fill="white" opacity="0.85"/><ellipse cx="${cx+6}" cy="${cy+4}" rx="11" ry="8" fill="white" opacity="0.85"/>`).join('');
        frameOverlay = `${clouds}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 16) { // Peach Sorbet
        frameOverlay = `<path d="M${PAD},${PAD} Q${W*0.25},${PAD-10} ${W*0.5},${PAD} Q${W*0.75},${PAD+10} ${W-PAD},${PAD} L${W-PAD},${H-PAD} Q${W*0.75},${H-PAD-10} ${W*0.5},${H-PAD} Q${W*0.25},${H-PAD+10} ${PAD},${H-PAD} Z" fill="none" stroke="${border}" stroke-width="4"/>`;

      } else if (id === 17) { // Lilac Mist
        frameOverlay = `
          <defs><pattern id="lg${id}" x="0" y="0" width="11" height="11" patternUnits="userSpaceOnUse">
            <circle cx="5.5" cy="5.5" r="2" fill="${border}" opacity="0.5"/>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#lg${id})"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#lg${id})"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#lg${id})"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#lg${id})"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="2"/>`;

      } else if (id === 18) { // Butter Yellow — honeycomb border strips
        const hS=16;
        const mkHex=(cx,cy)=>{const pts=Array.from({length:6},(_,k)=>{const a=(k*60-30)*Math.PI/180;return `${cx+hS*0.5*Math.cos(a)},${cy+hS*0.5*Math.sin(a)}`;}).join(' ');return `<polygon points="${pts}" fill="${accent}" stroke="${border}" stroke-width="1" opacity="0.9"/>`;};
        const topH=Array.from({length:Math.ceil(W/(hS*1.75))},(_,i)=>mkHex(i*hS*1.75,PAD/2)).join('');
        const botH=Array.from({length:Math.ceil(W/(hS*1.75))},(_,i)=>mkHex(i*hS*1.75,H-PAD/2)).join('');
        const lftH=Array.from({length:Math.ceil(H/(hS*1.75))},(_,i)=>mkHex(PAD/2,i*hS*1.75)).join('');
        const rgtH=Array.from({length:Math.ceil(H/(hS*1.75))},(_,i)=>mkHex(W-PAD/2,i*hS*1.75)).join('');
        frameOverlay = `${topH}${botH}${lftH}${rgtH}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;

      } else if (id === 19) { // Vintage Strip — film sides
        const holeCount=Math.floor(H/26);
        const holes=Array.from({length:holeCount},(_,i)=>{const y=6+i*26;return `<rect x="3" y="${y}" width="10" height="10" rx="2" fill="#0a0502" opacity="0.9"/><rect x="${W-13}" y="${y}" width="10" height="10" rx="2" fill="#0a0502" opacity="0.9"/>`;}).join('');
        frameOverlay = `<rect x="0" y="0" width="${PAD}" height="${H}" rx="2" fill="#2a1808"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" rx="2" fill="#2a1808"/>${holes}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="2" fill="none" stroke="${border}" stroke-width="2"/>`;

      } else if (id === 20) { // Film Noir — checkerboard border
        frameOverlay = `
          <defs><pattern id="chk${id}" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="7" height="7" fill="#222"/><rect x="7" y="7" width="7" height="7" fill="#222"/>
            <rect x="7" y="0" width="7" height="7" fill="#eee"/><rect x="0" y="7" width="7" height="7" fill="#eee"/>
          </pattern></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#chk${id})"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#chk${id})"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#chk${id})"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#chk${id})"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;

      } else if (id === 21) { // Kodak
        frameOverlay = `<rect x="0" y="0" width="${W}" height="${PAD*1.4}" fill="#e8b820"/><rect x="0" y="${H-PAD*1.4}" width="${W}" height="${PAD*1.4}" fill="#e8b820"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 22) { // Disco Fever
        const tris=[];
        for(let i=0;i<Math.floor(W/18);i++){tris.push(`<polygon points="${i*18},0 ${i*18+9},${PAD} ${i*18+18},0" fill="${i%2===0?accent:border}"/>`);tris.push(`<polygon points="${i*18},${H} ${i*18+9},${H-PAD} ${i*18+18},${H}" fill="${i%2===0?border:accent}"/>`)}
        for(let i=0;i<Math.floor(H/18);i++){tris.push(`<polygon points="0,${i*18} ${PAD},${i*18+9} 0,${i*18+18}" fill="${i%2===0?accent:border}"/>`);tris.push(`<polygon points="${W},${i*18} ${W-PAD},${i*18+9} ${W},${i*18+18}" fill="${i%2===0?border:accent}"/>`)}
        frameOverlay = `${tris.join('')}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;

      } else if (id === 23) { // Pop Art
        frameOverlay = `<rect x="0" y="0" width="${W}" height="${H}" rx="6" fill="none" stroke="#ff0000" stroke-width="${PAD}"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#ff6000" stroke-width="3"/><rect x="${PAD*1.2}" y="${PAD*1.2}" width="${W-PAD*2.4}" height="${H-PAD*2.4}" rx="2" fill="none" stroke="#ff0000" stroke-width="2"/>`;

      } else if (id === 24) { // Retro Pink
        frameOverlay = `
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="${accent}" opacity="0.75"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="${accent}" opacity="0.75"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="${accent}" opacity="0.75"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="${accent}" opacity="0.75"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 25) { // Winter Frost
        const snowCs=[[PAD*1.2,PAD*1.2],[W-PAD*1.2,PAD*1.2],[PAD*1.2,H-PAD*1.2],[W-PAD*1.2,H-PAD*1.2]];
        const flakes=snowCs.map(([cx,cy])=>Array.from({length:6},(_,i)=>{const a=i*60*Math.PI/180,len=PAD*0.85;return `<line x1="${cx}" y1="${cy}" x2="${cx+len*Math.cos(a)}" y2="${cy+len*Math.sin(a)}" stroke="${border}" stroke-width="2"/><line x1="${cx+len*0.5*Math.cos(a)}" y1="${cy+len*0.5*Math.sin(a)}" x2="${cx+len*0.7*Math.cos(a+0.5)}" y2="${cy+len*0.7*Math.sin(a+0.5)}" stroke="${border}" stroke-width="1.5"/><line x1="${cx+len*0.5*Math.cos(a)}" y1="${cy+len*0.5*Math.sin(a)}" x2="${cx+len*0.7*Math.cos(a-0.5)}" y2="${cy+len*0.7*Math.sin(a-0.5)}" stroke="${border}" stroke-width="1.5"/>`;}).join('')).join('');
        frameOverlay = `${flakes}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="2" stroke-dasharray="5,4"/>`;

      } else if (id === 26) { // Summer Breeze
        frameOverlay = `
          <path d="M0,${PAD} Q${W*0.25},${PAD*0.4} ${W*0.5},${PAD} Q${W*0.75},${PAD*1.6} ${W},${PAD} L${W},0 L0,0 Z" fill="${accent}"/>
          <path d="M0,${H-PAD} Q${W*0.25},${H-PAD*0.4} ${W*0.5},${H-PAD} Q${W*0.75},${H-PAD*1.6} ${W},${H-PAD} L${W},${H} L0,${H} Z" fill="${accent}"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 27) { // Autumn Leaves
        const leafs=[[PAD*0.5,PAD*0.5,'🍁'],[W-PAD*0.5,PAD*0.5,'🍂'],[PAD*0.5,H-PAD*0.5,'🍂'],[W-PAD*0.5,H-PAD*0.5,'🍁'],[PAD*0.5,H/2,'🍁'],[W-PAD*0.5,H/2,'🍂'],[W/2,PAD*0.5,'🍁'],[W/2,H-PAD*0.5,'🍂']];
        const ls=leafs.map(([x,y,e])=>`<text x="${x}" y="${y+8}" text-anchor="middle" font-size="18">${e}</text>`).join('');
        frameOverlay = `${ls}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 28) { // Spring Fresh
        const vines=Array.from({length:7},(_,i)=>{const y=(H/6)*i;return `<ellipse cx="${PAD*0.7}" cy="${y+12}" rx="9" ry="14" fill="#90d060" transform="rotate(-20 ${PAD*0.7} ${y+12})"/><ellipse cx="${W-PAD*0.7}" cy="${y+18}" rx="9" ry="14" fill="#90d060" transform="rotate(20 ${W-PAD*0.7} ${y+18})"/>`;}).join('');
        frameOverlay = `<path d="M${PAD*0.5},${H} Q${PAD*0.5},${H*0.6} ${PAD},${H*0.4} Q${PAD*1.2},${H*0.2} ${PAD},0" stroke="#60b060" stroke-width="4" fill="none"/><path d="M${W-PAD*0.5},${H} Q${W-PAD*0.5},${H*0.6} ${W-PAD},${H*0.4} Q${W-PAD*1.2},${H*0.2} ${W-PAD},0" stroke="#60b060" stroke-width="4" fill="none"/>${vines}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="2"/>`;

      } else if (id === 29) { // Xmas Magic
        frameOverlay = `
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="#c02020"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="#c02020"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="#c02020"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="#c02020"/>
          <text x="${W/2}" y="${PAD*0.8}" text-anchor="middle" font-size="13" fill="white">⭐ ⭐ ⭐ ⭐ ⭐</text>
          <text x="${W/2}" y="${H-PAD*0.3}" text-anchor="middle" font-size="13" fill="white">🎁 🎁 🎁</text>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#ff4040" stroke-width="2"/>`;

      } else if (id === 30) { // Halloween
        const webSize=PAD*3;
        const webLines=[0,30,60,90,120,150].map(angle=>{const a=angle*Math.PI/180;return `<line x1="0" y1="0" x2="${webSize*Math.cos(a)}" y2="${webSize*Math.sin(a)}" stroke="#888" stroke-width="1.5"/>`;}).join('');
        const webArcs=[webSize*0.3,webSize*0.6,webSize].map(r=>`<path d="M${r},0 A${r},${r} 0 0,1 0,${r}" fill="none" stroke="#888" stroke-width="1.5"/>`).join('');
        frameOverlay = `<g transform="translate(0,0)">${webLines}${webArcs}</g><g transform="translate(${W},0) scale(-1,1)">${webLines}${webArcs}</g><g transform="translate(0,${H}) scale(1,-1)">${webLines}${webArcs}</g><g transform="translate(${W},${H}) scale(-1,-1)">${webLines}${webArcs}</g><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="#553300" stroke-width="3"/>`;

      } else if (id === 31) { // Pure White
        frameOverlay = `<rect x="4" y="4" width="${W-8}" height="${H-8}" rx="5" fill="none" stroke="#d0d0d0" stroke-width="3"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#e8e8e8" stroke-width="1.5"/>`;

      } else if (id === 32) { // Gold Foil
        frameOverlay = `
          <defs><linearGradient id="gold${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f5d900"/><stop offset="40%" stop-color="#fffbe0"/><stop offset="100%" stop-color="#c8a800"/>
          </linearGradient></defs>
          <rect x="4" y="4" width="${W-8}" height="${H-8}" rx="7" fill="none" stroke="url(#gold${id})" stroke-width="7"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#e0c000" stroke-width="1.5"/>`;

      } else if (id === 33) { // Silver Lining
        frameOverlay = `
          <defs><linearGradient id="silver${id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#909090"/><stop offset="40%" stop-color="#e0e0e0"/><stop offset="70%" stop-color="#b0b0b0"/><stop offset="100%" stop-color="#808080"/>
          </linearGradient></defs>
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#silver${id})"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#silver${id})"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#silver${id})"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#silver${id})"/>
          <rect x="4" y="4" width="${W-8}" height="${H-8}" rx="7" fill="none" stroke="url(#silver${id})" stroke-width="3"/>`;

      } else if (id === 34) { // Marble Blush
        frameOverlay = `
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="#f5ece8"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="#f5ece8"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="#f5ece8"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="#f5ece8"/>
          <path d="M${W*0.1},0 Q${W*0.3},${H*0.3} ${W*0.2},${H*0.6} Q${W*0.3},${H*0.8} ${W*0.25},${H}" stroke="#d4a090" stroke-width="3.5" fill="none" opacity="0.65"/>
          <path d="M${W*0.5},0 Q${W*0.6},${H*0.25} ${W*0.65},${H*0.5} Q${W*0.75},${H*0.75} ${W*0.55},${H}" stroke="#c09080" stroke-width="2.5" fill="none" opacity="0.45"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 35) { // Ink & Paper
        const lines=Array.from({length:Math.floor(H/22)},(_,i)=>`<line x1="${PAD*1.5}" y1="${18+i*22}" x2="${W-PAD}" y2="${18+i*22}" stroke="#c0b090" stroke-width="1.1"/>`).join('');
        frameOverlay = `${lines}<line x1="${PAD*1.5}" y1="0" x2="${PAD*1.5}" y2="${H}" stroke="#e0d0b0" stroke-width="2"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="3" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 36) { // Rainbow
        const rColors=['#ff4444','#ff8800','#ffee00','#44cc44','#4488ff','#8844cc'];
        const arcs=rColors.map((c,i)=>`<path d="M${8+i*5},${H} Q${W/2},${H*0.05+i*20} ${W-8-i*5},${H}" fill="none" stroke="${c}" stroke-width="4" opacity="0.6"/>`).join('');
        frameOverlay = `${arcs}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 37) { // Space Kei — solid bg with photo hole
        const stars=Array.from({length:100},(_,i)=>{const x=(i*173+7)%W,y=(i*231+5)%H;return `<circle cx="${x}" cy="${y}" r="${i%7===0?2.2:i%3===0?1.3:0.7}" fill="white" opacity="${0.2+i%7*0.11}"/>`;}).join('');
        const shoots=[[W*0.2,H*0.15,W*0.35,H*0.22],[W*0.6,H*0.08,W*0.8,H*0.18]].map(([x1,y1,x2,y2])=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="1.5" opacity="0.6"/>`).join('');
        const planet=`<circle cx="${W*0.85}" cy="${H*0.1}" r="10" fill="#6040a0" opacity="0.75"/><circle cx="${W*0.85}" cy="${H*0.1}" r="6" fill="#8060c0" opacity="0.5"/>`;
        frameBg = `<path fill-rule="evenodd" fill="#0a0820" d="${photoHolePath}"/>${stars}${shoots}${planet}`;
        frameOverlay = `<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="#5050c0" stroke-width="2"/>`;

      } else if (id === 38) { // Mermaid
        const waves=Array.from({length:5},(_,i)=>{const y=(H/4)*i;return `<path d="M0,${y} Q${W*0.25},${y-10} ${W*0.5},${y} Q${W*0.75},${y+10} ${W},${y}" stroke="${border}" stroke-width="2" fill="none" opacity="0.35"/>`;}).join('');
        frameOverlay = `${waves}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="4"/>`;

      } else if (id === 39) { // Magic Girl
        const sparkles=Array.from({length:24},(_,i)=>{let x,y;if(i<7){x=(W/6)*i;y=PAD*0.5;}else if(i<14){x=(W/6)*(i-7);y=H-PAD*0.5;}else if(i<19){x=PAD*0.5;y=(H/4)*(i-14);}else{x=W-PAD*0.5;y=(H/4)*(i-19);}return `<text x="${x}" y="${y+5}" text-anchor="middle" font-size="12">✨</text>`;}).join('');
        frameOverlay = `${sparkles}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 40) { // Y2K Vibes
        const circuits=Array.from({length:7},(_,i)=>{const y=(H/6)*i;return `<line x1="0" y1="${y+8}" x2="${W*0.2}" y2="${y+8}" stroke="${border}" stroke-width="1.5" opacity="0.4"/><circle cx="${W*0.2}" cy="${y+8}" r="2.5" fill="${border}" opacity="0.4"/><line x1="${W*0.8}" y1="${y+8}" x2="${W}" y2="${y+8}" stroke="${border}" stroke-width="1.5" opacity="0.4"/><circle cx="${W*0.8}" cy="${y+8}" r="2.5" fill="${border}" opacity="0.4"/>`;}).join('');
        frameOverlay = `${circuits}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 41) { // Rose Gold
        frameOverlay = `
          <defs><linearGradient id="rg${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e8b0a0"/><stop offset="50%" stop-color="#f8d0c0"/><stop offset="100%" stop-color="#d09080"/>
          </linearGradient></defs>
          <rect x="4" y="4" width="${W-8}" height="${H-8}" rx="7" fill="none" stroke="url(#rg${id})" stroke-width="7"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;

      } else if (id === 42) { // Amethyst
        const gemCs=[[0,0],[W,0],[0,H],[W,H]];
        const gems=gemCs.map(([cx,cy])=>{const sx=cx===0?1:-1,sy=cy===0?1:-1,s=PAD*1.3;return `<polygon points="${cx},${cy} ${cx+sx*s},${cy} ${cx+sx*s*0.6},${cy+sy*s*0.6} ${cx},${cy+sy*s}" fill="${accent}" opacity="0.8"/>`;}).join('');
        frameOverlay = `${gems}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 43) { // Champagne
        const bubbles=Array.from({length:36},(_,i)=>{let x,y;if(i<10){x=(W/9)*i;y=PAD*0.6;}else if(i<20){x=(W/9)*(i-10);y=H-PAD*0.6;}else if(i<28){x=PAD*0.6;y=(H/7)*(i-20);}else{x=W-PAD*0.6;y=(H/7)*(i-28);}const r=2.5+(i%4)*1.2;return `<circle cx="${x}" cy="${y}" r="${r}" fill="${accent}" opacity="0.6"/>`;}).join('');
        frameOverlay = `${bubbles}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 44) { // Holographic
        frameOverlay = `
          <defs><linearGradient id="holo${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff80c0"/><stop offset="20%" stop-color="#ff80ff"/>
            <stop offset="40%" stop-color="#8080ff"/><stop offset="60%" stop-color="#80ffff"/>
            <stop offset="80%" stop-color="#80ff80"/><stop offset="100%" stop-color="#ffff80"/>
          </linearGradient></defs>
          <rect x="4" y="4" width="${W-8}" height="${H-8}" rx="7" fill="none" stroke="url(#holo${id})" stroke-width="9"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2" opacity="0.5"/>`;

      } else if (id === 45) { // Black Lace
        frameOverlay = `
          <rect x="0" y="0" width="${PAD}" height="${H}" fill="#2a1020" opacity="0.9"/>
          <rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="#2a1020" opacity="0.9"/>
          <rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="#2a1020" opacity="0.9"/>
          <rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="#2a1020" opacity="0.9"/>
          <rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#2a1020" stroke-width="2"/>`;

      } else if (id === 46) { // Forest Fairy
        const fVines=Array.from({length:10},(_,i)=>{const y=(H/9)*i;return `<ellipse cx="${PAD*0.5}" cy="${y+10}" rx="7" ry="12" fill="#90d060" opacity="0.75" transform="rotate(-15 ${PAD*0.5} ${y+10})"/><ellipse cx="${W-PAD*0.5}" cy="${y+15}" rx="7" ry="12" fill="#90d060" opacity="0.75" transform="rotate(15 ${W-PAD*0.5} ${y+15})"/>`;}).join('');
        frameOverlay = `${fVines}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 47) { // Ocean Breeze — solid bg with photo hole
        const waveLines=[H*0.15,H*0.35,H*0.55,H*0.75,H*0.9].map(wy=>`<path d="M0,${wy} Q${W*0.25},${wy-8} ${W*0.5},${wy} Q${W*0.75},${wy+8} ${W},${wy}" stroke="white" stroke-width="2" fill="none" opacity="0.35"/>`).join('');
        frameBg = `<defs><linearGradient id="ocean${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87ceeb"/><stop offset="100%" stop-color="#1a6090"/></linearGradient></defs><path fill-rule="evenodd" fill="url(#ocean${id})" d="${photoHolePath}"/>${waveLines}`;
        frameOverlay = `<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;

      } else if (id === 48) { // Sunset Glow — solid bg with photo hole
        const treeCount=Math.floor(W/20);
        const trees=Array.from({length:treeCount},(_,i)=>`<polygon points="${i*20},${H} ${i*20+10},${H-40} ${i*20+20},${H}" fill="#1a3010"/>`).join('');
        frameBg = `<defs><linearGradient id="sunset${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ff9060"/><stop offset="40%" stop-color="#ffb060"/><stop offset="70%" stop-color="#ff6040"/><stop offset="100%" stop-color="#c03020"/></linearGradient></defs><path fill-rule="evenodd" fill="url(#sunset${id})" d="${photoHolePath}"/><rect x="0" y="${H-24}" width="${W}" height="24" fill="#1a3010"/>${trees}<circle cx="${W/2}" cy="${PAD*1.4}" r="${PAD*0.9}" fill="#ffe060" opacity="0.7"/>`;
        frameOverlay = `<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>`;

      } else if (id === 49) { // Sakura Park
        const blossoms=Array.from({length:24},(_,i)=>{const bx=(i*137+10)%W,by=(i*173+10)%H;return `<g transform="translate(${bx},${by}) rotate(${i*25})"><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75"/><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75" transform="rotate(72)"/><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75" transform="rotate(144)"/><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75" transform="rotate(216)"/><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75" transform="rotate(288)"/><circle r="3" fill="#ffe0f0"/></g>`;}).join('');
        frameOverlay = `${blossoms}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;

      } else if (id === 50) { // Moonlit Night — solid bg with photo hole
        const nightStars=Array.from({length:110},(_,i)=>{const x=(i*173+3)%W,y=(i*137+3)%H;return `<circle cx="${x}" cy="${y}" r="${i%5===0?1.8:i%3===0?1.1:0.6}" fill="white" opacity="${0.2+i%6*0.11}"/>`;}).join('');
        const moon=`<path d="M${W*0.78},${PAD*0.4} Q${W*0.64},${PAD*1.2} ${W*0.64},${PAD*2.4} Q${W*0.64},${PAD*3.8} ${W*0.80},${PAD*4.6} Q${W*0.64},${PAD*4.8} ${W*0.52},${PAD*3.8} Q${W*0.42},${PAD*2.4} ${W*0.52},${PAD*1.2} Q${W*0.58},${PAD*0.4} ${W*0.78},${PAD*0.4} Z" fill="#e8e860" opacity="0.9"/>`;
        frameBg = `<path fill-rule="evenodd" fill="#0e0c24" d="${photoHolePath}"/>${nightStars}${moon}`;
        frameOverlay = `<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="#5050b0" stroke-width="2"/>`;

      } else { // Generic fallback
        frameOverlay = `<rect x="0" y="0" width="${W}" height="${H}" rx="5" fill="none" stroke="${border}" stroke-width="${PAD}"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${accent}" stroke-width="2"/>`;
      }

      // Corner stickers (always outside clip, always visible)
      const stickerRow = `
        <text x="${PAD*0.9}" y="${PAD*1.8}" font-size="24" font-family="serif">${f.s[0]}</text>
        <text x="${W-PAD*0.9}" y="${PAD*1.8}" text-anchor="end" font-size="24" font-family="serif">${f.s[1]}</text>
        <text x="${PAD*0.9}" y="${H-PAD*0.4}" font-size="20" font-family="serif">${f.s[2]}</text>
        <text x="${W-PAD*0.9}" y="${H-PAD*0.4}" text-anchor="end" font-size="20" font-family="serif">${f.s[3]}</text>`;

      // Extract embedded <defs> from frameOverlay (gradient patterns etc.)
      const defsRe = /<defs>([\s\S]*?)<\/defs>/g;
      let embDefs = '';
      const cleanFO = frameOverlay.replace(defsRe, (_, d) => { embDefs += d; return ''; });
      const cleanFB = frameBg.replace(defsRe, (_, d) => { embDefs += d; return ''; });

      return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
        <defs>${borderClipDef}${embDefs}</defs>
        ${cleanFB}
        <g clip-path="url(#${borderClipId})">${cleanFO}</g>
        ${stickerRow}
      </svg>`;
    }

    // ===== Download =====
    async function downloadPolaroid() {
      const f = currentFrame;
      const canvas = document.createElement('canvas');
      await renderPolaroidToCanvas(canvas, f, capturedDataURL, 1);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `kawaii-polaroid-${f.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
    }

    // ===== Init =====
    window.addEventListener('DOMContentLoaded', initCamera);

    // ===== Hamburger Menu =====
    (function() {
      const btn = document.getElementById('hamburger');
      const nav = document.getElementById('siteNav');
      if (!btn || !nav) return;
      btn.addEventListener('click', function() {
        const open = nav.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
      });
    })();
    </script>

    <!-- ===== GRASS STRIP ===== -->
    <div class="grass-strip" aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Ground fill -->
        <rect x="0" y="50" width="1440" height="40" fill="#a8e063"/>
        <!-- Grass blades — repeating pattern of triangles/curves -->
        <g fill="#6dbb2a">
          <!-- Left cluster -->
          <polygon points="0,52 6,18 12,52"/>
          <polygon points="8,52 15,10 22,52"/>
          <polygon points="18,52 24,22 30,52"/>
          <polygon points="26,52 33,8  40,52"/>
          <polygon points="36,52 42,20 48,52"/>
          <polygon points="44,52 51,14 58,52"/>
          <polygon points="54,52 60,24 66,52"/>
          <polygon points="62,52 69,10 76,52"/>
          <polygon points="72,52 78,18 84,52"/>
          <polygon points="80,52 87,6  94,52"/>
          <polygon points="90,52 96,22 102,52"/>
          <polygon points="98,52 105,12 112,52"/>
          <polygon points="108,52 114,26 120,52"/>
          <polygon points="116,52 123,8  130,52"/>
          <polygon points="126,52 132,20 138,52"/>
          <polygon points="134,52 141,14 148,52"/>
          <polygon points="144,52 150,28 156,52"/>
          <polygon points="152,52 159,10 166,52"/>
          <polygon points="162,52 168,22 174,52"/>
          <polygon points="170,52 177,6  184,52"/>
          <polygon points="180,52 186,18 192,52"/>
          <polygon points="188,52 195,12 202,52"/>
          <polygon points="198,52 204,26 210,52"/>
          <polygon points="206,52 213,8  220,52"/>
          <polygon points="216,52 222,20 228,52"/>
          <polygon points="224,52 231,14 238,52"/>
          <polygon points="234,52 240,28 246,52"/>
          <polygon points="242,52 249,10 256,52"/>
          <polygon points="252,52 258,22 264,52"/>
          <polygon points="260,52 267,6  274,52"/>
          <polygon points="270,52 276,18 282,52"/>
          <polygon points="278,52 285,12 292,52"/>
          <polygon points="288,52 294,26 300,52"/>
          <polygon points="296,52 303,8  310,52"/>
          <polygon points="306,52 312,20 318,52"/>
          <polygon points="314,52 321,14 328,52"/>
          <polygon points="324,52 330,28 336,52"/>
          <polygon points="332,52 339,10 346,52"/>
          <polygon points="342,52 348,22 354,52"/>
          <polygon points="350,52 357,6  364,52"/>
          <polygon points="360,52 366,18 372,52"/>
          <polygon points="368,52 375,12 382,52"/>
          <polygon points="378,52 384,26 390,52"/>
          <polygon points="386,52 393,8  400,52"/>
          <polygon points="396,52 402,20 408,52"/>
          <polygon points="404,52 411,14 418,52"/>
          <polygon points="414,52 420,28 426,52"/>
          <polygon points="422,52 429,10 436,52"/>
          <polygon points="432,52 438,22 444,52"/>
          <polygon points="440,52 447,6  454,52"/>
          <polygon points="450,52 456,18 462,52"/>
          <polygon points="458,52 465,12 472,52"/>
          <polygon points="468,52 474,26 480,52"/>
          <polygon points="476,52 483,8  490,52"/>
          <polygon points="486,52 492,20 498,52"/>
          <polygon points="494,52 501,14 508,52"/>
          <polygon points="504,52 510,28 516,52"/>
          <polygon points="512,52 519,10 526,52"/>
          <polygon points="522,52 528,22 534,52"/>
          <polygon points="530,52 537,6  544,52"/>
          <polygon points="540,52 546,18 552,52"/>
          <polygon points="548,52 555,12 562,52"/>
          <polygon points="558,52 564,26 570,52"/>
          <polygon points="566,52 573,8  580,52"/>
          <polygon points="576,52 582,20 588,52"/>
          <polygon points="584,52 591,14 598,52"/>
          <polygon points="594,52 600,28 606,52"/>
          <polygon points="602,52 609,10 616,52"/>
          <polygon points="612,52 618,22 624,52"/>
          <polygon points="620,52 627,6  634,52"/>
          <polygon points="630,52 636,18 642,52"/>
          <polygon points="638,52 645,12 652,52"/>
          <polygon points="648,52 654,26 660,52"/>
          <polygon points="656,52 663,8  670,52"/>
          <polygon points="666,52 672,20 678,52"/>
          <polygon points="674,52 681,14 688,52"/>
          <polygon points="684,52 690,28 696,52"/>
          <polygon points="692,52 699,10 706,52"/>
          <polygon points="702,52 708,22 714,52"/>
          <polygon points="710,52 717,6  724,52"/>
          <polygon points="720,52 726,18 732,52"/>
          <polygon points="728,52 735,12 742,52"/>
          <polygon points="738,52 744,26 750,52"/>
          <polygon points="746,52 753,8  760,52"/>
          <polygon points="756,52 762,20 768,52"/>
          <polygon points="764,52 771,14 778,52"/>
          <polygon points="774,52 780,28 786,52"/>
          <polygon points="782,52 789,10 796,52"/>
          <polygon points="792,52 798,22 804,52"/>
          <polygon points="800,52 807,6  814,52"/>
          <polygon points="810,52 816,18 822,52"/>
          <polygon points="818,52 825,12 832,52"/>
          <polygon points="828,52 834,26 840,52"/>
          <polygon points="836,52 843,8  850,52"/>
          <polygon points="846,52 852,20 858,52"/>
          <polygon points="854,52 861,14 868,52"/>
          <polygon points="864,52 870,28 876,52"/>
          <polygon points="872,52 879,10 886,52"/>
          <polygon points="882,52 888,22 894,52"/>
          <polygon points="890,52 897,6  904,52"/>
          <polygon points="900,52 906,18 912,52"/>
          <polygon points="908,52 915,12 922,52"/>
          <polygon points="918,52 924,26 930,52"/>
          <polygon points="926,52 933,8  940,52"/>
          <polygon points="936,52 942,20 948,52"/>
          <polygon points="944,52 951,14 958,52"/>
          <polygon points="954,52 960,28 966,52"/>
          <polygon points="962,52 969,10 976,52"/>
          <polygon points="972,52 978,22 984,52"/>
          <polygon points="980,52 987,6  994,52"/>
          <polygon points="990,52 996,18 1002,52"/>
          <polygon points="998,52 1005,12 1012,52"/>
          <polygon points="1008,52 1014,26 1020,52"/>
          <polygon points="1016,52 1023,8  1030,52"/>
          <polygon points="1026,52 1032,20 1038,52"/>
          <polygon points="1034,52 1041,14 1048,52"/>
          <polygon points="1044,52 1050,28 1056,52"/>
          <polygon points="1052,52 1059,10 1066,52"/>
          <polygon points="1062,52 1068,22 1074,52"/>
          <polygon points="1070,52 1077,6  1084,52"/>
          <polygon points="1080,52 1086,18 1092,52"/>
          <polygon points="1088,52 1095,12 1102,52"/>
          <polygon points="1098,52 1104,26 1110,52"/>
          <polygon points="1106,52 1113,8  1120,52"/>
          <polygon points="1116,52 1122,20 1128,52"/>
          <polygon points="1124,52 1131,14 1138,52"/>
          <polygon points="1134,52 1140,28 1146,52"/>
          <polygon points="1142,52 1149,10 1156,52"/>
          <polygon points="1152,52 1158,22 1164,52"/>
          <polygon points="1160,52 1167,6  1174,52"/>
          <polygon points="1170,52 1176,18 1182,52"/>
          <polygon points="1178,52 1185,12 1192,52"/>
          <polygon points="1188,52 1194,26 1200,52"/>
          <polygon points="1196,52 1203,8  1210,52"/>
          <polygon points="1206,52 1212,20 1218,52"/>
          <polygon points="1214,52 1221,14 1228,52"/>
          <polygon points="1224,52 1230,28 1236,52"/>
          <polygon points="1232,52 1239,10 1246,52"/>
          <polygon points="1242,52 1248,22 1254,52"/>
          <polygon points="1250,52 1257,6  1264,52"/>
          <polygon points="1260,52 1266,18 1272,52"/>
          <polygon points="1268,52 1275,12 1282,52"/>
          <polygon points="1278,52 1284,26 1290,52"/>
          <polygon points="1286,52 1293,8  1300,52"/>
          <polygon points="1296,52 1302,20 1308,52"/>
          <polygon points="1304,52 1311,14 1318,52"/>
          <polygon points="1314,52 1320,28 1326,52"/>
          <polygon points="1322,52 1329,10 1336,52"/>
          <polygon points="1332,52 1338,22 1344,52"/>
          <polygon points="1340,52 1347,6  1354,52"/>
          <polygon points="1350,52 1356,18 1362,52"/>
          <polygon points="1358,52 1365,12 1372,52"/>
          <polygon points="1368,52 1374,26 1380,52"/>
          <polygon points="1376,52 1383,8  1390,52"/>
          <polygon points="1386,52 1392,20 1398,52"/>
          <polygon points="1394,52 1401,14 1408,52"/>
          <polygon points="1404,52 1410,28 1416,52"/>
          <polygon points="1412,52 1419,10 1426,52"/>
          <polygon points="1422,52 1428,22 1434,52"/>
          <polygon points="1430,52 1437,6  1444,52"/>
        </g>
        <!-- Lighter highlight blades on top -->
        <g fill="#8dd44a" opacity="0.7">
          <polygon points="4,52 10,22 16,52"/>
          <polygon points="20,52 26,14 32,52"/>
          <polygon points="48,52 54,20 60,52"/>
          <polygon points="76,52 82,10 88,52"/>
          <polygon points="120,52 126,18 132,52"/>
          <polygon points="160,52 166,8  172,52"/>
          <polygon points="200,52 206,22 212,52"/>
          <polygon points="260,52 266,14 272,52"/>
          <polygon points="320,52 326,20 332,52"/>
          <polygon points="400,52 406,10 412,52"/>
          <polygon points="480,52 486,18 492,52"/>
          <polygon points="560,52 566,8  572,52"/>
          <polygon points="640,52 646,22 652,52"/>
          <polygon points="720,52 726,14 732,52"/>
          <polygon points="800,52 806,20 812,52"/>
          <polygon points="880,52 886,10 892,52"/>
          <polygon points="960,52 966,18 972,52"/>
          <polygon points="1040,52 1046,8  1052,52"/>
          <polygon points="1120,52 1126,22 1132,52"/>
          <polygon points="1200,52 1206,14 1212,52"/>
          <polygon points="1280,52 1286,20 1292,52"/>
          <polygon points="1360,52 1366,10 1372,52"/>
          <polygon points="1420,52 1426,18 1432,52"/>
        </g>
        <!-- Small pink flowers scattered in grass -->
        <g font-size="14" text-anchor="middle" font-family="serif">
          <text x="60"  y="52">🌸</text>
          <text x="200" y="50">🌼</text>
          <text x="380" y="52">🌸</text>
          <text x="560" y="50">🌼</text>
          <text x="740" y="52">🌸</text>
          <text x="920" y="50">🌼</text>
          <text x="1100" y="52">🌸</text>
          <text x="1280" y="50">🌼</text>
          <text x="1420" y="52">🌸</text>
        </g>
      </svg>
    </div>

    <!-- ===== BUTTERFLIES ===== -->
    <!-- Each butterfly has its own speed, delay, vertical travel, and bottom position -->
    <span class="butterfly" aria-hidden="true" style="--bx-dur:22s;--bx-delay:0s;  --by-dur:3.0s;--by-delay:0s;  --flap-dur:.32s;--flap-delay:0s;  --bf-bottom:100px;--tilt:-5deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:17s;--bx-delay:-5s; --by-dur:2.6s;--by-delay:.4s; --flap-dur:.28s;--flap-delay:.1s; --bf-bottom:130px;--tilt:4deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:25s;--bx-delay:-10s;--by-dur:3.4s;--by-delay:.8s; --flap-dur:.36s;--flap-delay:.05s;--bf-bottom:115px;--tilt:-8deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:19s;--bx-delay:-3s; --by-dur:2.8s;--by-delay:.2s; --flap-dur:.30s;--flap-delay:.15s;--bf-bottom:145px;--tilt:6deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:28s;--bx-delay:-14s;--by-dur:3.8s;--by-delay:1s;  --flap-dur:.40s;--flap-delay:0s;  --bf-bottom:105px;--tilt:-3deg">🦋</span>
    <span class="butterfly" aria-hidden="true" style="--bx-dur:15s;--bx-delay:-7s; --by-dur:2.4s;--by-delay:.6s; --flap-dur:.26s;--flap-delay:.2s; --bf-bottom:160px;--tilt:9deg">🦋</span>

  </body>
</html>