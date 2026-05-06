import { useState, useEffect, useRef } from "react";

type PageId = "home" | "about" | "contact" | "privacy" | "choosestyle" | "photobooth";

const HOME_CSS  = `:root {
  --pink: #ff85a1;
  --pink-light: #ffb3c6;
  --pink-dark: #e05c7a;
  --pink-pale: #ffe0eb;
  --lavender: #d4b8e0;
  --sky: #ffd6e7;
  --cream: #fff5f8;
  --brown: #5c3d2e;
  --green: #a8d5a2;
  --green-dark: #7ab870;
  --yellow: #ffe083;
  --purple-soft: #c4a8e0;
  --white: #ffffff;
  --text-dark: #3d1f2e;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Nunito', sans-serif;
  background: var(--cream);
  color: var(--text-dark);
  overflow-x: hidden;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='6' fill='%23ff85a1' opacity='0.8'/%3E%3C/svg%3E"), auto;
}

/* ── NAV ── */
nav {
  position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border-radius: 60px;
  padding: 14px 36px;
  display: flex; align-items: center; gap: 40px;
  box-shadow: 0 4px 30px rgba(255,133,161,0.25);
  z-index: 999;
  border: 2px solid rgba(255,180,200,0.4);
  white-space: nowrap;
}
.nav-logo {
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 1.05rem;
  line-height: 1.2;
  text-decoration: none;
}
.nav-logo span:first-child { color: var(--brown); display: block; font-size: 0.78rem; font-weight: 700; }
.nav-logo span:last-child { color: var(--pink); font-size: 1.2rem; }
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a {
  text-decoration: none; font-weight: 700; font-size: 0.88rem;
  color: var(--text-dark); transition: color 0.2s;
}
.nav-links a:hover, .nav-links a.active { color: var(--pink); }
.nav-links a.active { border-bottom: 2px solid var(--pink); padding-bottom: 2px; }
.nav-bow { font-size: 1.4rem; animation: bow-wiggle 2s ease-in-out infinite; }
@keyframes bow-wiggle { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }

/* ── HERO ── */
#hero {
  position: relative;
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  overflow: hidden;
  padding-top: 100px;
}

.sky-bg {
  position: absolute; inset: 0;
  background: linear-gradient(170deg,
    #ffc8de 0%, #ffaecf 20%, #ffd1e8 40%,
    #f5c8e8 60%, #e8d0f5 80%, #d4c8f0 100%);
  z-index: 0;
}

.cloud {
  position: absolute;
  background: rgba(255,255,255,0.9);
  border-radius: 50px;
  filter: blur(2px);
  animation: cloud-float linear infinite;
}
.cloud::before,.cloud::after {
  content:''; position:absolute;
  background: rgba(255,255,255,0.9); border-radius: 50%;
}
.cloud-1 { width:120px;height:40px;top:8%;left:-140px;animation-duration:28s; }
.cloud-1::before { width:60px;height:60px;top:-30px;left:20px; }
.cloud-1::after { width:40px;height:40px;top:-20px;left:55px; }
.cloud-2 { width:90px;height:30px;top:15%;left:-110px;animation-duration:36s;animation-delay:-12s; }
.cloud-2::before { width:45px;height:45px;top:-22px;left:15px; }
.cloud-3 { width:150px;height:50px;top:6%;left:-180px;animation-duration:44s;animation-delay:-22s;opacity:0.7; }
.cloud-3::before { width:70px;height:70px;top:-35px;left:25px; }
.cloud-4 { width:80px;height:28px;top:22%;left:-100px;animation-duration:32s;animation-delay:-8s; }
@keyframes cloud-float { from{left:-200px} to{left:110vw} }

.mountains { position:absolute;bottom:18%;left:0;right:0;z-index:1;pointer-events:none; }
.mountains svg { width:100%;height:280px;display:block; }

.waterfall-scene { position:absolute;bottom:16%;right:4%;width:130px;z-index:2; }
.waterfall-flow {
  width:22px;height:90px;
  background:linear-gradient(180deg,rgba(255,255,255,0.95) 0%,rgba(180,220,255,0.8) 60%,rgba(160,200,255,0.6) 100%);
  border-radius:10px;margin:0 auto;
  animation:wf-shimmer 1.5s ease-in-out infinite alternate;
  box-shadow:0 0 12px rgba(180,220,255,0.7);position:relative;
}
.waterfall-flow::after {
  content:'';position:absolute;bottom:-14px;left:-18px;
  width:58px;height:20px;
  background:radial-gradient(ellipse,rgba(180,220,255,0.7) 60%,transparent 100%);
  border-radius:50%;animation:wf-splash 1.2s ease-in-out infinite alternate;
}
@keyframes wf-shimmer { from{opacity:0.85} to{opacity:1} }
@keyframes wf-splash { from{transform:scaleX(0.9)} to{transform:scaleX(1.1)} }

.ocean { position:absolute;bottom:0;left:0;right:0;height:19%;z-index:3;overflow:hidden; }
.wave { position:absolute;width:200%;height:100%;border-radius:40% 60% 60% 40% / 40% 40% 60% 60%; }
.wave-1 { bottom:-10px;background:linear-gradient(180deg,rgba(255,182,217,0.6) 0%,rgba(255,150,200,0.75) 100%);animation:wave-roll 7s linear infinite;left:-50%; }
.wave-2 { bottom:-18px;background:linear-gradient(180deg,rgba(255,200,230,0.5) 0%,rgba(255,130,185,0.65) 100%);animation:wave-roll 10s linear infinite reverse;animation-delay:-3s;left:-50%; }
.wave-3 { bottom:-6px;background:linear-gradient(180deg,rgba(255,255,255,0.35) 0%,rgba(255,170,210,0.5) 100%);animation:wave-roll 14s linear infinite;animation-delay:-6s;left:-50%; }
@keyframes wave-roll { from{transform:translateX(0) rotate(0deg)} to{transform:translateX(50%) rotate(2deg)} }

.grass-strip { position:absolute;bottom:17.5%;left:0;right:0;height:60px;z-index:4;pointer-events:none; }
.blade { position:absolute;bottom:0;width:10px;border-radius:50% 50% 0 0;transform-origin:bottom center;animation:grass-sway 2.5s ease-in-out infinite alternate; }
@keyframes grass-sway { from{transform:rotate(-8deg)} to{transform:rotate(8deg)} }

.sprinkles-layer { position:absolute;inset:0;z-index:5;pointer-events:none; }
.sprinkle { position:absolute;border-radius:50px;animation:sprinkle-float linear infinite;opacity:0.85; }
@keyframes sprinkle-float {
  0%   { transform:translateY(0) rotate(0deg);opacity:0.85; }
  50%  { opacity:1; }
  100% { transform:translateY(-80px) rotate(360deg);opacity:0; }
}

.butterfly { position:absolute;z-index:6;animation:butterfly-drift linear infinite;pointer-events:none; }
.butterfly svg { animation:butterfly-flap 0.6s ease-in-out infinite alternate;transform-origin:center; }
@keyframes butterfly-flap { from{transform:scaleX(1)} to{transform:scaleX(0.4)} }
@keyframes butterfly-drift {
  0%   { transform:translate(0,0) rotate(0deg); }
  25%  { transform:translate(40px,-30px) rotate(5deg); }
  50%  { transform:translate(80px,10px) rotate(-5deg); }
  75%  { transform:translate(40px,40px) rotate(3deg); }
  100% { transform:translate(0,0) rotate(0deg); }
}

.kawaii-float {
  position:absolute;z-index:6;font-size:2.4rem;
  animation:kawaii-bob 3s ease-in-out infinite alternate;
  filter:drop-shadow(0 4px 8px rgba(255,133,161,0.3));user-select:none;
}
@keyframes kawaii-bob { from{transform:translateY(0) rotate(-5deg)} to{transform:translateY(-18px) rotate(5deg)} }

.hero-content {
  position:relative;z-index:7;text-align:center;
  display:flex;flex-direction:column;align-items:center;gap:18px;margin-top:-40px;
}
.hero-title { line-height:1; }
.hero-title .photobooth-word {
  display:block;font-family:'Nunito',sans-serif;font-weight:900;
  font-size:clamp(2.8rem,7vw,5.5rem);color:var(--brown);
  letter-spacing:-1px;text-shadow:3px 3px 0 rgba(255,255,255,0.6);
}
.hero-title .kawaii-word {
  display:block;font-family:'Pacifico',cursive;font-size:clamp(4rem,10vw,8rem);
  background:linear-gradient(135deg,#ff85a1 0%,#ff4d7d 40%,#ff85a1 70%,#ffb3c6 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  filter:drop-shadow(2px 4px 0px rgba(255,77,125,0.3));
  animation:kawaii-pulse 3s ease-in-out infinite;
}
@keyframes kawaii-pulse { 0%,100%{filter:drop-shadow(2px 4px 0px rgba(255,77,125,0.3))} 50%{filter:drop-shadow(2px 4px 16px rgba(255,77,125,0.6))} }

.title-badge { background:white;border:2.5px solid var(--pink-light);border-radius:30px;padding:6px 28px;display:inline-block; }
.title-badge p { font-size:1.05rem;font-weight:700;color:var(--pink);letter-spacing:1px; }
.title-badge p::before,.title-badge p::after { content:' ♡ '; }

.camera-btn {
  width:120px;height:120px;border-radius:50%;
  background:linear-gradient(135deg,#ff85a1 0%,#ff4d7d 60%,#e03060 100%);
  border:none;display:flex;align-items:center;justify-content:center;
  cursor:pointer;text-decoration:none;
  box-shadow:0 8px 32px rgba(255,77,125,0.45),inset 0 2px 6px rgba(255,255,255,0.3);
  transition:transform 0.2s,box-shadow 0.2s;position:relative;
  animation:btn-pulse 2.5s ease-in-out infinite;
}
.camera-btn:hover { transform:scale(1.1);box-shadow:0 12px 40px rgba(255,77,125,0.6); }
.camera-btn::after {
  content:'';position:absolute;inset:-8px;border-radius:50%;
  border:2px dashed rgba(255,133,161,0.6);animation:btn-spin 8s linear infinite;
}
@keyframes btn-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes btn-pulse { 0%,100%{box-shadow:0 8px 32px rgba(255,77,125,0.45)} 50%{box-shadow:0 8px 48px rgba(255,77,125,0.7)} }
.camera-icon { font-size:2.8rem; }

.start-label { font-size:0.95rem;font-weight:800;color:var(--pink-dark);letter-spacing:2px; }
.start-label::before,.start-label::after { content:' ✦ '; }

/* ── POSES SECTION ── */
#poses {
  position:relative;padding:100px 40px 80px;
  background:linear-gradient(180deg,#fff5f8 0%,#ffe8f2 50%,#fff0f5 100%);z-index:10;
}
#poses::before {
  content:'';position:absolute;top:-40px;left:0;right:0;height:80px;
  background:linear-gradient(180deg,transparent,#fff5f8);z-index:1;
}

.section-header { text-align:center;margin-bottom:60px;position:relative;z-index:2; }
.section-tag {
  display:inline-block;background:var(--pink);color:white;
  font-weight:800;font-size:0.75rem;letter-spacing:3px;text-transform:uppercase;
  padding:6px 18px;border-radius:20px;margin-bottom:14px;
}
.section-title { font-family:'Nunito',sans-serif;font-weight:900;font-size:clamp(2rem,5vw,3.2rem);color:var(--brown);line-height:1.2;margin-bottom:12px; }
.section-title span { color:var(--pink); }
.section-sub { font-size:1.05rem;color:#9b6b7a;font-weight:600;max-width:560px;margin:0 auto; }

.poses-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px;max-width:1200px;margin:0 auto;position:relative;z-index:2; }
.pose-card {
  background:white;border-radius:28px;padding:36px 28px 30px;
  border:2px solid rgba(255,180,200,0.3);box-shadow:0 6px 30px rgba(255,133,161,0.12);
  transition:transform 0.3s,box-shadow 0.3s;position:relative;overflow:hidden;
}
.pose-card::before { content:'';position:absolute;top:0;left:0;right:0;height:5px;border-radius:28px 28px 0 0; }
.pose-card:nth-child(1)::before { background:linear-gradient(90deg,#ff85a1,#ffb3c6); }
.pose-card:nth-child(2)::before { background:linear-gradient(90deg,#c4a8e0,#d4b8e0); }
.pose-card:nth-child(3)::before { background:linear-gradient(90deg,#ffe083,#ffc080); }
.pose-card:nth-child(4)::before { background:linear-gradient(90deg,#a8d5a2,#7ab870); }
.pose-card:hover { transform:translateY(-8px);box-shadow:0 18px 50px rgba(255,133,161,0.22); }
.pose-emoji { font-size:3rem;margin-bottom:14px;display:block; }
.pose-name { font-weight:900;font-size:1.2rem;color:var(--brown);margin-bottom:10px; }
.pose-desc { font-size:0.93rem;color:#8a6070;line-height:1.65;font-weight:600; }

.why-strip {
  background:linear-gradient(135deg,#ff85a1 0%,#ff4d7d 50%,#d4349a 100%);
  border-radius:30px;padding:60px 48px;max-width:1100px;margin:70px auto 0;
  display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;
  box-shadow:0 20px 60px rgba(255,77,125,0.35);position:relative;z-index:2;overflow:hidden;
}
.why-strip::before {
  content:'♡ ✦ ♡ ✦ ♡ ✦ ♡ ✦ ♡ ✦ ♡';position:absolute;top:14px;right:24px;
  font-size:0.75rem;color:rgba(255,255,255,0.3);letter-spacing:3px;
}
.why-text h2 { font-weight:900;font-size:clamp(1.8rem,4vw,2.8rem);color:white;line-height:1.2;margin-bottom:16px; }
.why-text p { color:rgba(255,255,255,0.88);font-size:1rem;line-height:1.7;font-weight:600; }
.why-features { display:flex;flex-direction:column;gap:18px; }
.why-feat {
  background:rgba(255,255,255,0.15);border-radius:16px;padding:16px 20px;
  display:flex;align-items:flex-start;gap:14px;
  backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,0.2);
}
.why-feat-icon { font-size:1.6rem;flex-shrink:0; }
.why-feat-text strong { display:block;color:white;font-weight:800;font-size:0.95rem;margin-bottom:3px; }
.why-feat-text span { color:rgba(255,255,255,0.8);font-size:0.87rem;font-weight:600; }

/* ── FOOTER ── */
footer {
  background:white;border-top:2px solid rgba(255,180,200,0.3);
  padding:40px 48px 30px;display:flex;flex-wrap:wrap;
  justify-content:space-between;align-items:center;gap:24px;
}
.footer-logo { font-weight:900; }
.footer-logo span:first-child { color:var(--brown);font-size:0.9rem;display:block; }
.footer-logo .big { color:var(--pink);font-size:1.3rem;font-family:'Pacifico',cursive; }
.footer-logo small { color:#b08090;font-size:0.82rem;font-weight:600;display:block;margin-top:2px; }
.footer-socials { display:flex;gap:14px; }
.soc-btn {
  width:44px;height:44px;border-radius:50%;
  background:linear-gradient(135deg,var(--pink-pale),var(--pink-light));
  border:2px solid rgba(255,133,161,0.4);display:flex;align-items:center;justify-content:center;
  text-decoration:none;font-size:1.1rem;
  transition:transform 0.2s,box-shadow 0.2s;color:var(--pink-dark);
}
.soc-btn:hover { transform:scale(1.15);box-shadow:0 4px 16px rgba(255,133,161,0.4); }
.footer-copy { color:#b08090;font-size:0.82rem;font-weight:600; }

.sparkle { position:absolute;z-index:6;pointer-events:none;animation:sparkle-twinkle 2s ease-in-out infinite; }
@keyframes sparkle-twinkle { 0%,100%{opacity:0;transform:scale(0.5)} 50%{opacity:1;transform:scale(1)} }`;
const HOME_HTML = `<!-- NAV -->
<nav>
  <a href="/" class="nav-logo"><span>photobooth</span><span>kawaii</span></a>
  <ul class="nav-links">
    <li><a href="/" class="active">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/photobooth">Photobooth</a></li>
    <li><a href="/contact">Contact</a></li>
    <li><a href="/privacy">Privacy Policy</a></li>
  </ul>
  <span class="nav-bow">🎀</span>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="sky-bg"></div>
  <div class="cloud cloud-1"></div>
  <div class="cloud cloud-2"></div>
  <div class="cloud cloud-3"></div>
  <div class="cloud cloud-4"></div>

  <div class="mountains">
    <svg viewBox="0 0 1440 280" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,280 0,160 180,60 360,140 540,40 720,120 900,30 1080,110 1260,50 1440,130 1440,280" fill="rgba(200,160,210,0.55)"/>
      <polygon points="0,280 0,200 100,130 280,80 460,160 640,90 820,170 1000,80 1200,150 1440,100 1440,280" fill="rgba(210,170,220,0.65)"/>
      <polygon points="0,280 0,240 120,170 320,110 520,200 700,130 880,210 1060,140 1280,200 1440,160 1440,280" fill="rgba(220,175,215,0.8)"/>
      <polygon points="180,60 155,90 205,90" fill="rgba(255,255,255,0.8)"/>
      <polygon points="540,40 515,75 565,75" fill="rgba(255,255,255,0.8)"/>
      <polygon points="900,30 875,65 925,65" fill="rgba(255,255,255,0.8)"/>
      <polygon points="1260,50 1235,80 1285,80" fill="rgba(255,255,255,0.8)"/>
    </svg>
  </div>

  <div class="waterfall-scene" style="bottom:19%;right:8%">
    <div class="waterfall-flow"></div>
  </div>

  <div class="ocean">
    <div class="wave wave-1"></div>
    <div class="wave wave-2"></div>
    <div class="wave wave-3"></div>
  </div>

  <div class="grass-strip" id="grass"></div>
  <div class="sprinkles-layer" id="sprinkles"></div>
  <div id="butterflies"></div>

  <div class="kawaii-float" style="top:22%;left:6%;animation-delay:0s">☁️</div>
  <div class="kawaii-float" style="top:55%;left:3%;animation-delay:0.8s;font-size:2rem">🌸</div>
  <div class="kawaii-float" style="top:30%;left:12%;animation-delay:1.5s;font-size:1.6rem">🍓</div>
  <div class="kawaii-float" style="top:20%;right:7%;animation-delay:0.4s">⭐</div>
  <div class="kawaii-float" style="top:45%;right:4%;animation-delay:1.2s;font-size:2rem">🐻</div>
  <div class="kawaii-float" style="top:65%;right:9%;animation-delay:0.6s;font-size:1.8rem">💕</div>
  <div class="kawaii-float" style="top:70%;left:8%;animation-delay:2s;font-size:1.6rem">💜</div>
  <div class="kawaii-float" style="top:15%;left:42%;animation-delay:0.3s;font-size:1.4rem">✨</div>

  <div class="sparkle" style="top:28%;left:25%;animation-delay:0s">✦</div>
  <div class="sparkle" style="top:40%;right:22%;animation-delay:0.7s">✦</div>
  <div class="sparkle" style="top:60%;left:32%;animation-delay:1.4s">✦</div>
  <div class="sparkle" style="top:18%;right:35%;animation-delay:0.3s;font-size:0.8rem">✦</div>

  <div class="hero-content">
    <div class="hero-title">
      <span class="photobooth-word">photobooth</span>
      <span class="kawaii-word">kawaii</span>
    </div>
    <div class="title-badge"><p>cute moments, forever</p></div>
    <a href="/choosestyle" class="camera-btn" aria-label="Start photobooth session">
      <span class="camera-icon">📷</span>
    </a>
    <p class="start-label">click to start!</p>
  </div>
</section>

<!-- POSES SECTION -->
<section id="poses">
  <div class="section-header">
    <div class="section-tag">✨ Pose Guide</div>
    <h2 class="section-title">Strike Your Best <span>Kawaii Pose!</span></h2>
    <p class="section-sub">Not sure how to pose? We've got you covered with our cutest, most flattering ideas!</p>
  </div>

  <div class="poses-grid">
    <div class="pose-card">
      <span class="pose-emoji">🤞✨</span>
      <h3 class="pose-name">The Lucky Cross</h3>
      <p class="pose-desc">Cross your fingers and wink at the camera! It's cute, playful, and gives off main character energy. Perfect for your solo glow-up shot — ideal when you want to look effortlessly confident and fun!</p>
    </div>
    <div class="pose-card">
      <span class="pose-emoji">😄🙌</span>
      <h3 class="pose-name">The Big Cheer</h3>
      <p class="pose-desc">Throw your hands up, flash a huge grin and lean into the frame! This high-energy pose is contagious joy in photo form. Group shots come ALIVE with this one — it shows your happiest, most genuine self!</p>
    </div>
    <div class="pose-card">
      <span class="pose-emoji">🦋🌀</span>
      <h3 class="pose-name">Spin & Snap</h3>
      <p class="pose-desc">Mid-twirl is pure magic! Spin just before the shutter clicks and let your hair or outfit swirl. The motion adds life and dimension to your photo — you'll look like you just stepped out of a music video!</p>
    </div>
    <div class="pose-card">
      <span class="pose-emoji">🎀👯</span>
      <h3 class="pose-name">BFF Stack</h3>
      <p class="pose-desc">Stand close, lean into each other, and match your expressions! Squish together, make funny faces or strike matching poses. The best friendship memories are the silly ones — these shots become forever treasures!</p>
    </div>
  </div>

  <div class="why-strip">
    <div class="why-text">
      <h2>Why Photobooth<br>Kawaii? 🎀</h2>
      <p>We aren't just a photobooth — we're a memory-making experience wrapped in the cutest, most magical aesthetic you've ever seen. Every click creates a keepsake you'll cherish forever. Here's why you'll fall in love with us!</p>
    </div>
    <div class="why-features">
      <div class="why-feat">
        <span class="why-feat-icon">🖼️</span>
        <div class="why-feat-text">
          <strong>100+ Kawaii Frames</strong>
          <span>From cherry blossoms to sparkly borders — there's a perfect frame for every mood and moment.</span>
        </div>
      </div>
      <div class="why-feat">
        <span class="why-feat-icon">⚡</span>
        <div class="why-feat-text">
          <strong>Instant Downloads</strong>
          <span>Your photos are ready the second you click — no waiting, no apps, no fuss. Just pure kawaii magic!</span>
        </div>
      </div>
      <div class="why-feat">
        <span class="why-feat-icon">🌈</span>
        <div class="why-feat-text">
          <strong>Dreamy Filters & FX</strong>
          <span>AI-powered filters that make every complexion glow and every background pop with pastel perfection.</span>
        </div>
      </div>
      <div class="why-feat">
        <span class="why-feat-icon">💌</span>
        <div class="why-feat-text">
          <strong>Share in One Tap</strong>
          <span>Send your strips directly to Instagram, TikTok, or as a cute digital sticker to your besties!</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">
    <span>photobooth</span>
    <span class="big">kawaii</span>
    <small>♡ cute moments, forever ♡</small>
  </div>
  <div class="footer-socials">
    <a href="https://facebook.com/photoboothkawaii.online" target="_blank" class="soc-btn" title="Facebook">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    </a>
    <a href="https://x.com/photoboothkawaii.online" target="_blank" class="soc-btn" title="X (Twitter)">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>
    <a href="https://instagram.com/photoboothkawaii.online" target="_blank" class="soc-btn" title="Instagram">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    </a>
    <a href="https://youtube.com/@photoboothkawaii.online" target="_blank" class="soc-btn" title="YouTube">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
    </a>
  </div>
  <p class="footer-copy">© 2026 Photobooth Kawaii. All rights reserved. ♡</p>
</footer>

<script>
// Generate grass blades
const grass = document.getElementById('grass');
for (let i = 0; i < 80; i++) {
  const blade = document.createElement('div');
  blade.className = 'blade';
  const h = 20 + Math.random() * 35;
  const greens = ['#a8d5a2','#7ab870','#c8e6c2','#90c080','#b5d9ae'];
  blade.style.cssText = \`
    left:\${(i/80)*100}%;
    height:\${h}px;
    background:\${greens[Math.floor(Math.random()*greens.length)]};
    transform:rotate(\${(Math.random()-0.5)*20}deg);
    animation-delay:\${Math.random()*2}s;
    animation-duration:\${1.8+Math.random()*1.5}s;
    opacity:\${0.7+Math.random()*0.3};
  \`;
  grass.appendChild(blade);
}

// Generate sprinkles
const sprinklesLayer = document.getElementById('sprinkles');
const colors = ['#ff85a1','#ffb3c6','#c4a8e0','#ffe083','#a8d5a2','#ffc0cb','#d4b8e0','#ff7eb3'];
for (let i = 0; i < 45; i++) {
  const s = document.createElement('div');
  s.className = 'sprinkle';
  const w = 6 + Math.random() * 8;
  const h = 2 + Math.random() * 3;
  s.style.cssText = \`
    left:\${Math.random()*95}%;
    top:\${20+Math.random()*60}%;
    width:\${w}px; height:\${h}px;
    background:\${colors[Math.floor(Math.random()*colors.length)]};
    transform:rotate(\${Math.random()*180}deg);
    animation-duration:\${3+Math.random()*5}s;
    animation-delay:\${Math.random()*4}s;
  \`;
  sprinklesLayer.appendChild(s);
}

// Generate butterflies
const bfContainer = document.getElementById('butterflies');
const bfColors = [['#ffb3c6','#ff85a1'],['#c4a8e0','#9b7fce'],['#ffe083','#ffc040'],['#a8d5a2','#7ab870']];
for (let i = 0; i < 7; i++) {
  const bf = document.createElement('div');
  bf.className = 'butterfly';
  const c = bfColors[i % bfColors.length];
  bf.style.cssText = \`
    left:\${5+Math.random()*80}%;
    top:\${10+Math.random()*60}%;
    animation-duration:\${6+Math.random()*8}s;
    animation-delay:\${Math.random()*5}s;
  \`;
  bf.innerHTML = \`<svg width="32" height="22" viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="9" rx="8" ry="7" fill="\${c[0]}" opacity="0.85"/>
    <ellipse cx="24" cy="9" rx="8" ry="7" fill="\${c[0]}" opacity="0.85"/>
    <ellipse cx="9" cy="15" rx="6" ry="5" fill="\${c[1]}" opacity="0.7"/>
    <ellipse cx="23" cy="15" rx="6" ry="5" fill="\${c[1]}" opacity="0.7"/>
    <line x1="16" y1="2" x2="16" y2="20" stroke="#5c3d2e" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M14 2 Q12 0 11 1" stroke="#5c3d2e" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M18 2 Q20 0 21 1" stroke="#5c3d2e" stroke-width="1" fill="none" stroke-linecap="round"/>
  </svg>\`;
  bfContainer.appendChild(bf);
}
</script>`;
const HOME_JS   = `// Generate grass blades
const grass = document.getElementById('grass');
for (let i = 0; i < 80; i++) {
  const blade = document.createElement('div');
  blade.className = 'blade';
  const h = 20 + Math.random() * 35;
  const greens = ['#a8d5a2','#7ab870','#c8e6c2','#90c080','#b5d9ae'];
  blade.style.cssText = \`
    left:\${(i/80)*100}%;
    height:\${h}px;
    background:\${greens[Math.floor(Math.random()*greens.length)]};
    transform:rotate(\${(Math.random()-0.5)*20}deg);
    animation-delay:\${Math.random()*2}s;
    animation-duration:\${1.8+Math.random()*1.5}s;
    opacity:\${0.7+Math.random()*0.3};
  \`;
  grass.appendChild(blade);
}

// Generate sprinkles
const sprinklesLayer = document.getElementById('sprinkles');
const colors = ['#ff85a1','#ffb3c6','#c4a8e0','#ffe083','#a8d5a2','#ffc0cb','#d4b8e0','#ff7eb3'];
for (let i = 0; i < 45; i++) {
  const s = document.createElement('div');
  s.className = 'sprinkle';
  const w = 6 + Math.random() * 8;
  const h = 2 + Math.random() * 3;
  s.style.cssText = \`
    left:\${Math.random()*95}%;
    top:\${20+Math.random()*60}%;
    width:\${w}px; height:\${h}px;
    background:\${colors[Math.floor(Math.random()*colors.length)]};
    transform:rotate(\${Math.random()*180}deg);
    animation-duration:\${3+Math.random()*5}s;
    animation-delay:\${Math.random()*4}s;
  \`;
  sprinklesLayer.appendChild(s);
}

// Generate butterflies
const bfContainer = document.getElementById('butterflies');
const bfColors = [['#ffb3c6','#ff85a1'],['#c4a8e0','#9b7fce'],['#ffe083','#ffc040'],['#a8d5a2','#7ab870']];
for (let i = 0; i < 7; i++) {
  const bf = document.createElement('div');
  bf.className = 'butterfly';
  const c = bfColors[i % bfColors.length];
  bf.style.cssText = \`
    left:\${5+Math.random()*80}%;
    top:\${10+Math.random()*60}%;
    animation-duration:\${6+Math.random()*8}s;
    animation-delay:\${Math.random()*5}s;
  \`;
  bf.innerHTML = \`<svg width="32" height="22" viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="9" rx="8" ry="7" fill="\${c[0]}" opacity="0.85"/>
    <ellipse cx="24" cy="9" rx="8" ry="7" fill="\${c[0]}" opacity="0.85"/>
    <ellipse cx="9" cy="15" rx="6" ry="5" fill="\${c[1]}" opacity="0.7"/>
    <ellipse cx="23" cy="15" rx="6" ry="5" fill="\${c[1]}" opacity="0.7"/>
    <line x1="16" y1="2" x2="16" y2="20" stroke="#5c3d2e" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M14 2 Q12 0 11 1" stroke="#5c3d2e" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M18 2 Q20 0 21 1" stroke="#5c3d2e" stroke-width="1" fill="none" stroke-linecap="round"/>
  </svg>\`;
  bfContainer.appendChild(bf);
}`;

