<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Choose Your Style — Photobooth Kawaii</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700&family=Fredoka:wght@600;700&display=swap" rel="stylesheet" />
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
        --lavender: #e8d4f0;
        --brown: #4a3728;
        --white: #fffefd;
        --gray: #6b5a52;
        --cream: #fff5f0;
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        font-family: var(--font-body);
        background: linear-gradient(165deg, #f5e6ff 0%, #ffd6e8 45%, #e8d4ff 100%);
        min-height: 100vh;
        overflow-x: hidden;
      }

      /* ===== HEADER (from about.html) ===== */
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
        text-align: center;
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

      /* ===== MAIN CONTENT ===== */
      main {
        max-width: 900px;
        margin: 0 auto;
        padding: 2.5rem 1.5rem 5rem;
        text-align: center;
        position: relative;
        z-index: 1;
      }

      .page-heading {
        font-family: var(--font-display);
        font-size: clamp(1.8rem, 6vw, 3rem);
        color: var(--pink-deep);
        margin: 1.5rem 0 0.5rem;
        text-shadow: 2px 2px 0 var(--white);
      }
      .page-sub {
        color: var(--gray);
        font-size: 1.05rem;
        margin-bottom: 2.5rem;
        font-family: var(--font-body);
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 1.5rem;
        color: var(--pink-deep);
        font-size: 0.9rem;
        text-decoration: none;
        font-family: var(--font-body);
        font-weight: 700;
        transition: color 0.2s;
      }
      .back-link:hover { color: var(--brown); }

      /* ===== STYLE GRID ===== */
      .style-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        max-width: 680px;
        margin: 0 auto;
      }
      @media (max-width: 580px) { .style-grid { grid-template-columns: 1fr; } }

      .style-card {
        background: var(--white);
        border-radius: 28px;
        padding: 2rem 1.5rem;
        box-shadow: 0 12px 40px rgba(180,120,200,0.18);
        cursor: pointer;
        border: 3px solid transparent;
        transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        animation: cardIn 0.5s ease both;
      }
      .style-card:nth-child(2) { animation-delay: 0.12s; }
      .style-card:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 20px 56px rgba(255,100,160,0.28);
        border-color: var(--pink);
        color: inherit;
      }
      @keyframes cardIn {
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      .card-visual {
        width: 120px;
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      /* Polaroid visual */
      .visual-polaroid {
        background: #fff;
        border-radius: 6px;
        padding: 10px 10px 34px;
        box-shadow: 4px 6px 20px rgba(180,120,200,0.3);
        width: 100px;
        transform: rotate(-3deg);
      }
      .visual-polaroid .p-img {
        width: 80px;
        height: 72px;
        background: linear-gradient(135deg, #ffe8f4, #e8d4ff);
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
      }
      .visual-polaroid .p-label {
        margin-top: 6px;
        font-family: var(--font-body);
        font-size: 0.65rem;
        color: #c0b0d0;
        text-align: center;
      }
      .card-badge {
        position: absolute;
        top: -8px;
        right: -12px;
        background: var(--pink-deep);
        color: #fff;
        font-size: 0.6rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 99px;
        font-family: var(--font-display);
        letter-spacing: 0.04em;
      }

      /* Photostrip visual */
      .visual-strip {
        background: #fff;
        border-radius: 6px;
        padding: 6px 5px;
        box-shadow: 4px 6px 20px rgba(180,120,200,0.3);
        width: 48px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        transform: rotate(2deg);
      }
      .visual-strip .s-cell {
        height: 32px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
      }

      .card-title {
        font-family: var(--font-display);
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--brown);
      }
      .card-desc {
        font-size: 0.88rem;
        color: var(--gray);
        line-height: 1.5;
        font-family: var(--font-body);
      }
      .card-tag {
        background: linear-gradient(135deg, #ffe8f4, #e8d4ff);
        border-radius: 99px;
        padding: 4px 14px;
        font-size: 0.75rem;
        color: var(--pink-deep);
        font-weight: 700;
        font-family: var(--font-display);
      }

      /* ===== FLOATING BG DECOR ===== */
      .bg-floats { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
      .bg-floats svg { position: absolute; opacity: 0.7; animation: float 6s ease-in-out infinite; }
      .bg-floats .f1 { top: 10%; left: 6%; animation-delay: 0s; }
      .bg-floats .f2 { top: 20%; right: 10%; width: 48px; animation-delay: 1s; }
      .bg-floats .f3 { bottom: 30%; left: 4%; width: 50px; animation-delay: 2s; }
      .bg-floats .f4 { top: 55%; right: 7%; width: 44px; animation-delay: 0.5s; }
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(-2deg); }
        50%       { transform: translateY(-12px) rotate(2deg); }
      }

      /* ===== FOOTER (from about.html) ===== */
      .site-footer {
        background: linear-gradient(135deg, #ffb8d4 0%, #ffc8dc 50%, #ffb0d0 100%);
        border-top: 3px solid rgba(255,150,180,.3);
        box-shadow: 0 -4px 20px rgba(200,80,130,.12);
        padding: 2.5rem 1.5rem 2rem;
        margin-top: 3rem;
        position: relative;
        z-index: 1;
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
    </style>
  </head>
  <body>

    <!-- Floating background decorations -->
    <div class="bg-floats" aria-hidden="true">
      <svg class="f1" width="56" height="42" viewBox="0 0 64 48">
        <ellipse cx="32" cy="28" rx="28" ry="16" fill="#fff" stroke="#c9b8e8" stroke-width="2"/>
        <circle cx="22" cy="18" r="3" fill="#4a3728"/>
        <circle cx="42" cy="18" r="3" fill="#4a3728"/>
        <path d="M26 30 Q32 36 38 30" stroke="#4a3728" stroke-width="2" fill="none" stroke-linecap="round"/>
      </svg>
      <svg class="f2" viewBox="0 0 48 48">
        <polygon points="24,4 30,18 46,18 34,28 38,44 24,36 10,44 14,28 2,18 18,18" fill="#ffe066" stroke="#f0c040" stroke-width="2"/>
        <circle cx="18" cy="22" r="2.5" fill="#4a3728"/>
        <circle cx="28" cy="22" r="2.5" fill="#4a3728"/>
      </svg>
      <svg class="f3" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" fill="#ffb8d9" stroke="#ff8cc8" stroke-width="2"/>
        <circle cx="16" cy="18" r="2" fill="#4a3728"/>
        <circle cx="28" cy="18" r="2" fill="#4a3728"/>
        <text x="22" y="30" text-anchor="middle" font-size="10" fill="#ff6ba8">✿</text>
      </svg>
      <svg class="f4" viewBox="0 0 40 40">
        <text x="20" y="28" text-anchor="middle" font-size="24">💕</text>
      </svg>
    </div>

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
      <a href="index.html" class="back-link">← back to home</a>
      <h1 class="page-heading">🎀 Choose Your Photo Style</h1>
      <p class="page-sub">Pick a style to start your kawaii photobooth session ♡</p>

      <div class="style-grid">

        <!-- Polaroid → boothpolaroid.html -->
        <a class="style-card">
          <div class="card-visual">
            <div class="visual-polaroid">
              <div class="p-img">🌸</div>
              <div class="p-label">my cute selfie ♡</div>
            </div>
            <span class="card-badge">1 SHOT</span>
          </div>
          <div class="card-title">Polaroid Frame</div>
          <p class="card-desc">One perfect snapshot styled inside a beautiful polaroid with 50+ kawaii frame designs.</p>
          <span class="card-tag">✨ Single Shot</span>
        </a>

        <!-- Photostrip → boothstrip.html -->
        <a class="style-card">
          <div class="card-visual">
            <div class="visual-strip">
              <div class="s-cell" style="background:linear-gradient(135deg,#ffe8f4,#f0d4ff)">🌷</div>
              <div class="s-cell" style="background:linear-gradient(135deg,#d4f0ff,#e8f4ff)">🦋</div>
              <div class="s-cell" style="background:linear-gradient(135deg,#fff4d4,#ffe8b4)">🌻</div>
              <div class="s-cell" style="background:linear-gradient(135deg,#e8ffd4,#d4f0e8)">🍀</div>
            </div>
            <span class="card-badge">4 SHOTS</span>
          </div>
          <div class="card-title">4 Vertical Photostrip</div>
          <p class="card-desc">Four back-to-back poses combined into one retro-style vertical strip with 50+ frame designs.</p>
          <span class="card-tag">🎞️ Photo Strip</span>
        </a>

      </div>
    </main>

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