const ABOUT_CSS  = `@font-face {
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
      }`;
const ABOUT_HTML = `<!-- Fixed side strawberries -->
    <span class="side-strawberry left">🍓</span>
    <span class="side-strawberry right">🍓</span>

    <!-- ===== HEADER ===== -->
    <header class="site-header">
      <span class="cloud-puff cloud-puff-1" aria-hidden="true"></span>
      <span class="cloud-puff cloud-puff-2" aria-hidden="true"></span>
      <span class="cloud-puff cloud-puff-3" aria-hidden="true"></span>
      <a href="/" class="logo">
        <span class="logo-top"><span class="bow">🎀</span> photobooth <span class="bow">🎀</span></span>
        <span class="logo-bottom">kawaii</span>
      </a>
      <nav class="site-nav" id="siteNav" aria-label="Main">
        <ul class="nav-main">
          <li><a href="/">Home</a></li>
          <li><a href="/about" aria-current="page">About</a></li>
          <li><a href="/photobooth">Photobooth</a></li>
          
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
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
            <a href="/photobooth" class="cta-btn cta-btn-primary">📸 Open the Booth</a>
            <a href="/choosestyle"     class="cta-btn cta-btn-secondary">🎀 Browse Frames</a>
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
    </script>`;
const ABOUT_JS   = `// Hamburger menu toggle
      (function () {
        const btn = document.getElementById('hamburger');
        const nav = document.getElementById('siteNav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function () {
          const open = nav.classList.toggle('open');
          btn.classList.toggle('open', open);
          btn.setAttribute('aria-expanded', open);
        });
      })();`;

const CONTACT_CSS  = `@font-face {
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
        --font-body:    'Perfect Lemonade', 'Nunito', sans-serif;
        --pink:       #ff9ec8;
        --pink-deep:  #ff6ba8;
        --red:        #e8304a;
        --red-deep:   #c0203a;
        --jam:        #c8183a;
        --jam-light:  #f25070;
        --cream:      #fff5f0;
        --white:      #fffefd;
        --brown:      #4a3728;
        --gray:       #6b5a52;
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
      .cloud-puff-1 { width: 80px;  height: 40px; top: -10px; left: 10%;  border-radius: 50px; }
      .cloud-puff-2 { width: 60px;  height: 30px; top:  -8px; left: 30%;  border-radius: 50px; }
      .cloud-puff-3 { width: 100px; height: 45px; top: -12px; right: 15%; border-radius: 50px; }

      .logo {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
          left: 0; right: 0;
          background: linear-gradient(135deg, #ffb8d4, #ffd4e8);
          padding: 1rem;
          box-shadow: 0 8px 20px rgba(200,80,120,.2);
        }
        .site-nav.open { display: block; }
        .nav-main { flex-direction: column; gap: .3rem; }
        .nav-main a { display: block; text-align: center; }
      }

      /* ===== JAM SPREAD DECORATIONS ===== */
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
      .jam-blob-1 { top: -40px;  left: -60px;  width: 420px; }
      .jam-blob-2 { top: 30%;    right: -80px; width: 380px; }
      .jam-blob-3 { bottom: 5%;  left: -50px;  width: 340px; }

      .jam-seed {
        position: absolute;
        width: 6px; height: 10px;
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
        0%, 100% { transform: translateY(0) rotate(var(--r0,-6deg)); }
        50%       { transform: translateY(-18px) rotate(var(--r1,6deg)); }
      }

      .jam-spread-top, .jam-spread-bottom {
        width: 100%; overflow: hidden; line-height: 0;
        pointer-events: none; position: relative; z-index: 1;
      }
      .jam-spread-top  { margin-bottom: -4px; }
      .jam-spread-bottom { margin-top: -4px; }

      /* ===== PAGE HERO ===== */
      .page-hero {
        position: relative; z-index: 2;
        text-align: center; margin-bottom: 3rem;
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
        font-size: 2rem; margin-bottom: .75rem;
        display: flex; justify-content: center; gap: .6rem;
        animation: heroRow 3s ease-in-out infinite;
      }
      @keyframes heroRow {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-6px); }
      }

      /* ===== CONTENT WRAPPER ===== */
      .contact-content {
        max-width: 820px;
        margin: 0 auto;
        position: relative; z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 2.2rem;
      }

      /* ===== JAM CARD ===== */
      .jam-card {
        background: rgba(255,252,250,.88);
        border-radius: 28px;
        padding: 2.2rem 2.4rem;
        box-shadow:
          0 6px 32px rgba(200,50,80,.12),
          0 2px 0 rgba(255,255,255,.9) inset,
          0 -2px 0 rgba(200,80,100,.08) inset;
        border: 2px solid rgba(255,160,180,.3);
        position: relative;
        overflow: hidden;
        transition: transform .25s, box-shadow .25s;
      }
      .jam-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 42px rgba(200,50,80,.18), 0 2px 0 rgba(255,255,255,.9) inset;
      }
      .jam-card::before {
        content: '';
        position: absolute; top: -20px; right: -20px;
        width: 100px; height: 100px;
        background: radial-gradient(circle at 30% 30%, rgba(220,30,60,.18), transparent 70%);
        border-radius: 50%; pointer-events: none;
      }
      .jam-card::after {
        content: '';
        position: absolute; bottom: -15px; left: -15px;
        width: 80px; height: 80px;
        background: radial-gradient(circle at 60% 60%, rgba(220,30,60,.13), transparent 70%);
        border-radius: 50%; pointer-events: none;
      }

      .card-heading {
        font-family: var(--font-display);
        font-size: clamp(1.4rem, 3.5vw, 1.9rem);
        color: #c0183a;
        letter-spacing: .03em;
        margin-bottom: 1rem;
        display: flex; align-items: center; gap: .5rem;
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

      /* ===== INTRO CARD ===== */
      .intro-card {
        background: linear-gradient(135deg, rgba(255,80,100,.08) 0%, rgba(255,200,220,.18) 50%, rgba(255,80,100,.06) 100%);
        border: 2.5px solid rgba(220,50,80,.2);
        border-radius: 28px;
        padding: 2.4rem 2.6rem;
        text-align: center;
        position: relative; z-index: 2;
        overflow: hidden;
      }
      .intro-card::before {
        content: '';
        position: absolute; inset: 0;
        background: rgba(255,252,250,.6);
        border-radius: 26px; z-index: -1;
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

      /* ===== EMAIL LINK ===== */
      .email-link {
        display: inline-flex;
        align-items: center;
        gap: .5rem;
        margin-top: 1.4rem;
        font-family: var(--font-body);
        font-weight: 700;
        font-size: 1.05rem;
        color: #c0183a;
        text-decoration: none;
        background: rgba(255,255,255,.7);
        border: 2px solid rgba(200,50,80,.2);
        border-radius: 999px;
        padding: .55rem 1.5rem;
        transition: background .2s, transform .2s, box-shadow .2s;
        box-shadow: 0 3px 14px rgba(200,30,60,.12);
      }
      .email-link:hover {
        background: rgba(255,255,255,.95);
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 6px 22px rgba(200,30,60,.2);
      }

      /* ===== SOCIAL ICONS ===== */
      .social-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.2rem;
        margin-top: 1.6rem;
      }
      .social-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .45rem;
        text-decoration: none;
        transition: transform .2s;
      }
      .social-btn:hover { transform: translateY(-4px) scale(1.08); }
      .social-icon {
        width: 58px; height: 58px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.55rem;
        box-shadow: 0 4px 18px rgba(0,0,0,.12), 0 2px 0 rgba(255,255,255,.4) inset;
        transition: box-shadow .2s;
      }
      .social-btn:hover .social-icon {
        box-shadow: 0 8px 28px rgba(0,0,0,.18), 0 2px 0 rgba(255,255,255,.4) inset;
      }
      .social-label {
        font-family: var(--font-body);
        font-size: .8rem;
        font-weight: 700;
        color: #7a3050;
        letter-spacing: .03em;
      }

      /* Individual platform colors */
      .social-fb    { background: linear-gradient(145deg, #6fa3ef, #3b5998); }
      .social-x     { background: linear-gradient(145deg, #555, #111); }
      .social-ig    { background: linear-gradient(145deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888); }
      .social-yt    { background: linear-gradient(145deg, #ff6b6b, #e00); }

      /* ===== DIVIDER ===== */
      .jam-divider {
        display: flex; align-items: center; gap: 1rem;
        position: relative; z-index: 2;
      }
      .jam-divider::before, .jam-divider::after {
        content: ''; flex: 1; height: 3px;
        background: linear-gradient(90deg, transparent, rgba(200,30,60,.3), transparent);
        border-radius: 3px;
      }
      .jam-divider-icon { font-size: 1.6rem; }

      /* ===== FORM ===== */
      .contact-form {
        display: grid;
        gap: 1.2rem;
      }
      .form-label {
        font-family: var(--font-body);
        font-weight: 700;
        font-size: .92rem;
        color: #7a3050;
        display: flex;
        flex-direction: column;
        gap: .4rem;
      }
      .form-input, .form-textarea {
        font-family: var(--font-body);
        font-size: 1rem;
        color: #4a2030;
        width: 100%;
        padding: .65rem 1rem;
        border-radius: 16px;
        border: 2px solid rgba(200,80,120,.25);
        background: rgba(255,255,255,.8);
        outline: none;
        transition: border-color .2s, box-shadow .2s;
      }
      .form-input:focus, .form-textarea:focus {
        border-color: var(--jam);
        box-shadow: 0 0 0 3px rgba(200,24,58,.12);
        background: #fff;
      }
      .form-textarea { resize: vertical; min-height: 110px; }
      .form-submit {
        font-family: var(--font-body);
        font-weight: 700;
        font-size: 1rem;
        color: #fff;
        background: linear-gradient(135deg, #e8304a, #c0203a);
        border: none;
        border-radius: 999px;
        padding: .8rem 2rem;
        cursor: pointer;
        letter-spacing: .03em;
        box-shadow: 0 4px 18px rgba(200,30,60,.35), 0 2px 0 rgba(255,255,255,.25) inset;
        transition: transform .2s, box-shadow .2s;
        justify-self: center;
      }
      .form-submit:hover {
        transform: translateY(-3px) scale(1.04);
        box-shadow: 0 8px 28px rgba(200,30,60,.45);
      }

      /* ===== CTA ROW ===== */
      .cta-row {
        display: flex; gap: 1rem; flex-wrap: wrap;
        justify-content: center;
        position: relative; z-index: 2;
        margin-top: .5rem;
      }
      .cta-btn {
        font-family: var(--font-body); font-weight: 700;
        font-size: 1rem; text-decoration: none;
        padding: .8rem 2rem; border-radius: 999px;
        letter-spacing: .03em;
        transition: transform .2s, box-shadow .2s;
        display: inline-flex; align-items: center; gap: .5rem;
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

      /* ===== SIDE DECORATIONS ===== */
      .side-strawberry {
        position: fixed; pointer-events: none; z-index: 0;
        font-size: 3.5rem; opacity: .08;
        animation: sideBob 6s ease-in-out infinite;
      }
      .side-strawberry.left  { left: 1.5rem; top: 35%; animation-delay: 0s; }
      .side-strawberry.right { right: 1.5rem; top: 55%; animation-delay: 2s; }
      @keyframes sideBob {
        0%, 100% { transform: translateY(0) rotate(-8deg); }
        50%       { transform: translateY(-20px) rotate(8deg); }
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
        max-width: 900px; margin: 0 auto;
        display: flex; flex-direction: column;
        align-items: center; gap: 1.2rem; text-align: center;
      }
      .footer-brand { display: flex; align-items: center; gap: 1rem; }
      .footer-brand-icon { font-size: 2rem; color: #e0507a; line-height: 1; }
      .footer-brand .name {
        font-family: var(--font-display);
        font-size: 1.5rem; color: #7a2040;
        letter-spacing: .04em; line-height: 1.1;
        text-shadow: 1px 2px 0 rgba(255,255,255,.5);
      }
      .footer-brand .sub {
        font-family: var(--font-body);
        font-size: .9rem; color: #a04060; font-weight: 600;
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
        display: inline-flex; align-items: center; justify-content: center;
        width: 40px; height: 40px; border-radius: 50%;
        background: rgba(255,255,255,.5); color: #c0204a;
        font-size: 1.1rem; font-weight: 700; text-decoration: none;
        border: 2px solid rgba(200,80,120,.2);
        transition: background .2s, transform .2s;
      }
      .footer-socials a:hover { background: rgba(255,255,255,.85); transform: scale(1.12); }
      .copyright {
        font-family: var(--font-body);
        font-size: .82rem; color: #a05070;
        font-weight: 600; line-height: 1.6;
      }

      /* ===== RESPONSIVE ===== */
      @media (max-width: 540px) {
        .jam-card { padding: 1.6rem 1.4rem; }
        .intro-card { padding: 1.8rem 1.4rem; }
        .jam-spread-wrap { padding: 2rem 1rem 3rem; }
        .social-icon { width: 50px; height: 50px; font-size: 1.3rem; }
      }`;
const CONTACT_HTML = `<!-- Fixed side strawberries -->
    <span class="side-strawberry left" aria-hidden="true">🍓</span>
    <span class="side-strawberry right" aria-hidden="true">🍓</span>

    <!-- ===== HEADER ===== -->
    <header class="site-header">
      <span class="cloud-puff cloud-puff-1" aria-hidden="true"></span>
      <span class="cloud-puff cloud-puff-2" aria-hidden="true"></span>
      <span class="cloud-puff cloud-puff-3" aria-hidden="true"></span>
      <a href="/" class="logo">
        <span class="logo-top"><span class="bow">🎀</span> photobooth <span class="bow">🎀</span></span>
        <span class="logo-bottom">kawaii</span>
      </a>
      <nav class="site-nav" id="siteNav" aria-label="Main">
        <ul class="nav-main">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/photobooth">Photobooth</a></li>
          
          <li><a href="/contact" aria-current="page">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </nav>
      <span class="header-bow" aria-hidden="true">🎀</span>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </header>

    <!-- ===== JAM SPREAD TOP ===== -->
    <div class="jam-spread-top" aria-hidden="true">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,60 C120,20 240,80 360,45 C480,10 600,75 720,40 C840,5 960,70 1080,38 C1200,8 1320,65 1440,35 L1440,0 L0,0 Z" fill="rgba(220,30,60,0.08)"/>
        <path d="M0,70 C180,30 300,85 480,52 C660,18 780,78 960,50 C1140,22 1300,72 1440,48 L1440,0 L0,0 Z" fill="rgba(200,20,50,0.06)"/>
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
        <span class="sb-float" style="top:5%;  left:3%;  --dur:6s;   --delay:0s;   --r0:-8deg;  --r1:6deg">🍓</span>
        <span class="sb-float" style="top:28%; right:3%; --dur:7s;   --delay:1.5s; --r0:6deg;   --r1:-8deg">🍓</span>
        <span class="sb-float" style="top:62%; left:2%;  --dur:5.5s; --delay:3s;   --r0:-5deg;  --r1:9deg">🍓</span>
        <span class="sb-float" style="top:82%; right:2%; --dur:6.5s; --delay:0.8s; --r0:9deg;   --r1:-5deg">🍓</span>

        <!-- ===== PAGE HERO ===== -->
        <header class="page-hero">
          <div class="hero-emoji-row" aria-hidden="true">💌 🌸 ✨ 🌸 💌</div>
          <h1>Say Hello!</h1>
          <p class="hero-sub">
            we'd love to hear from you — questions, collabs, or just dropping by to say hi ♡
          </p>
        </header>

        <!-- ===== CONTENT ===== -->
        <div class="contact-content">

          <!-- INTRO CARD -->
          <div class="intro-card">
            <p class="intro-lead">
              Whether you have a question, want to collaborate, or just want to share your cutest polaroid moment with us — our inbox is always open and happy to hear from you. Don't be shy, every message puts a big smile on our face! 💖
            </p>
          </div>

          <div class="jam-divider" aria-hidden="true">
            <span class="jam-divider-icon">🍓</span>
          </div>

          <!-- EMAIL CARD -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">💌</span> Send Us an Email</h2>
            <p class="card-text">
              For questions, collaborations, event bookings, or any concerns, you can reach us directly at our email below. We try our best to respond within 1–2 business days — we promise we don't bite! 🌸
            </p>
            <p class="card-text">
              Whether it's a big inquiry or a tiny hello, every message is always welcome.
            </p>
            <div style="text-align:center; margin-top:1.6rem;">
              <a href="mailto:photoboothkawaii@gmail.com" class="email-link">
                📧 photoboothkawaii@gmail.com
              </a>
            </div>
          </div>

          <!-- SOCIALS CARD -->
          <div class="jam-card">
            <h2 class="card-heading"><span class="icon">🌸</span> Find Us Online</h2>
            <p class="card-text">
              Follow along for updates, cute moments, new frames, and behind-the-scenes fun. Come hang out with us! ✨
            </p>
            <div class="social-grid">
              <a href="#" class="social-btn" aria-label="Facebook">
                <div class="social-icon social-fb">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </div>
                <span class="social-label">Facebook</span>
              </a>
              <a href="#" class="social-btn" aria-label="X (Twitter)">
                <div class="social-icon social-x">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span class="social-label">X (Twitter)</span>
              </a>
              <a href="#" class="social-btn" aria-label="Instagram">
                <div class="social-icon social-ig">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" stroke-width="2"/>
                    <circle cx="12" cy="12" r="4" fill="none" stroke="white" stroke-width="2"/>
                    <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
                  </svg>
                </div>
                <span class="social-label">Instagram</span>
              </a>
              <a href="#" class="social-btn" aria-label="YouTube">
                <div class="social-icon social-yt">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#e00"/>
                  </svg>
                </div>
                <span class="social-label">YouTube</span>
              </a>
            </div>
          </div>

          <div class="jam-divider" aria-hidden="true">
            <span class="jam-divider-icon">🍓</span>
          </div>

          <!-- CTA ROW -->
          <div class="cta-row">
            <a href="/photobooth" class="cta-btn cta-btn-primary">📸 Open the Booth</a>
            <a href="/about"      class="cta-btn cta-btn-secondary">🌸 Learn About Us</a>
          </div>

        </div><!-- /.contact-content -->
      </div><!-- /.jam-spread-wrap -->
    </main>

    <!-- ===== JAM SPREAD BOTTOM ===== -->
    <div class="jam-spread-bottom" aria-hidden="true">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,20 C180,60 300,10 480,45 C660,80 780,15 960,50 C1140,80 1300,18 1440,42 L1440,80 L0,80 Z" fill="rgba(220,30,60,0.07)"/>
        <path d="M0,35 C120,70 260,15 420,48 C580,82 720,22 900,55 C1080,82 1260,25 1440,55 L1440,80 L0,80 Z" fill="rgba(200,20,50,0.05)"/>
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
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">&#128247;</a>
          <a href="#" aria-label="X (Twitter)">𝕏</a>
          <a href="#" aria-label="YouTube">▶</a>
        </div>
        <div class="footer-divider2" aria-hidden="true"></div>
        <p class="copyright">&copy; 2024 Photobooth Kawaii. All rights reserved. &#9825;</p>
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
    </script>`;
const CONTACT_JS   = `(function () {
        const btn = document.getElementById('hamburger');
        const nav = document.getElementById('siteNav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function () {
          const open = nav.classList.toggle('open');
          btn.classList.toggle('open', open);
          btn.setAttribute('aria-expanded', open);
        });
      })();`;

const PRIVACY_CSS  = `@font-face {
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
      }`;
const PRIVACY_HTML = `<!-- Fixed side strawberries -->
    <span class="side-strawberry left">🍓</span>
    <span class="side-strawberry right">🍓</span>

    <!-- ===== HEADER ===== -->
    <header class="site-header">
      <span class="cloud-puff cloud-puff-1" aria-hidden="true"></span>
      <span class="cloud-puff cloud-puff-2" aria-hidden="true"></span>
      <span class="cloud-puff cloud-puff-3" aria-hidden="true"></span>
      <a href="/" class="logo">
        <span class="logo-top"><span class="bow">🎀</span> photobooth <span class="bow">🎀</span></span>
        <span class="logo-bottom">kawaii</span>
      </a>
      <nav class="site-nav" id="siteNav" aria-label="Main">
        <ul class="nav-main">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/photobooth">Photobooth</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy" aria-current="page">Privacy Policy</a></li>
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
              If you have questions, concerns, or requests related to this Privacy Policy, you may reach out to us through our <a href="/contact" style="color:#c0183a;font-weight:700;text-decoration:underline">Contact</a> page. We are committed to providing clear and transparent information regarding your privacy.
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
    </script>`;
const PRIVACY_JS   = `(function () {
        const btn = document.getElementById('hamburger');
        const nav = document.getElementById('siteNav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function () {
          const open = nav.classList.toggle('open');
          btn.classList.toggle('open', open);
          btn.setAttribute('aria-expanded', open);
        });
      })();`;

const CHOOSESTYLE_CSS  = `@font-face {
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
      }`;
const CHOOSESTYLE_HTML = `<!-- Floating background decorations -->
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
      <a href="/" class="logo">
        <span class="logo-top"><span class="bow">🎀</span> photobooth <span class="bow">🎀</span></span>
        <span class="logo-bottom">kawaii</span>
      </a>
      <nav class="site-nav" id="siteNav" aria-label="Main">
        <ul class="nav-main">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/photobooth" aria-current="page">Photobooth</a></li>
          
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </nav>
      <span class="header-bow" aria-hidden="true">🎀</span>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </header>

    <main>
      <a href="/" class="back-link">← back to home</a>
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
    </script>`;
const CHOOSESTYLE_JS   = `// Hamburger menu toggle
      (function () {
        const btn = document.getElementById('hamburger');
        const nav = document.getElementById('siteNav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function () {
          const open = nav.classList.toggle('open');
          btn.classList.toggle('open', open);
          btn.setAttribute('aria-expanded', open);
        });
      })();`;

const PHOTOBOOTH_CSS  = `:root {
  --pink: #ff85a1;
  --pink-light: #ffb3c6;
  --pink-dark: #e05c7a;
  --pink-pale: #ffe0eb;
  --lavender: #d4b8e0;
  --sky: #ffd6e7;
  --cream: #fff5f8;
  --brown: #5c3d2e;
  --green: #a8d5a2;
  --green-dark: #7ab870;
  --yellow: #ffe083;
  --purple-soft: #c4a8e0;
  --white: #ffffff;
  --text-dark: #3d1f2e;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Nunito', sans-serif;
  background: var(--cream);
  color: var(--text-dark);
  overflow-x: hidden;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='6' fill='%23ff85a1' opacity='0.8'/%3E%3C/svg%3E"), auto;
}

/* ── NAV ── */
nav {
  position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border-radius: 60px;
  padding: 14px 36px;
  display: flex; align-items: center; gap: 40px;
  box-shadow: 0 4px 30px rgba(255,133,161,0.25);
  z-index: 999;
  border: 2px solid rgba(255,180,200,0.4);
  white-space: nowrap;
}
.nav-logo {
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 1.05rem;
  line-height: 1.2;
  text-decoration: none;
}
.nav-logo span:first-child { color: var(--brown); display: block; font-size: 0.78rem; font-weight: 700; }
.nav-logo span:last-child { color: var(--pink); font-size: 1.2rem; }
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a {
  text-decoration: none; font-weight: 700; font-size: 0.88rem;
  color: var(--text-dark); transition: color 0.2s;
}
.nav-links a:hover, .nav-links a.active { color: var(--pink); }
.nav-links a.active { border-bottom: 2px solid var(--pink); padding-bottom: 2px; }
.nav-bow { font-size: 1.4rem; animation: bow-wiggle 2s ease-in-out infinite; }
@keyframes bow-wiggle { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }

/* ── HERO ── */
#hero {
  position: relative;
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  overflow: hidden;
  padding-top: 100px;
}

/* Sky gradient */
.sky-bg {
  position: absolute; inset: 0;
  background: linear-gradient(170deg,
    #ffc8de 0%,
    #ffaecf 20%,
    #ffd1e8 40%,
    #f5c8e8 60%,
    #e8d0f5 80%,
    #d4c8f0 100%);
  z-index: 0;
}

/* Clouds */
.cloud {
  position: absolute;
  background: rgba(255,255,255,0.9);
  border-radius: 50px;
  filter: blur(2px);
  animation: cloud-float linear infinite;
}
.cloud::before,.cloud::after {
  content:''; position:absolute;
  background: rgba(255,255,255,0.9); border-radius: 50%;
}
.cloud-1 { width:120px;height:40px;top:8%;left:-140px;animation-duration:28s; }
.cloud-1::before { width:60px;height:60px;top:-30px;left:20px; }
.cloud-1::after { width:40px;height:40px;top:-20px;left:55px; }
.cloud-2 { width:90px;height:30px;top:15%;left:-110px;animation-duration:36s;animation-delay:-12s; }
.cloud-2::before { width:45px;height:45px;top:-22px;left:15px; }
.cloud-3 { width:150px;height:50px;top:6%;left:-180px;animation-duration:44s;animation-delay:-22s;opacity:0.7; }
.cloud-3::before { width:70px;height:70px;top:-35px;left:25px; }
.cloud-4 { width:80px;height:28px;top:22%;left:-100px;animation-duration:32s;animation-delay:-8s; }
@keyframes cloud-float { from{left:-200px} to{left:110vw} }

/* Mountains */
.mountains {
  position: absolute;
  bottom: 18%;
  left: 0; right: 0;
  z-index: 1;
  pointer-events: none;
}
.mountains svg { width: 100%; height: 280px; display: block; }

/* Waterfall + ocean */
.waterfall-scene {
  position: absolute;
  bottom: 16%;
  right: 4%;
  width: 130px;
  z-index: 2;
}
.waterfall-flow {
  width: 22px; height: 90px;
  background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(180,220,255,0.8) 60%, rgba(160,200,255,0.6) 100%);
  border-radius: 10px;
  margin: 0 auto;
  animation: wf-shimmer 1.5s ease-in-out infinite alternate;
  box-shadow: 0 0 12px rgba(180,220,255,0.7);
  position: relative;
}
.waterfall-flow::after {
  content:''; position:absolute; bottom:-14px; left:-18px;
  width:58px; height:20px;
  background: radial-gradient(ellipse, rgba(180,220,255,0.7) 60%, transparent 100%);
  border-radius: 50%;
  animation: wf-splash 1.2s ease-in-out infinite alternate;
}
@keyframes wf-shimmer { from{opacity:0.85} to{opacity:1} }
@keyframes wf-splash { from{transform:scaleX(0.9)} to{transform:scaleX(1.1)} }

/* Ocean */
.ocean {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 19%;
  z-index: 3;
  overflow: hidden;
}
.wave {
  position: absolute;
  width: 200%;
  height: 100%;
  border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
}
.wave-1 {
  bottom: -10px;
  background: linear-gradient(180deg, rgba(255,182,217,0.6) 0%, rgba(255,150,200,0.75) 100%);
  animation: wave-roll 7s linear infinite;
  left: -50%;
}
.wave-2 {
  bottom: -18px;
  background: linear-gradient(180deg, rgba(255,200,230,0.5) 0%, rgba(255,130,185,0.65) 100%);
  animation: wave-roll 10s linear infinite reverse;
  animation-delay: -3s;
  left: -50%;
}
.wave-3 {
  bottom: -6px;
  background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,170,210,0.5) 100%);
  animation: wave-roll 14s linear infinite;
  animation-delay: -6s;
  left: -50%;
}
@keyframes wave-roll { from{transform:translateX(0) rotate(0deg)} to{transform:translateX(50%) rotate(2deg)} }

/* Grass */
.grass-strip {
  position: absolute;
  bottom: 17.5%;
  left: 0; right: 0;
  height: 60px;
  z-index: 4;
  pointer-events: none;
}
.blade {
  position: absolute;
  bottom: 0;
  width: 10px;
  border-radius: 50% 50% 0 0;
  transform-origin: bottom center;
  animation: grass-sway 2.5s ease-in-out infinite alternate;
}
@keyframes grass-sway { from{transform:rotate(-8deg)} to{transform:rotate(8deg)} }

/* Sprinkles */
.sprinkles-layer { position:absolute;inset:0;z-index:5;pointer-events:none; }
.sprinkle {
  position: absolute;
  border-radius: 50px;
  animation: sprinkle-float linear infinite;
  opacity: 0.85;
}
@keyframes sprinkle-float {
  0%   { transform: translateY(0) rotate(0deg); opacity: 0.85; }
  50%  { opacity: 1; }
  100% { transform: translateY(-80px) rotate(360deg); opacity: 0; }
}

/* Butterflies */
.butterfly {
  position: absolute;
  z-index: 6;
  animation: butterfly-drift linear infinite;
  pointer-events: none;
}
.butterfly svg { animation: butterfly-flap 0.6s ease-in-out infinite alternate; transform-origin: center; }
@keyframes butterfly-flap { from{transform:scaleX(1)} to{transform:scaleX(0.4)} }
@keyframes butterfly-drift {
  0%   { transform: translate(0,0) rotate(0deg); }
  25%  { transform: translate(40px,-30px) rotate(5deg); }
  50%  { transform: translate(80px,10px) rotate(-5deg); }
  75%  { transform: translate(40px,40px) rotate(3deg); }
  100% { transform: translate(0,0) rotate(0deg); }
}

/* Kawaii floaters */
.kawaii-float {
  position: absolute; z-index: 6;
  font-size: 2.4rem;
  animation: kawaii-bob 3s ease-in-out infinite alternate;
  filter: drop-shadow(0 4px 8px rgba(255,133,161,0.3));
  user-select: none;
}
@keyframes kawaii-bob { from{transform:translateY(0) rotate(-5deg)} to{transform:translateY(-18px) rotate(5deg)} }

/* Hero content */
.hero-content {
  position: relative; z-index: 7;
  text-align: center;
  display: flex; flex-direction: column; align-items: center;
  gap: 18px;
  margin-top: -40px;
}
.hero-title {
  line-height: 1;
}
.hero-title .photobooth-word {
  display: block;
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: clamp(2.8rem,7vw,5.5rem);
  color: var(--brown);
  letter-spacing: -1px;
  text-shadow: 3px 3px 0 rgba(255,255,255,0.6);
}
.hero-title .kawaii-word {
  display: block;
  font-family: 'Pacifico', cursive;
  font-size: clamp(4rem,10vw,8rem);
  background: linear-gradient(135deg, #ff85a1 0%, #ff4d7d 40%, #ff85a1 70%, #ffb3c6 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(2px 4px 0px rgba(255,77,125,0.3));
  animation: kawaii-pulse 3s ease-in-out infinite;
}
@keyframes kawaii-pulse { 0%,100%{filter:drop-shadow(2px 4px 0px rgba(255,77,125,0.3))} 50%{filter:drop-shadow(2px 4px 16px rgba(255,77,125,0.6))} }

.title-badge {
  background: white;
  border: 2.5px solid var(--pink-light);
  border-radius: 30px;
  padding: 6px 28px;
  display: inline-block;
}
.title-badge p {
  font-size: 1.05rem; font-weight: 700;
  color: var(--pink);
  letter-spacing: 1px;
}
.title-badge p::before,.title-badge p::after { content: ' ♡ '; }

.camera-btn {
  width: 120px; height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff85a1 0%, #ff4d7d 60%, #e03060 100%);
  border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(255,77,125,0.45), inset 0 2px 6px rgba(255,255,255,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  animation: btn-pulse 2.5s ease-in-out infinite;
}
.camera-btn:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(255,77,125,0.6); }
.camera-btn::after {
  content:''; position:absolute;
  inset:-8px; border-radius:50%;
  border: 2px dashed rgba(255,133,161,0.6);
  animation: btn-spin 8s linear infinite;
}
@keyframes btn-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes btn-pulse { 0%,100%{box-shadow:0 8px 32px rgba(255,77,125,0.45)} 50%{box-shadow:0 8px 48px rgba(255,77,125,0.7)} }
.camera-icon { font-size: 2.8rem; }

.start-label {
  font-size: 0.95rem; font-weight: 800;
  color: var(--pink-dark);
  letter-spacing: 2px;
}
.start-label::before,.start-label::after { content: ' ✦ '; }

/* ── POSES SECTION ── */
#poses {
  position: relative;
  padding: 100px 40px 80px;
  background: linear-gradient(180deg, #fff5f8 0%, #ffe8f2 50%, #fff0f5 100%);
  z-index: 10;
}
#poses::before {
  content:'';
  position:absolute; top:-40px; left:0; right:0; height:80px;
  background: linear-gradient(180deg, transparent, #fff5f8);
  z-index:1;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative; z-index:2;
}
.section-tag {
  display: inline-block;
  background: var(--pink);
  color: white;
  font-weight: 800; font-size: 0.75rem;
  letter-spacing: 3px; text-transform: uppercase;
  padding: 6px 18px; border-radius: 20px;
  margin-bottom: 14px;
}
.section-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem,5vw,3.2rem);
  color: var(--brown);
  line-height: 1.2;
  margin-bottom: 12px;
}
.section-title span { color: var(--pink); }
.section-sub {
  font-size: 1.05rem; color: #9b6b7a; font-weight: 600; max-width: 560px; margin: 0 auto;
}

.poses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative; z-index:2;
}
.pose-card {
  background: white;
  border-radius: 28px;
  padding: 36px 28px 30px;
  border: 2px solid rgba(255,180,200,0.3);
  box-shadow: 0 6px 30px rgba(255,133,161,0.12);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}
.pose-card::before {
  content:'';
  position:absolute; top:0; left:0; right:0; height:5px;
  border-radius: 28px 28px 0 0;
}
.pose-card:nth-child(1)::before { background: linear-gradient(90deg, #ff85a1, #ffb3c6); }
.pose-card:nth-child(2)::before { background: linear-gradient(90deg, #c4a8e0, #d4b8e0); }
.pose-card:nth-child(3)::before { background: linear-gradient(90deg, #ffe083, #ffc080); }
.pose-card:nth-child(4)::before { background: linear-gradient(90deg, #a8d5a2, #7ab870); }
.pose-card:nth-child(5)::before { background: linear-gradient(90deg, #ff85a1, #c4a8e0); }
.pose-card:nth-child(6)::before { background: linear-gradient(90deg, #ffb3c6, #ffe083); }
.pose-card:hover { transform: translateY(-8px); box-shadow: 0 18px 50px rgba(255,133,161,0.22); }
.pose-emoji { font-size: 3rem; margin-bottom: 14px; display: block; }
.pose-name {
  font-weight: 900; font-size: 1.2rem; color: var(--brown);
  margin-bottom: 10px;
}
.pose-desc { font-size: 0.93rem; color: #8a6070; line-height: 1.65; font-weight: 600; }

/* Why use us */
.why-strip {
  background: linear-gradient(135deg, #ff85a1 0%, #ff4d7d 50%, #d4349a 100%);
  border-radius: 30px;
  padding: 60px 48px;
  max-width: 1100px;
  margin: 70px auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  box-shadow: 0 20px 60px rgba(255,77,125,0.35);
  position: relative; z-index:2;
  overflow: hidden;
}
.why-strip::before {
  content:'♡ ✦ ♡ ✦ ♡ ✦ ♡ ✦ ♡ ✦ ♡';
  position:absolute; top:14px; right:24px;
  font-size:0.75rem; color:rgba(255,255,255,0.3);
  letter-spacing:3px;
}
.why-text h2 {
  font-weight: 900; font-size: clamp(1.8rem,4vw,2.8rem);
  color: white; line-height: 1.2; margin-bottom: 16px;
}
.why-text p {
  color: rgba(255,255,255,0.88); font-size: 1rem;
  line-height: 1.7; font-weight: 600;
}
.why-features { display: flex; flex-direction: column; gap: 18px; }
.why-feat {
  background: rgba(255,255,255,0.15);
  border-radius: 16px; padding: 16px 20px;
  display: flex; align-items: flex-start; gap: 14px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.2);
}
.why-feat-icon { font-size: 1.6rem; flex-shrink:0; }
.why-feat-text strong { display:block; color:white; font-weight:800; font-size:0.95rem; margin-bottom:3px; }
.why-feat-text span { color:rgba(255,255,255,0.8); font-size:0.87rem; font-weight:600; }

/* ── FOOTER ── */
footer {
  background: white;
  border-top: 2px solid rgba(255,180,200,0.3);
  padding: 40px 48px 30px;
  display: flex; flex-wrap: wrap;
  justify-content: space-between; align-items: center;
  gap: 24px;
}
.footer-logo { font-weight: 900; }
.footer-logo span:first-child { color: var(--brown); font-size: 0.9rem; display:block; }
.footer-logo .big { color: var(--pink); font-size: 1.3rem; font-family:'Pacifico',cursive; }
.footer-logo small { color: #b08090; font-size:0.82rem; font-weight:600; display:block; margin-top:2px; }
.footer-socials { display: flex; gap: 14px; }
.soc-btn {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, var(--pink-pale), var(--pink-light));
  border: 2px solid rgba(255,133,161,0.4);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none;
  font-size: 1.1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  color: var(--pink-dark);
}
.soc-btn:hover { transform:scale(1.15); box-shadow:0 4px 16px rgba(255,133,161,0.4); }
.footer-copy { color: #b08090; font-size: 0.82rem; font-weight: 600; }

/* Sparkle stars */
.sparkle { position:absolute; z-index:6; pointer-events:none; animation: sparkle-twinkle 2s ease-in-out infinite; }
@keyframes sparkle-twinkle { 0%,100%{opacity:0;transform:scale(0.5)} 50%{opacity:1;transform:scale(1)} }`;
const PHOTOBOOTH_HTML = `<!-- NAV -->
<nav>
  <a href="/" class="nav-logo"><span>photobooth</span><span>kawaii</span></a>
  <ul class="nav-links">
    <li><a href="/" class="active">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/photobooth">Photobooth</a></li>
    
    <li><a href="/contact">Contact</a></li>
    <li><a href="/privacy">Privacy Policy</a></li>
  </ul>
  <span class="nav-bow">🎀</span>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="sky-bg"></div>

  <!-- Clouds -->
  <div class="cloud cloud-1"></div>
  <div class="cloud cloud-2"></div>
  <div class="cloud cloud-3"></div>
  <div class="cloud cloud-4"></div>

  <!-- Mountains SVG -->
  <div class="mountains">
    <svg viewBox="0 0 1440 280" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Far mountains -->
      <polygon points="0,280 0,160 180,60 360,140 540,40 720,120 900,30 1080,110 1260,50 1440,130 1440,280" fill="rgba(200,160,210,0.55)"/>
      <!-- Mid mountains -->
      <polygon points="0,280 0,200 100,130 280,80 460,160 640,90 820,170 1000,80 1200,150 1440,100 1440,280" fill="rgba(210,170,220,0.65)"/>
      <!-- Near mountains -->
      <polygon points="0,280 0,240 120,170 320,110 520,200 700,130 880,210 1060,140 1280,200 1440,160 1440,280" fill="rgba(220,175,215,0.8)"/>
      <!-- Snow caps -->
      <polygon points="180,60 155,90 205,90" fill="rgba(255,255,255,0.8)"/>
      <polygon points="540,40 515,75 565,75" fill="rgba(255,255,255,0.8)"/>
      <polygon points="900,30 875,65 925,65" fill="rgba(255,255,255,0.8)"/>
      <polygon points="1260,50 1235,80 1285,80" fill="rgba(255,255,255,0.8)"/>
    </svg>
  </div>

  <!-- Waterfall scene -->
  <div class="waterfall-scene" style="bottom:19%;right:8%">
    <div class="waterfall-flow"></div>
  </div>

  <!-- Ocean waves -->
  <div class="ocean">
    <div class="wave wave-1"></div>
    <div class="wave wave-2"></div>
    <div class="wave wave-3"></div>
  </div>

  <!-- Grass strip -->
  <div class="grass-strip" id="grass"></div>

  <!-- Sprinkles -->
  <div class="sprinkles-layer" id="sprinkles"></div>

  <!-- Butterflies -->
  <div id="butterflies"></div>

  <!-- Kawaii floaters -->
  <div class="kawaii-float" style="top:22%;left:6%;animation-delay:0s">☁️</div>
  <div class="kawaii-float" style="top:55%;left:3%;animation-delay:0.8s;font-size:2rem">🌸</div>
  <div class="kawaii-float" style="top:30%;left:12%;animation-delay:1.5s;font-size:1.6rem">🍓</div>
  <div class="kawaii-float" style="top:20%;right:7%;animation-delay:0.4s">⭐</div>
  <div class="kawaii-float" style="top:45%;right:4%;animation-delay:1.2s;font-size:2rem">🐻</div>
  <div class="kawaii-float" style="top:65%;right:9%;animation-delay:0.6s;font-size:1.8rem">💕</div>
  <div class="kawaii-float" style="top:70%;left:8%;animation-delay:2s;font-size:1.6rem">💜</div>
  <div class="kawaii-float" style="top:15%;left:42%;animation-delay:0.3s;font-size:1.4rem">✨</div>

  <!-- Sparkles -->
  <div class="sparkle" style="top:28%;left:25%;animation-delay:0s">✦</div>
  <div class="sparkle" style="top:40%;right:22%;animation-delay:0.7s">✦</div>
  <div class="sparkle" style="top:60%;left:32%;animation-delay:1.4s">✦</div>
  <div class="sparkle" style="top:18%;right:35%;animation-delay:0.3s;font-size:0.8rem">✦</div>

  <!-- Hero content -->
  <div class="hero-content">
    <div class="hero-title">
      <span class="photobooth-word">photobooth</span>
      <span class="kawaii-word">kawaii</span>
    </div>
    <div class="title-badge"><p>cute moments, forever</p></div>
    <button class="camera-btn" onclick="alert('📸 Strike your best pose!')">
      <span class="camera-icon">📷</span>
    </button>
    <p class="start-label">click to start!</p>
  </div>
</section>

<!-- POSES SECTION -->
<section id="poses">
  <div class="section-header">
    <div class="section-tag">✨ Pose Guide</div>
    <h2 class="section-title">Strike Your Best <span>Kawaii Pose!</span></h2>
    <p class="section-sub">Not sure how to pose? We've got you covered with our cutest, most flattering ideas!</p>
  </div>

  <div class="poses-grid">
    <div class="pose-card">
      <span class="pose-emoji">🤞✨</span>
      <h3 class="pose-name">The Lucky Cross</h3>
      <p class="pose-desc">Cross your fingers and wink at the camera! It's cute, playful, and gives off main character energy. Perfect for your solo glow-up shot — ideal when you want to look effortlessly confident and fun!</p>
    </div>
    <div class="pose-card">
      <span class="pose-emoji">😄🙌</span>
      <h3 class="pose-name">The Big Cheer</h3>
      <p class="pose-desc">Throw your hands up, flash a huge grin and lean into the frame! This high-energy pose is contagious joy in photo form. Group shots come ALIVE with this one — it shows your happiest, most genuine self!</p>
    </div>
    <div class="pose-card">
      <span class="pose-emoji">🦋🌀</span>
      <h3 class="pose-name">Spin & Snap</h3>
      <p class="pose-desc">Mid-twirl is pure magic! Spin just before the shutter clicks and let your hair or outfit swirl. The motion adds life and dimension to your photo — you'll look like you just stepped out of a music video!</p>
    </div>
    <div class="pose-card">
      <span class="pose-emoji">🎀👯</span>
      <h3 class="pose-name">BFF Stack</h3>
      <p class="pose-desc">Stand close, lean into each other, and match your expressions! Squish together, make funny faces or strike matching poses. The best friendship memories are the silly ones — these shots become forever treasures!</p>
    </div>
  </div>

  <!-- Why use us strip -->
  <div class="why-strip">
    <div class="why-text">
      <h2>Why Photobooth<br>Kawaii? 🎀</h2>
      <p>We aren't just a photobooth — we're a memory-making experience wrapped in the cutest, most magical aesthetic you've ever seen. Every click creates a keepsake you'll cherish forever. Here's why you'll fall in love with us!</p>
    </div>
    <div class="why-features">
      <div class="why-feat">
        <span class="why-feat-icon">🖼️</span>
        <div class="why-feat-text">
          <strong>100+ Kawaii Frames</strong>
          <span>From cherry blossoms to sparkly borders — there's a perfect frame for every mood and moment.</span>
        </div>
      </div>
      <div class="why-feat">
        <span class="why-feat-icon">⚡</span>
        <div class="why-feat-text">
          <strong>Instant Downloads</strong>
          <span>Your photos are ready the second you click — no waiting, no apps, no fuss. Just pure kawaii magic!</span>
        </div>
      </div>
      <div class="why-feat">
        <span class="why-feat-icon">🌈</span>
        <div class="why-feat-text">
          <strong>Dreamy Filters & FX</strong>
          <span>AI-powered filters that make every complexion glow and every background pop with pastel perfection.</span>
        </div>
      </div>
      <div class="why-feat">
        <span class="why-feat-icon">💌</span>
        <div class="why-feat-text">
          <strong>Share in One Tap</strong>
          <span>Send your strips directly to Instagram, TikTok, or as a cute digital sticker to your besties!</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">
    <span>photobooth</span>
    <span class="big">kawaii</span>
    <small>♡ cute moments, forever ♡</small>
  </div>
  <div class="footer-socials">
    <!-- Facebook -->
    <a href="https://facebook.com/photoboothkawaii.online" target="_blank" class="soc-btn" title="Facebook">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    </a>
    <!-- X / Twitter -->
    <a href="https://x.com/photoboothkawaii.online" target="_blank" class="soc-btn" title="X (Twitter)">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>
    <!-- Instagram -->
    <a href="https://instagram.com/photoboothkawaii.online" target="_blank" class="soc-btn" title="Instagram">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    </a>
    <!-- YouTube -->
    <a href="https://youtube.com/@photoboothkawaii.online" target="_blank" class="soc-btn" title="YouTube">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
    </a>
  </div>
  <p class="footer-copy">© 2024 Photobooth Kawaii. All rights reserved. ♡</p>
</footer>

<script>
// Generate grass blades
const grass = document.getElementById('grass');
for (let i = 0; i < 80; i++) {
  const blade = document.createElement('div');
  blade.className = 'blade';
  const h = 20 + Math.random() * 35;
  const greens = ['#a8d5a2','#7ab870','#c8e6c2','#90c080','#b5d9ae'];
  blade.style.cssText = \`
    left:\${(i/80)*100}%;
    height:\${h}px;
    background:\${greens[Math.floor(Math.random()*greens.length)]};
    transform:rotate(\${(Math.random()-0.5)*20}deg);
    animation-delay:\${Math.random()*2}s;
    animation-duration:\${1.8+Math.random()*1.5}s;
    opacity:\${0.7+Math.random()*0.3};
  \`;
  grass.appendChild(blade);
}

// Generate sprinkles
const sprinklesLayer = document.getElementById('sprinkles');
const colors = ['#ff85a1','#ffb3c6','#c4a8e0','#ffe083','#a8d5a2','#ffc0cb','#d4b8e0','#ff7eb3'];
for (let i = 0; i < 45; i++) {
  const s = document.createElement('div');
  s.className = 'sprinkle';
  const w = 6 + Math.random() * 8;
  const h = 2 + Math.random() * 3;
  s.style.cssText = \`
    left:\${Math.random()*95}%;
    top:\${20+Math.random()*60}%;
    width:\${w}px; height:\${h}px;
    background:\${colors[Math.floor(Math.random()*colors.length)]};
    transform:rotate(\${Math.random()*180}deg);
    animation-duration:\${3+Math.random()*5}s;
    animation-delay:\${Math.random()*4}s;
  \`;
  sprinklesLayer.appendChild(s);
}

// Generate butterflies
const bfContainer = document.getElementById('butterflies');
const bfColors = [['#ffb3c6','#ff85a1'],['#c4a8e0','#9b7fce'],['#ffe083','#ffc040'],['#a8d5a2','#7ab870']];
for (let i = 0; i < 7; i++) {
  const bf = document.createElement('div');
  bf.className = 'butterfly';
  const c = bfColors[i % bfColors.length];
  bf.style.cssText = \`
    left:\${5+Math.random()*80}%;
    top:\${10+Math.random()*60}%;
    animation-duration:\${6+Math.random()*8}s;
    animation-delay:\${Math.random()*5}s;
  \`;
  bf.innerHTML = \`<svg width="32" height="22" viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="9" rx="8" ry="7" fill="\${c[0]}" opacity="0.85"/>
    <ellipse cx="24" cy="9" rx="8" ry="7" fill="\${c[0]}" opacity="0.85"/>
    <ellipse cx="9" cy="15" rx="6" ry="5" fill="\${c[1]}" opacity="0.7"/>
    <ellipse cx="23" cy="15" rx="6" ry="5" fill="\${c[1]}" opacity="0.7"/>
    <line x1="16" y1="2" x2="16" y2="20" stroke="#5c3d2e" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M14 2 Q12 0 11 1" stroke="#5c3d2e" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M18 2 Q20 0 21 1" stroke="#5c3d2e" stroke-width="1" fill="none" stroke-linecap="round"/>
  </svg>\`;
  bfContainer.appendChild(bf);
}
</script>`;
const PHOTOBOOTH_JS   = `// Generate grass blades
const grass = document.getElementById('grass');
for (let i = 0; i < 80; i++) {
  const blade = document.createElement('div');
  blade.className = 'blade';
  const h = 20 + Math.random() * 35;
  const greens = ['#a8d5a2','#7ab870','#c8e6c2','#90c080','#b5d9ae'];
  blade.style.cssText = \`
    left:\${(i/80)*100}%;
    height:\${h}px;
    background:\${greens[Math.floor(Math.random()*greens.length)]};
    transform:rotate(\${(Math.random()-0.5)*20}deg);
    animation-delay:\${Math.random()*2}s;
    animation-duration:\${1.8+Math.random()*1.5}s;
    opacity:\${0.7+Math.random()*0.3};
  \`;
  grass.appendChild(blade);
}

// Generate sprinkles
const sprinklesLayer = document.getElementById('sprinkles');
const colors = ['#ff85a1','#ffb3c6','#c4a8e0','#ffe083','#a8d5a2','#ffc0cb','#d4b8e0','#ff7eb3'];
for (let i = 0; i < 45; i++) {
  const s = document.createElement('div');
  s.className = 'sprinkle';
  const w = 6 + Math.random() * 8;
  const h = 2 + Math.random() * 3;
  s.style.cssText = \`
    left:\${Math.random()*95}%;
    top:\${20+Math.random()*60}%;
    width:\${w}px; height:\${h}px;
    background:\${colors[Math.floor(Math.random()*colors.length)]};
    transform:rotate(\${Math.random()*180}deg);
    animation-duration:\${3+Math.random()*5}s;
    animation-delay:\${Math.random()*4}s;
  \`;
  sprinklesLayer.appendChild(s);
}

// Generate butterflies
const bfContainer = document.getElementById('butterflies');
const bfColors = [['#ffb3c6','#ff85a1'],['#c4a8e0','#9b7fce'],['#ffe083','#ffc040'],['#a8d5a2','#7ab870']];
for (let i = 0; i < 7; i++) {
  const bf = document.createElement('div');
  bf.className = 'butterfly';
  const c = bfColors[i % bfColors.length];
  bf.style.cssText = \`
    left:\${5+Math.random()*80}%;
    top:\${10+Math.random()*60}%;
    animation-duration:\${6+Math.random()*8}s;
    animation-delay:\${Math.random()*5}s;
  \`;
  bf.innerHTML = \`<svg width="32" height="22" viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="9" rx="8" ry="7" fill="\${c[0]}" opacity="0.85"/>
    <ellipse cx="24" cy="9" rx="8" ry="7" fill="\${c[0]}" opacity="0.85"/>
    <ellipse cx="9" cy="15" rx="6" ry="5" fill="\${c[1]}" opacity="0.7"/>
    <ellipse cx="23" cy="15" rx="6" ry="5" fill="\${c[1]}" opacity="0.7"/>
    <line x1="16" y1="2" x2="16" y2="20" stroke="#5c3d2e" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M14 2 Q12 0 11 1" stroke="#5c3d2e" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M18 2 Q20 0 21 1" stroke="#5c3d2e" stroke-width="1" fill="none" stroke-linecap="round"/>
  </svg>\`;
  bfContainer.appendChild(bf);
}`;

const PAGES: Record<PageId, {css:string; html:string; js:string}> = {
  home:        { css: HOME_CSS,        html: HOME_HTML,        js: HOME_JS },
  about:       { css: ABOUT_CSS,       html: ABOUT_HTML,       js: ABOUT_JS },
  contact:     { css: CONTACT_CSS,     html: CONTACT_HTML,     js: CONTACT_JS },
  privacy:     { css: PRIVACY_CSS,     html: PRIVACY_HTML,     js: PRIVACY_JS },
  choosestyle: { css: CHOOSESTYLE_CSS, html: CHOOSESTYLE_HTML, js: CHOOSESTYLE_JS },
  photobooth:  { css: PHOTOBOOTH_CSS,  html: PHOTOBOOTH_HTML,  js: PHOTOBOOTH_JS },
};

const PATH_MAP: Record<string, PageId> = {
  "/":            "home",
  "/about":       "about",
  "/contact":     "contact",
  "/privacy":     "privacy",
  "/choosestyle": "choosestyle",
  "/photobooth":  "photobooth",
};

function getPage(path: string): PageId {
  return PATH_MAP[path] ?? "home";
}

function Page({ id, nav }: { id: PageId; nav: (p: PageId) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { css, html, js } = PAGES[id];

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-pk", id);
    style.textContent = css;
    document.head.appendChild(style);

    const el = ref.current;
    if (!el) return () => style.remove();
    el.innerHTML = html;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      e.preventDefault();
      window.history.pushState({}, "", href);
      nav(getPage(href));
      window.scrollTo(0, 0);
    };
    el.addEventListener("click", onClick);

    try { new Function(js)(); } catch (_) {}

    return () => {
      el.removeEventListener("click", onClick);
      style.remove();
    };
  }, [id]);

  return <div ref={ref} style={{ minHeight: "100vh" }} />;
}

export default function App() {
  const [page, setPage] = useState<PageId>(getPage(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPage(getPage(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return <Page key={page} id={page} nav={setPage} />;
}