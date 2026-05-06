import { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Frame {
  id: number;
  name: string;
  cat: string;
  bg: string;
  border: string;
  accent: string;
  s: string[];
  caption: string;
  font: string;
}

// ─── CSS (injected once) ─────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700&display=swap');

  :root {
    --font-display: 'Baloo 2', cursive;
    --font-body: 'Nunito', sans-serif;
    --pink: #ff9ec8;
    --pink-deep: #ff6ba8;
    --lavender: #e8d4f0;
    --brown: #4a3728;
    --white: #fffefd;
    --gray: #6b5a52;
  }

  .bs-body {
    background: linear-gradient(165deg,#f5e6ff 0%,#ffd6e8 45%,#e8d4ff 100%);
    min-height: 100vh;
    padding-bottom: 100px;
    font-family: var(--font-body);
  }

  /* ── HEADER ── */
  .bs-header {
    background: #fff;
    margin: 1.6rem 1rem 0;
    padding: .75rem 1.75rem 1.1rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    position: relative;
    z-index: 100;
    border-radius: 120px 120px 60px 60px / 80px 80px 40px 40px;
    box-shadow: 0 6px 28px rgba(255,160,200,.22), 0 2px 8px rgba(255,160,200,.12);
  }
  .bs-header::before, .bs-header::after {
    content: ''; position: absolute; background: #fff;
    border-radius: 50%; box-shadow: 0 -4px 12px rgba(255,160,200,.15); z-index: -1;
  }
  .bs-header::before { width:140px; height:70px; top:-30px; left:12%; }
  .bs-header::after  { width:100px; height:55px; top:-22px; left:32%; }
  .bs-cloud-puff { position:absolute; background:#fff; border-radius:50%; z-index:-1; pointer-events:none; }
  .bs-cloud-puff-1 { width:80px;  height:50px; top:-18px; left:50%; }
  .bs-cloud-puff-2 { width:110px; height:60px; top:-26px; right:22%; }
  .bs-cloud-puff-3 { width:70px;  height:45px; top:-14px; right:10%; }

  .bs-logo { text-decoration:none; display:flex; flex-direction:column; align-items:center; line-height:1; gap:0; }
  .bs-logo-top  { font-family:var(--font-body); font-size:.88rem; font-weight:700; color:var(--pink-deep); letter-spacing:.04em; display:flex; align-items:center; gap:.3rem; white-space:nowrap; }
  .bs-logo-bottom { font-family:var(--font-display); font-size:1.8rem; font-weight:800; color:var(--pink-deep); line-height:1; margin-top:.05rem; }

  .bs-site-nav { display:flex; justify-content:center; }
  .bs-nav-main { list-style:none; display:flex; align-items:center; gap:2.8rem; margin:0; padding:0; }
  .bs-nav-main a { font-family:var(--font-body); font-size:1rem; font-weight:700; color:var(--brown); text-decoration:none; transition:color .2s; white-space:nowrap; letter-spacing:.02em; }
  .bs-nav-main a:hover { color:var(--pink-deep); }
  .bs-nav-main a.active { color:var(--pink-deep); border-bottom:2.5px solid var(--pink-deep); padding-bottom:2px; }

  .bs-header-bow { font-size:1.5rem; filter:drop-shadow(0 0 5px rgba(255,120,180,.5)); flex-shrink:0; justify-self:end; }
  .bs-hamburger { display:none; flex-direction:column; justify-content:center; gap:5px; background:none; border:none; cursor:pointer; padding:4px; z-index:200; }
  .bs-hamburger span { display:block; width:22px; height:2.5px; background:var(--brown); border-radius:2px; transition:transform .3s, opacity .3s; }
  .bs-hamburger.open span:nth-child(1) { transform:translateY(7.5px) rotate(45deg); }
  .bs-hamburger.open span:nth-child(2) { opacity:0; }
  .bs-hamburger.open span:nth-child(3) { transform:translateY(-7.5px) rotate(-45deg); }

  @media (max-width:640px) {
    .bs-header { display:flex; flex-wrap:wrap; border-radius:60px 60px 30px 30px / 50px 50px 25px 25px; margin:1.2rem .75rem 0; padding:.65rem 1.1rem .9rem; }
    .bs-hamburger { display:flex; order:3; }
    .bs-header-bow { order:2; }
    .bs-logo { order:1; flex:1; }
    .bs-site-nav { display:none; width:100%; order:4; padding:.5rem 0 .25rem; justify-content:flex-start; }
    .bs-site-nav.open { display:flex; }
    .bs-nav-main { flex-direction:column; align-items:flex-start; gap:0; width:100%; }
    .bs-nav-main li { width:100%; }
    .bs-nav-main a { display:block; padding:.55rem .25rem; border-bottom:1px solid rgba(255,160,200,.2); font-size:1.05rem; }
    .bs-nav-main li:last-child a { border-bottom:none; }
  }

  /* ── MAIN / STEPS ── */
  .bs-main { max-width:1040px; margin:0 auto; padding:1.5rem 1rem 5rem; position:relative; z-index:1; }

  .bs-step { display:none; animation:bsStepIn .4s ease both; }
  .bs-step.active { display:block; }
  @keyframes bsStepIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  /* ── BACK LINK ── */
  .bs-back-link {
    display:inline-flex; align-items:center; gap:.45rem; font-family:var(--font-body); font-size:.92rem;
    font-weight:700; color:#7a5800; text-decoration:none;
    background:radial-gradient(circle at 40% 35%, #fff7a0, #ffd700 60%, #f5b800);
    padding:.55rem 1.3rem .55rem 1rem; border-radius:999px; margin-bottom:1.25rem;
    letter-spacing:.02em; box-shadow:0 0 10px 2px rgba(255,220,0,.55),0 0 28px 6px rgba(255,200,0,.30),0 3px 10px rgba(200,140,0,.25);
    transition:transform .2s, box-shadow .2s; animation:bsBackGlow 2.4s ease-in-out infinite;
  }
  .bs-back-link:hover { transform:scale(1.06); }
  @keyframes bsBackGlow {
    0%,100% { box-shadow:0 0 10px 2px rgba(255,220,0,.55),0 0 28px 6px rgba(255,200,0,.30),0 3px 10px rgba(200,140,0,.25); }
    50%      { box-shadow:0 0 16px 5px rgba(255,230,0,.80),0 0 42px 12px rgba(255,210,0,.45),0 3px 10px rgba(200,140,0,.25); }
  }

  /* ── CAM WRAP ── */
  .bs-cam-wrap { max-width:560px; margin:0 auto; text-align:center; position:relative; }
  .bs-float-emoji { position:absolute; font-size:1.6rem; pointer-events:none; user-select:none; animation:bsFloatBob var(--dur,3s) ease-in-out infinite var(--delay,0s); z-index:2; }
  @keyframes bsFloatBob {
    0%,100% { transform:translateY(0) rotate(var(--rot0,-8deg)); }
    50%      { transform:translateY(-12px) rotate(var(--rot1,8deg)); }
  }
  .bs-cam-title { font-family:var(--font-display); font-size:clamp(1.5rem,4vw,2rem); color:var(--pink-deep); margin-bottom:.75rem; text-shadow:2px 2px 0 var(--white); }

  /* ── DOTS ── */
  .bs-shot-dots { display:flex; gap:.6rem; justify-content:center; margin-bottom:1rem; }
  .bs-dot { width:14px; height:14px; border-radius:50%; background:#e0c0d8; border:2px solid #d0a8c0; transition:background .3s; }
  .bs-dot.done    { background:var(--pink-deep); border-color:var(--pink-deep); }
  .bs-dot.current { background:var(--pink); border-color:var(--pink-deep); animation:bsDotPulse 1s ease-in-out infinite; }
  @keyframes bsDotPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
  .bs-shot-status { color:var(--gray); font-size:.9rem; margin:.5rem 0; font-family:var(--font-body); }

  /* ── VIDEO SHELL ── */
  .bs-video-shell { position:relative; border-radius:20px; overflow:hidden; box-shadow:0 12px 40px rgba(255,100,160,.3); background:#1a0a14; aspect-ratio:4/3; }
  .bs-video { width:100%; height:100%; object-fit:cover; display:block; transform:scaleX(-1); }
  .bs-countdown-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none; }
  .bs-countdown-num { font-family:var(--font-display); font-size:8rem; font-weight:700; color:#fff; text-shadow:0 0 40px rgba(255,120,180,.8),0 4px 0 rgba(0,0,0,.2); opacity:0; }
  .bs-countdown-num.show { animation:bsCountPop .85s ease forwards; }
  @keyframes bsCountPop {
    0%{opacity:0;transform:scale(2)} 20%{opacity:1;transform:scale(1)}
    80%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(.8)}
  }
  .bs-flash { position:absolute; inset:0; background:#fff; opacity:0; pointer-events:none; border-radius:20px; transition:opacity .08s ease; }
  .bs-flash.pop { opacity:1; }

  .bs-cam-btn { margin-top:1.25rem; padding:.85rem 2.5rem; background:linear-gradient(145deg,#ffb8d9,var(--pink-deep)); color:#fff; border:none; border-radius:99px; cursor:pointer; font-family:var(--font-display); font-size:1.2rem; box-shadow:0 8px 28px rgba(255,100,160,.4); transition:transform .2s, box-shadow .2s; }
  .bs-cam-btn:hover:not(:disabled) { transform:scale(1.05); box-shadow:0 12px 36px rgba(255,100,160,.5); }
  .bs-cam-btn:disabled { opacity:.5; cursor:not-allowed; }

  .bs-next-shot-msg { font-family:var(--font-display); font-size:1.5rem; color:#fff; text-shadow:0 2px 12px rgba(0,0,0,.5); position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(80,0,40,.4); border-radius:20px; }

  /* ── STUDIO ── */
  .bs-studio-layout { display:grid; grid-template-columns:1fr 320px; gap:1.5rem; align-items:start; }
  @media(max-width:760px){ .bs-studio-layout{ grid-template-columns:1fr; } }

  .bs-preview-panel { text-align:center; }
  .bs-preview-panel h2 { font-family:var(--font-display); font-size:1.5rem; color:var(--pink-deep); margin-bottom:1rem; text-shadow:2px 2px 0 var(--white); }

  .bs-action-btns { display:flex; gap:.75rem; justify-content:center; margin-top:1.25rem; flex-wrap:wrap; }
  .bs-btn-retake  { padding:.7rem 1.5rem; background:var(--white); color:var(--pink-deep); border:2px solid var(--pink); border-radius:99px; cursor:pointer; font-family:var(--font-display); font-size:1rem; transition:transform .2s; }
  .bs-btn-retake:hover { transform:scale(1.04); }
  .bs-btn-download { padding:.7rem 1.5rem; background:linear-gradient(145deg,#ffb8d9,var(--pink-deep)); color:#fff; border:none; border-radius:99px; cursor:pointer; font-family:var(--font-display); font-size:1rem; box-shadow:0 6px 20px rgba(255,100,160,.35); transition:transform .2s; }
  .bs-btn-download:hover { transform:scale(1.04); }

  /* ── FRAMES PANEL ── */
  .bs-frames-panel { background:var(--white); border-radius:20px; padding:1rem; box-shadow:0 8px 28px rgba(180,120,200,.15); max-height:600px; overflow-y:auto; }
  .bs-frames-panel h3 { font-family:var(--font-display); font-size:1.1rem; color:var(--pink-deep); margin:0 0 .75rem; text-align:center; }
  .bs-frames-category { margin-bottom:1rem; }
  .bs-cat-label { font-size:.72rem; font-weight:700; letter-spacing:.08em; color:var(--gray); text-transform:uppercase; margin-bottom:.4rem; padding:.25rem .5rem; background:var(--lavender); border-radius:99px; display:inline-block; }
  .bs-frames-row { display:flex; flex-wrap:wrap; gap:.5rem; }
  .bs-frame-thumb-btn { width:64px; height:80px; border-radius:10px; border:2px solid transparent; cursor:pointer; background:none; padding:3px; transition:transform .15s, border-color .15s; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; font-size:.6rem; color:var(--brown); box-shadow:0 2px 8px rgba(180,120,200,.15); }
  .bs-frame-thumb-btn:hover { transform:scale(1.08); }
  .bs-frame-thumb-btn.active { border-color:var(--pink-deep); box-shadow:0 0 0 3px rgba(255,107,168,.3); }
  .bs-thumb-preview { width:42px; height:54px; border-radius:4px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; flex-shrink:0; }
  .bs-thumb-label { font-size:.5rem; text-align:center; line-height:1.2; color:var(--gray); }

  /* ── FOOTER ── */
  .bs-footer { background:transparent; padding:1.25rem 1rem 1.5rem; margin-top:2.5rem; }
  .bs-footer-inner { max-width:900px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; border-top:1.5px solid rgba(255,160,200,.35); padding-top:1.25rem; flex-wrap:wrap; gap:.75rem 1.25rem; }
  .bs-footer-brand { display:flex; align-items:center; gap:.65rem; }
  .bs-footer-brand-icon { width:34px; height:34px; background:var(--pink-deep); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.9rem; flex-shrink:0; }
  .bs-footer-name { font-family:var(--font-display); font-size:.98rem; font-weight:700; color:var(--brown); line-height:1.2; }
  .bs-footer-sub { font-size:.75rem; color:var(--gray); }
  .bs-footer-divider { width:1px; height:36px; background:rgba(255,160,200,.35); flex-shrink:0; }
  .bs-footer-socials { display:flex; gap:.5rem; align-items:center; }
  .bs-footer-socials a { width:34px; height:34px; background:var(--pink-deep); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.85rem; text-decoration:none; transition:transform .2s, background .2s; }
  .bs-footer-socials a:hover { transform:scale(1.1); background:var(--brown); }
  .bs-copyright { font-size:.75rem; color:var(--gray); text-align:right; margin:0; line-height:1.5; }
  @media(max-width:640px){ .bs-footer-inner{ justify-content:center; text-align:center; } .bs-footer-divider{ display:none; } .bs-copyright{ text-align:center; width:100%; } .bs-footer-brand{ justify-content:center; } }

  /* ── GRASS ── */
  .bs-grass-strip { position:fixed; bottom:0; left:0; right:0; height:110px; pointer-events:none; z-index:50; overflow:hidden; }
  .bs-grass-strip svg { width:100%; height:100%; display:block; }

  /* ── BUTTERFLIES ── */
  .bs-butterfly { position:fixed; font-size:1.5rem; pointer-events:none; z-index:51; bottom:var(--bf-bottom,90px); animation:bsBflyX var(--bx-dur,18s) linear infinite var(--bx-delay,0s), bsBflyY var(--by-dur,3.2s) ease-in-out infinite var(--by-delay,0s), bsBflyFlap var(--flap-dur,.38s) ease-in-out infinite var(--flap-delay,0s); }
  @keyframes bsBflyX { 0%{left:-6%} 100%{left:110%} }
  @keyframes bsBflyY { 0%,100%{transform:translateY(0) rotate(var(--tilt,-5deg))} 50%{transform:translateY(-26px) rotate(var(--tilt,-5deg))} }
  @keyframes bsBflyFlap { 0%,100%{letter-spacing:0} 50%{letter-spacing:-.5em} }
`;

// ─── Frame data ───────────────────────────────────────────────────────────────
const FRAMES: Frame[] = [
  { id:1,  name:"Cherry Blossom", cat:"🌸 Floral",    bg:"#fff0f8", border:"#ff9ec8", accent:"#ffb8d9", s:["🌸","✿","💮","🌺"], caption:"bloom forever ✿",  font:"#d4789c" },
  { id:2,  name:"Rose Garden",    cat:"🌸 Floral",    bg:"#fff0f4", border:"#e87090", accent:"#ffb0c8", s:["🌹","🥀","🌹","🌷"], caption:"avec amour ♡",    font:"#c04070" },
  { id:3,  name:"Lavender Dream", cat:"🌸 Floral",    bg:"#f8f0ff", border:"#c090e0", accent:"#d4b0f0", s:["💜","🌿","💐","✨"], caption:"dreamy lavender",   font:"#8050b0" },
  { id:4,  name:"Sunflower Pop",  cat:"🌸 Floral",    bg:"#fffde8", border:"#e0b800", accent:"#ffe040", s:["🌻","☀️","🌻","🌼"], caption:"sunny days ☀",     font:"#a07000" },
  { id:5,  name:"Daisy Fields",   cat:"🌸 Floral",    bg:"#f0ffe0", border:"#90d060", accent:"#b0e880", s:["🌼","🌿","🌸","🍃"], caption:"field of daisies",  font:"#507030" },
  { id:6,  name:"Kawaii Pink",    cat:"🍬 Kawaii",    bg:"#fff0f8", border:"#ff80c0", accent:"#ffa0d0", s:["🎀","✨","🎀","💖"], caption:"kawaii desu ♡",    font:"#e0508a" },
  { id:7,  name:"Bunny Hop",      cat:"🍬 Kawaii",    bg:"#f4f0ff", border:"#c0b0f0", accent:"#d8d0ff", s:["🐰","🌸","🐰","🌸"], caption:"hop hop ✿",        font:"#8070c0" },
  { id:8,  name:"Star Girl",      cat:"🍬 Kawaii",    bg:"#fffce0", border:"#e0c000", accent:"#ffe840", s:["⭐","🌟","⭐","✨"], caption:"you're a star ★",  font:"#908000" },
  { id:9,  name:"Candy World",    cat:"🍬 Kawaii",    bg:"#fff4fc", border:"#ff80a0", accent:"#ffb0c8", s:["🍬","🍭","🍬","🍭"], caption:"sweet as candy",    font:"#d04060" },
  { id:10, name:"Strawberry",     cat:"🍬 Kawaii",    bg:"#fff4f4", border:"#e05050", accent:"#ff8080", s:["🍓","💖","🍓","✿"], caption:"berry cute ♡",      font:"#c03040" },
  { id:11, name:"Kitty Paws",     cat:"🍬 Kawaii",    bg:"#fff8f8", border:"#e09090", accent:"#ffb8b8", s:["🐱","🐾","🐱","💗"], caption:"nyaa~ ♡",           font:"#c06060" },
  { id:12, name:"Sailor Moon",    cat:"🍬 Kawaii",    bg:"#f8f8ff", border:"#8090e0", accent:"#b0c0f8", s:["🌙","⭐","🌙","💫"], caption:"moon prism power",   font:"#4050a0" },
  { id:13, name:"Cotton Candy",   cat:"🎨 Pastel",    bg:"#fdf0ff", border:"#c090d0", accent:"#e0b0e8", s:["🌈","💗","🌈","✨"], caption:"soft & sweet ♡",    font:"#9060a0" },
  { id:14, name:"Mint Cream",     cat:"🎨 Pastel",    bg:"#f0fff8", border:"#60c0a0", accent:"#90d8b8", s:["🌿","💚","🌿","🍃"], caption:"fresh & minty",     font:"#307050" },
  { id:15, name:"Baby Blue",      cat:"🎨 Pastel",    bg:"#f0f8ff", border:"#7090c0", accent:"#90b0d8", s:["🌊","💙","☁️","🫧"], caption:"serene blue ♡",     font:"#4060a0" },
  { id:16, name:"Peach Sorbet",   cat:"🎨 Pastel",    bg:"#fff8f0", border:"#e09060", accent:"#f0b080", s:["🍑","🌸","🍑","✿"], caption:"peachy keen ♡",     font:"#c06030" },
  { id:17, name:"Lilac Mist",     cat:"🎨 Pastel",    bg:"#f8f0ff", border:"#c0a0e0", accent:"#d8c0f0", s:["💜","🌸","🌷","✨"], caption:"lilac dreams",      font:"#8060b0" },
  { id:18, name:"Butter Yellow",  cat:"🎨 Pastel",    bg:"#fffff0", border:"#d0b000", accent:"#ffe040", s:["🌼","🌟","🌼","☀️"], caption:"sunny & bright",    font:"#906000" },
  { id:19, name:"Vintage Strip",  cat:"📷 Retro",     bg:"#faf5e8", border:"#a08060", accent:"#c0a070", s:["📷","🎞️","📷","🎞️"], caption:"captured forever",   font:"#604020" },
  { id:20, name:"Film Noir",      cat:"📷 Retro",     bg:"#f2f2f2", border:"#404040", accent:"#606060", s:["🎬","⬛","🎬","📽️"], caption:"lights, camera!",   font:"#202020" },
  { id:21, name:"Kodak Moment",   cat:"📷 Retro",     bg:"#fff8e0", border:"#d09010", accent:"#e8b820", s:["📸","🌟","📸","✨"], caption:"a kodak moment",     font:"#805000" },
  { id:22, name:"Disco Fever",    cat:"📷 Retro",     bg:"#f0f0ff", border:"#9070d0", accent:"#c090e8", s:["🪩","✨","🪩","💫"], caption:"disco queen ♡",     font:"#5030a0" },
  { id:23, name:"Pop Art",        cat:"📷 Retro",     bg:"#ffff80", border:"#ff0000", accent:"#ff6000", s:["🟡","🔴","🟡","🔵"], caption:"pop art vibes!",    font:"#800000" },
  { id:24, name:"Retro Pink",     cat:"📷 Retro",     bg:"#ffe8f8", border:"#e04090", accent:"#ff60a0", s:["💋","🌸","💋","✨"], caption:"groovy baby ♡",     font:"#900040" },
  { id:25, name:"Winter Frost",   cat:"❄️ Seasonal",  bg:"#f0f8ff", border:"#7090c0", accent:"#a0c0e0", s:["❄️","⛄","❄️","🌨️"], caption:"frosty & cozy ✿",  font:"#4060a0" },
  { id:26, name:"Summer Breeze",  cat:"❄️ Seasonal",  bg:"#f0fcff", border:"#50b0d0", accent:"#70c8e8", s:["🌊","🌞","🌊","🌴"], caption:"summer lovin' ♡",   font:"#205070" },
  { id:27, name:"Autumn Leaves",  cat:"❄️ Seasonal",  bg:"#fff8e8", border:"#c07020", accent:"#e09040", s:["🍂","🍁","🍂","🍄"], caption:"golden autumn",     font:"#703010" },
  { id:28, name:"Spring Fresh",   cat:"❄️ Seasonal",  bg:"#f4fff0", border:"#60b060", accent:"#80c880", s:["🌱","🌸","🌱","🦋"], caption:"spring is here ♡",  font:"#305030" },
  { id:29, name:"Xmas Magic",     cat:"❄️ Seasonal",  bg:"#fff4f4", border:"#c02020", accent:"#e04040", s:["🎄","🎁","❄️","⭐"], caption:"holiday magic ✿",   font:"#900020" },
  { id:30, name:"Halloween",      cat:"❄️ Seasonal",  bg:"#fff8e8", border:"#906030", accent:"#c08050", s:["🎃","🦇","🎃","🕷️"], caption:"boo! so cute ♡",    font:"#503010" },
  { id:31, name:"Pure White",     cat:"🤍 Minimal",   bg:"#ffffff", border:"#e0e0e0", accent:"#f0f0f0", s:["✦","○","✦","○"],   caption:"simply you ♡",       font:"#888888" },
  { id:32, name:"Gold Foil",      cat:"🤍 Minimal",   bg:"#fffbf0", border:"#c8a800", accent:"#e0c000", s:["✨","◇","✨","◇"],  caption:"golden moment",       font:"#706000" },
  { id:33, name:"Silver Lining",  cat:"🤍 Minimal",   bg:"#f8f8f8", border:"#909090", accent:"#b0b0b0", s:["◈","◇","◈","○"],   caption:"silver lining ✦",     font:"#505050" },
  { id:34, name:"Marble Blush",   cat:"🤍 Minimal",   bg:"#fff8f6", border:"#d0a090", accent:"#e8b8a8", s:["◇","✦","◇","✦"],   caption:"graceful & chic",     font:"#806050" },
  { id:35, name:"Ink & Paper",    cat:"🤍 Minimal",   bg:"#faf8f0", border:"#806040", accent:"#a08060", s:["🖊️","📝","🖊️","✦"], caption:"written in love",    font:"#503020" },
  { id:36, name:"Rainbow",        cat:"🌈 Fun",       bg:"#fff8ff", border:"#c080c0", accent:"#e0a0e0", s:["🌈","☁️","🌈","⭐"], caption:"over the rainbow",   font:"#806090" },
  { id:37, name:"Space Kei",      cat:"🌈 Fun",       bg:"#0a0820", border:"#4040a0", accent:"#6060c0", s:["🚀","⭐","🪐","✨"], caption:"to infinity ✦",      font:"#9090ff" },
  { id:38, name:"Mermaid",        cat:"🌈 Fun",       bg:"#e8f8fc", border:"#3090b0", accent:"#50b0d0", s:["🧜","🐚","🌊","✨"], caption:"ocean dreams ♡",     font:"#105070" },
  { id:39, name:"Magic Girl",     cat:"🌈 Fun",       bg:"#fdf0ff", border:"#c060c0", accent:"#e090d0", s:["🌙","⭐","🔮","✨"], caption:"magical girl ★",      font:"#9030a0" },
  { id:40, name:"Y2K Vibes",      cat:"🌈 Fun",       bg:"#f0fff8", border:"#80a0c0", accent:"#a0c0e0", s:["💿","📱","💿","⚡"], caption:"y2k forever",        font:"#304080" },
  { id:41, name:"Rose Gold",      cat:"💅 Glam",      bg:"#fff8f4", border:"#d09080", accent:"#e8b0a0", s:["🌹","💗","💅","✦"], caption:"rose gold queen",    font:"#905040" },
  { id:42, name:"Amethyst",       cat:"💅 Glam",      bg:"#f8f0ff", border:"#9070c0", accent:"#b090d8", s:["💎","🔮","💎","✨"], caption:"crystal clear ✦",   font:"#6040a0" },
  { id:43, name:"Champagne",      cat:"💅 Glam",      bg:"#fffcf0", border:"#c09848", accent:"#d8b060", s:["🥂","✨","🥂","💫"], caption:"celebrate you ♡",   font:"#806030" },
  { id:44, name:"Holographic",    cat:"💅 Glam",      bg:"#f8f0ff", border:"#a080b0", accent:"#c0a0d0", s:["🦄","🌈","✨","💫"], caption:"holo dream ✦",      font:"#7050a0" },
  { id:45, name:"Black Lace",     cat:"💅 Glam",      bg:"#fdf4f8", border:"#2a1020", accent:"#4a2040", s:["🖤","🌹","🖤","🌹"], caption:"dark romance ♡",    font:"#1a0810" },
  { id:46, name:"Forest Fairy",   cat:"🌿 Nature",    bg:"#f0fff4", border:"#408040", accent:"#60a060", s:["🌿","🦋","🌸","🍃"], caption:"forest fairy ✿",    font:"#204020" },
  { id:47, name:"Ocean Breeze",   cat:"🌿 Nature",    bg:"#e8f8ff", border:"#2080a0", accent:"#40a0c0", s:["🌊","🐚","🌊","🫧"], caption:"ocean child ♡",     font:"#104060" },
  { id:48, name:"Sunset Glow",    cat:"🌿 Nature",    bg:"#fff8f0", border:"#c05020", accent:"#e07040", s:["🌅","🌸","🌅","✨"], caption:"golden hour ♡",      font:"#602010" },
  { id:49, name:"Sakura Park",    cat:"🌿 Nature",    bg:"#fff4f8", border:"#e07090", accent:"#f090b0", s:["🌸","🌸","🌸","🌸"], caption:"sakura forever ♡",  font:"#c04060" },
  { id:50, name:"Moonlit Night",  cat:"🌿 Nature",    bg:"#0e0c24", border:"#4040a0", accent:"#6060c0", s:["🌙","⭐","🌙","💫"], caption:"moonlit dreams ✦",  font:"#8090f0" },
];

// ─── Strip render constants ───────────────────────────────────────────────────
const STRIP = { PAD:20, PHOTO_W:360, PHOTO_H:270, GAP:8, TOP_BAND:56, BOT_BAND:64 };
const STRIP_W = STRIP.PHOTO_W + STRIP.PAD * 2;
const STRIP_H = STRIP.TOP_BAND + (STRIP.PHOTO_H + STRIP.GAP) * 4 - STRIP.GAP + STRIP.BOT_BAND;
const TOTAL = 4;

// ─── Thumbnail SVG generator (42×54) ─────────────────────────────────────────
function makeFrameSVG(f: Frame): string {
  const w = 42, h = 54, { id, bg, border, accent } = f;
  if (id===1) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="1.5"/>${[[5,5],[w-7,5],[5,h-7],[w-7,h-7],[5,h/2],[w-7,h/2],[w/2,4],[w/2,h-4]].map(([x,y])=>`<g transform="translate(${x},${y})"><ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(0)"/><ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(72)"/><ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(144)"/><ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(216)"/><ellipse cx="2" cy="0" rx="2" ry="3" fill="#ffb8d9" transform="rotate(288)"/><circle cx="0" cy="0" r="1.5" fill="#ffe0f0"/></g>`).join('')}</svg>`;
  if (id===2) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="5" y="5" width="32" height="44" rx="2" fill="none" stroke="#c0d090" stroke-width="1" stroke-dasharray="3,2"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>${[[4,4],[38,4],[4,50],[38,50],[4,27],[38,27],[21,4],[21,50]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#e87090"/><circle cx="${x}" cy="${y}" r="1.5" fill="#ffb0c8"/>`).join('')}<path d="M3,12 Q12,9 21,12 Q30,15 39,12" stroke="#80b040" stroke-width="1" fill="none"/><path d="M3,40 Q12,37 21,40 Q30,43 39,40" stroke="#80b040" stroke-width="1" fill="none"/></svg>`;
  if (id===3) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><path d="M0,8 Q10,4 21,8 Q32,12 42,8 L42,0 L0,0 Z" fill="${accent}"/><path d="M0,46 Q10,50 21,46 Q32,42 42,46 L42,54 L0,54 Z" fill="${accent}"/><rect x="2" y="2" width="38" height="50" rx="2" fill="none" stroke="${border}" stroke-width="1.5"/>${[6,14,22,30,38].map(x=>`<circle cx="${x}" cy="27" r="1.5" fill="${border}"/>`).join('')}<text x="21" y="18" text-anchor="middle" font-size="10">💜</text><text x="21" y="44" text-anchor="middle" font-size="8">✨</text></svg>`;
  if (id===4) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/>${Array.from({length:20},(_,i)=>{const a=i*18*Math.PI/180,x1=21+14*Math.cos(a),y1=27+18*Math.sin(a),x2=21+18*Math.cos(a),y2=27+22*Math.sin(a);return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e0b800" stroke-width="1.5"/>`;}).join('')}<rect x="4" y="5" width="34" height="44" rx="2" fill="${bg}" stroke="${border}" stroke-width="2"/><text x="21" y="30" text-anchor="middle" font-size="14">🌻</text></svg>`;
  if (id===5) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="40" width="${w}" height="14" rx="0" fill="#c8f090"/><rect x="0" y="38" width="${w}" height="4" fill="#90d060"/>${[4,10,16,22,28,34,40].map(x=>`<rect x="${x}" y="30" width="2" height="10" fill="#60a030"/>`).join('')}<rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="24" text-anchor="middle" font-size="12">🌼</text><text x="9" y="39" text-anchor="middle" font-size="8">🌸</text><text x="33" y="39" text-anchor="middle" font-size="8">🌸</text></svg>`;
  if (id===6) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="4" y="4" width="34" height="46" rx="3" fill="none" stroke="${border}" stroke-width="2"/><rect x="4" y="4" width="34" height="8" rx="2" fill="${accent}"/><rect x="4" y="42" width="34" height="8" rx="2" fill="${accent}"/>${[[5,5],[37,5],[5,49],[37,49]].map(([x,y])=>`<text x="${x}" y="${y+4}" text-anchor="middle" font-size="8">🎀</text>`).join('')}<text x="21" y="32" text-anchor="middle" font-size="12">💖</text></svg>`;
  if (id===7) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><ellipse cx="10" cy="6" rx="5" ry="10" fill="#e0d0ff"/><ellipse cx="10" cy="6" rx="3" ry="7" fill="#ffb0d0"/><ellipse cx="32" cy="6" rx="5" ry="10" fill="#e0d0ff"/><ellipse cx="32" cy="6" rx="3" ry="7" fill="#ffb0d0"/><rect x="4" y="10" width="34" height="40" rx="3" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="34" text-anchor="middle" font-size="12">🐰</text></svg>`;
  if (id===8) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/>${[[5,5],[37,5],[5,49],[37,49]].map(([cx,cy])=>{const pts=Array.from({length:5},(_,i)=>{const a=(i*72-90)*Math.PI/180,b=(i*72-54)*Math.PI/180;return `${cx+8*Math.cos(a)},${cy+8*Math.sin(a)} ${cx+4*Math.cos(b)},${cy+4*Math.sin(b)}`;}).join(' ');return `<polygon points="${pts}" fill="#e0c000"/>`;}).join('')}<rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="1.5" stroke-dasharray="4,3"/><text x="21" y="32" text-anchor="middle" font-size="12">⭐</text></svg>`;
  if (id===9) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="candy${id}" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="8" fill="#ff80a0"/><rect x="4" width="4" height="8" fill="#fff"/></pattern></defs><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="6" height="${h}" fill="url(#candy${id})"/><rect x="${w-6}" y="0" width="6" height="${h}" fill="url(#candy${id})"/><rect x="6" y="0" width="${w-12}" height="6" fill="url(#candy${id})"/><rect x="6" y="${h-6}" width="${w-12}" height="6" fill="url(#candy${id})"/><rect x="3" y="3" width="36" height="48" rx="2" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="32" text-anchor="middle" font-size="12">🍬</text></svg>`;
  if (id===10) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dots${id}" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2" fill="#ff8080" opacity="0.5"/></pattern></defs><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="7" height="${h}" fill="url(#dots${id})"/><rect x="${w-7}" y="0" width="7" height="${h}" fill="url(#dots${id})"/><rect x="7" y="0" width="${w-14}" height="7" fill="url(#dots${id})"/><rect x="7" y="${h-7}" width="${w-14}" height="7" fill="url(#dots${id})"/><rect x="3" y="3" width="36" height="48" rx="2" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="32" text-anchor="middle" font-size="12">🍓</text></svg>`;
  if (id===11) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>${[[5,12],[37,12],[5,42],[37,42],[21,5],[21,49]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="3" ry="2.5" fill="${accent}"/><circle cx="${x-2}" cy="${y-3}" r="1.2" fill="${accent}"/><circle cx="${x+2}" cy="${y-3}" r="1.2" fill="${accent}"/><circle cx="${x}" cy="${y-4}" r="1.2" fill="${accent}"/>`).join('')}<text x="21" y="31" text-anchor="middle" font-size="10">🐱</text></svg>`;
  if (id===12) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="stars${id}" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><text x="5" y="8" text-anchor="middle" font-size="6">⭐</text></pattern></defs><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="url(#stars${id})" opacity="0.3"/><rect x="5" y="5" width="32" height="44" rx="2" fill="${bg}"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="32" text-anchor="middle" font-size="14">🌙</text></svg>`;
  if (id===13) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ccg${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffd0f8"/><stop offset="50%" stop-color="#d0f0ff"/><stop offset="100%" stop-color="#f0ffd0"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#ccg${id})"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/><path d="M0,20 Q21,10 42,20" stroke="white" stroke-width="3" fill="none" opacity="0.6"/><path d="M0,35 Q21,25 42,35" stroke="white" stroke-width="3" fill="none" opacity="0.6"/><text x="21" y="32" text-anchor="middle" font-size="12">🌈</text></svg>`;
  if (id===14) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>${[0,8,16,24,32,40,48].map((y,i)=>`<path d="M${i%2===0?3:0},${y+3} Q${i%2===0?-2:8},${y+7} ${i%2===0?3:0},${y+11}" fill="#80d0b0"/><path d="M${i%2===0?39:42},${y+3} Q${i%2===0?47:37},${y+7} ${i%2===0?39:42},${y+11}" fill="#80d0b0"/>`).join('')}<text x="21" y="31" text-anchor="middle" font-size="10">🌿</text></svg>`;
  if (id===15) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="4" y="4" width="34" height="46" rx="3" fill="none" stroke="${border}" stroke-width="1.5"/>${[[5,6],[37,6],[5,50],[37,50]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="white" opacity="0.8"/><ellipse cx="${x-2}" cy="${y+1}" rx="3" ry="2.5" fill="white" opacity="0.8"/><ellipse cx="${x+2}" cy="${y+1}" rx="3" ry="2.5" fill="white" opacity="0.8"/>`).join('')}<text x="21" y="32" text-anchor="middle" font-size="12">☁️</text></svg>`;
  if (id===16) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><path d="M4,4 Q10,0 16,4 Q22,8 28,4 Q34,0 40,4 L40,50 Q34,54 28,50 Q22,46 16,50 Q10,54 4,50 Z" fill="none" stroke="${border}" stroke-width="2"/><rect x="6" y="8" width="30" height="38" rx="2" fill="white" opacity="0.4"/><text x="21" y="32" text-anchor="middle" font-size="12">🍑</text></svg>`;
  if (id===17) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="lg${id}" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1" fill="${border}" opacity="0.5"/></pattern></defs><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="8" height="${h}" fill="url(#lg${id})"/><rect x="${w-8}" y="0" width="8" height="${h}" fill="url(#lg${id})"/><rect x="8" y="0" width="${w-16}" height="8" fill="url(#lg${id})"/><rect x="8" y="${h-8}" width="${w-16}" height="8" fill="url(#lg${id})"/><rect x="8" y="8" width="26" height="38" fill="${bg}"/><text x="21" y="32" text-anchor="middle" font-size="11">💜</text></svg>`;
  if (id===18) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="2.5"/><path d="M4,4 L11,4 L14,10 L11,16 L4,16 Z" fill="${accent}" stroke="${border}" stroke-width="0.5"/><path d="M38,4 L31,4 L28,10 L31,16 L38,16 Z" fill="${accent}" stroke="${border}" stroke-width="0.5"/><path d="M4,50 L11,50 L14,44 L11,38 L4,38 Z" fill="${accent}" stroke="${border}" stroke-width="0.5"/><path d="M38,50 L31,50 L28,44 L31,38 L38,38 Z" fill="${accent}" stroke="${border}" stroke-width="0.5"/><text x="21" y="32" text-anchor="middle" font-size="12">🌼</text></svg>`;
  if (id===19) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="2" fill="#1a1008"/>${[4,12,20,28,36,44].map(y=>`<rect x="2" y="${y}" width="5" height="5" rx="1" fill="#333"/><rect x="${w-7}" y="${y}" width="5" height="5" rx="1" fill="#333"/>`).join('')}<rect x="9" y="3" width="24" height="48" rx="1" fill="${bg}"/><rect x="9" y="3" width="24" height="48" rx="1" fill="none" stroke="${border}" stroke-width="1"/><text x="21" y="31" text-anchor="middle" font-size="10">📷</text></svg>`;
  if (id===20) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="checker${id}" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="#222"/><rect x="3" y="3" width="3" height="3" fill="#222"/><rect x="3" y="0" width="3" height="3" fill="#eee"/><rect x="0" y="3" width="3" height="3" fill="#eee"/></pattern></defs><rect width="${w}" height="${h}" rx="3" fill="url(#checker${id})"/><rect x="5" y="5" width="32" height="44" rx="2" fill="#f2f2f2"/><rect x="5" y="5" width="32" height="44" rx="2" fill="none" stroke="#404040" stroke-width="2"/><text x="21" y="31" text-anchor="middle" font-size="10">🎬</text></svg>`;
  if (id===21) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="${w}" height="10" rx="2" fill="#e8b820"/><rect x="0" y="${h-10}" width="${w}" height="10" rx="2" fill="#e8b820"/><rect x="3" y="10" width="36" height="34" fill="${bg}"/><rect x="2" y="2" width="38" height="50" rx="2" fill="none" stroke="#d09010" stroke-width="1.5"/><text x="21" y="32" text-anchor="middle" font-size="12">📸</text></svg>`;
  if (id===22) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="#f0f0ff"/><polygon points="0,0 12,0 0,12" fill="#c090f0"/><polygon points="${w},0 ${w-12},0 ${w},12" fill="#c090f0"/><polygon points="0,${h} 12,${h} 0,${h-12}" fill="#c090f0"/><polygon points="${w},${h} ${w-12},${h} ${w},${h-12}" fill="#c090f0"/><rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="1.5"/><text x="21" y="32" text-anchor="middle" font-size="12">🪩</text></svg>`;
  if (id===23) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="half${id}" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#ff0000" opacity="0.4"/></pattern></defs><rect width="${w}" height="${h}" rx="0" fill="#ffff80"/><rect x="0" y="0" width="${w}" height="${h}" fill="url(#half${id})"/><rect x="5" y="5" width="32" height="44" rx="0" fill="white" stroke="#ff0000" stroke-width="3"/><text x="21" y="30" text-anchor="middle" font-size="10" font-weight="bold" fill="#ff0000">POP</text><text x="21" y="42" text-anchor="middle" font-size="8">ART!</text></svg>`;
  if (id===24) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><circle cx="5" cy="5" r="8" fill="none" stroke="${border}" stroke-width="1.5"/><circle cx="${w-5}" cy="5" r="8" fill="none" stroke="${border}" stroke-width="1.5"/><circle cx="5" cy="${h-5}" r="8" fill="none" stroke="${border}" stroke-width="1.5"/><circle cx="${w-5}" cy="${h-5}" r="8" fill="none" stroke="${border}" stroke-width="1.5"/><rect x="4" y="4" width="34" height="46" rx="2" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="32" text-anchor="middle" font-size="11">💋</text></svg>`;
  if (id===25) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="snow${id}" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><text x="5" y="8" text-anchor="middle" font-size="6" opacity="0.25">❄</text></pattern></defs><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="${w}" height="${h}" fill="url(#snow${id})"/><rect x="5" y="5" width="32" height="44" rx="2" fill="rgba(255,255,255,0.7)"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>${[[5,5],[37,5],[5,49],[37,49]].map(([x,y])=>`<text x="${x}" y="${y+5}" text-anchor="middle" font-size="9">❄️</text>`).join('')}<text x="21" y="32" text-anchor="middle" font-size="10">⛄</text></svg>`;
  if (id===26) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sky${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87ceeb"/><stop offset="100%" stop-color="#70c8e8"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#sky${id})"/><rect x="0" y="36" width="${w}" height="18" rx="2" fill="#1a9050"/><path d="M0,34 Q10,30 21,34 Q32,38 42,34 L42,38 Q32,42 21,38 Q10,34 0,38 Z" fill="#50b0d0"/><circle cx="32" cy="10" r="6" fill="#ffe040"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="1.5"/><text x="11" y="26" text-anchor="middle" font-size="10">🌊</text></svg>`;
  if (id===27) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>${[[5,5,'🍁'],[37,5,'🍂'],[5,49,'🍂'],[37,49,'🍁'],[5,27,'🍁'],[37,27,'🍂'],[21,4,'🍄'],[21,50,'🍁']].map(([x,y,e])=>`<text x="${x}" y="${(y as number)+4}" text-anchor="middle" font-size="9">${e}</text>`).join('')}<text x="21" y="32" text-anchor="middle" font-size="12">🍂</text></svg>`;
  if (id===28) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><path d="M3,54 Q3,40 8,30 Q14,18 8,6 Q5,0 3,0" stroke="#60b060" stroke-width="2" fill="none"/><path d="M39,54 Q39,40 34,30 Q28,18 34,6 Q37,0 39,0" stroke="#60b060" stroke-width="2" fill="none"/>${[10,20,30,40].map(y=>`<ellipse cx="10" cy="${y}" rx="4" ry="6" fill="#90d060" transform="rotate(-20 10 ${y})"/><ellipse cx="32" cy="${y+5}" rx="4" ry="6" fill="#90d060" transform="rotate(20 32 ${y+5})"/>`).join('')}<rect x="7" y="4" width="28" height="46" rx="2" fill="${bg}" opacity="0.7"/><text x="21" y="30" text-anchor="middle" font-size="12">🌱</text><text x="21" y="44" text-anchor="middle" font-size="8">🦋</text></svg>`;
  if (id===29) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="#c02020"/><rect x="4" y="4" width="34" height="46" rx="2" fill="white"/><rect x="4" y="4" width="34" height="8" rx="2" fill="#e04040"/><rect x="4" y="42" width="34" height="8" rx="2" fill="#e04040"/><text x="21" y="14" text-anchor="middle" font-size="7" fill="white">⭐⭐⭐</text><text x="21" y="32" text-anchor="middle" font-size="14">🎄</text><text x="21" y="46" text-anchor="middle" font-size="7" fill="white">🎁 🎁</text></svg>`;
  if (id===30) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="#1a0a00"/><g stroke="#666" stroke-width="0.5" fill="none"><line x1="0" y1="0" x2="12" y2="12"/><line x1="6" y1="0" x2="12" y2="6"/><line x1="0" y1="6" x2="6" y2="12"/><path d="M2,2 Q7,2 7,7"/><path d="M4,0 Q10,0 10,6"/></g><rect x="5" y="5" width="32" height="44" rx="2" fill="#fff8e8"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="1.5"/><text x="21" y="28" text-anchor="middle" font-size="12">🎃</text><text x="21" y="42" text-anchor="middle" font-size="10">🦇</text></svg>`;
  if (id===31) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}" stroke="${border}" stroke-width="2"/><rect x="5" y="5" width="32" height="44" rx="2" fill="none" stroke="${accent}" stroke-width="1"/><text x="21" y="32" text-anchor="middle" font-size="12">✦</text></svg>`;
  if (id===32) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gold${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8d060"/><stop offset="50%" stop-color="#fff0a0"/><stop offset="100%" stop-color="#c0a000"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="none" stroke="url(#gold${id})" stroke-width="4"/><text x="21" y="32" text-anchor="middle" font-size="14">✨</text></svg>`;
  if (id===33) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}" stroke="${border}" stroke-width="3"/><rect x="5" y="5" width="32" height="44" rx="2" fill="none" stroke="${accent}" stroke-width="1"/><text x="21" y="32" text-anchor="middle" font-size="12">◈</text></svg>`;
  if (id===34) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="32" text-anchor="middle" font-size="12">◇</text></svg>`;
  if (id===35) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="3" y="3" width="36" height="48" rx="2" fill="none" stroke="${border}" stroke-width="2" stroke-dasharray="6,3"/><text x="21" y="28" text-anchor="middle" font-size="11">🖊️</text><text x="21" y="42" text-anchor="middle" font-size="8">📝</text></svg>`;
  if (id===36) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rb${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ff8080"/><stop offset="20%" stop-color="#ffb060"/><stop offset="40%" stop-color="#ffff60"/><stop offset="60%" stop-color="#60ff60"/><stop offset="80%" stop-color="#6060ff"/><stop offset="100%" stop-color="#c060ff"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="5" height="${h}" rx="2" fill="url(#rb${id})"/><rect x="${w-5}" y="0" width="5" height="${h}" rx="2" fill="url(#rb${id})"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="1.5"/><text x="21" y="32" text-anchor="middle" font-size="12">🌈</text></svg>`;
  if (id===37) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="#0a0820"/>${Array.from({length:20},(_,i)=>{const x=(i*13+3)%42,y=(i*17+3)%54;return `<circle cx="${x}" cy="${y}" r="${i%4===0?1.5:0.7}" fill="white" opacity="${0.3+i%5*0.1}"/>`;}).join('')}<rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="#4040a0" stroke-width="1.5"/><text x="21" y="32" text-anchor="middle" font-size="12">🚀</text></svg>`;
  if (id===38) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="scales${id}" x="0" y="0" width="8" height="7" patternUnits="userSpaceOnUse"><path d="M0,7 Q4,0 8,7" fill="none" stroke="#3090b0" stroke-width="0.8" opacity="0.4"/><path d="M-4,3.5 Q0,-3.5 4,3.5" fill="none" stroke="#3090b0" stroke-width="0.8" opacity="0.4"/></pattern></defs><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="${w}" height="${h}" fill="url(#scales${id})"/><rect x="5" y="5" width="32" height="44" rx="2" fill="${bg}" opacity="0.8"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="30" text-anchor="middle" font-size="12">🧜</text><text x="21" y="44" text-anchor="middle" font-size="8">🐚</text></svg>`;
  if (id===39) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/>${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return `<line x1="${21+18*Math.cos(a)}" y1="${27+18*Math.sin(a)}" x2="${21+22*Math.cos(a)}" y2="${27+22*Math.sin(a)}" stroke="${border}" stroke-width="1" opacity="0.5"/>`;}).join('')}<rect x="4" y="4" width="34" height="46" rx="3" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="26" text-anchor="middle" font-size="12">🔮</text><text x="21" y="40" text-anchor="middle" font-size="9">✨  ⭐</text></svg>`;
  if (id===40) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="chrome${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#a0c0e0"/><stop offset="50%" stop-color="#e0f0ff"/><stop offset="100%" stop-color="#80a0c0"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="0" width="10" height="${h}" fill="url(#chrome${id})" opacity="0.7"/><rect x="${w-10}" y="0" width="10" height="${h}" fill="url(#chrome${id})" opacity="0.7"/><rect x="10" y="0" width="${w-20}" height="8" fill="url(#chrome${id})" opacity="0.7"/><rect x="10" y="${h-8}" width="${w-20}" height="8" fill="url(#chrome${id})" opacity="0.7"/><rect x="10" y="8" width="22" height="38" fill="${bg}"/><text x="21" y="26" text-anchor="middle" font-size="9">💿</text><text x="21" y="38" text-anchor="middle" font-size="7">Y2K ⚡</text></svg>`;
  if (id===41) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rg${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f0c0b0"/><stop offset="50%" stop-color="#ffd8c8"/><stop offset="100%" stop-color="#d09080"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#rg${id})"/><rect x="5" y="5" width="32" height="44" rx="2" fill="white" opacity="0.5"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="#d09080" stroke-width="2.5"/>${[[5,5],[37,5],[5,49],[37,49]].map(([x,y])=>`<polygon points="${x},${y-3} ${x+2},${y} ${x},${y+3} ${x-2},${y}" fill="#d09080"/>`).join('')}<text x="21" y="32" text-anchor="middle" font-size="12">🌹</text></svg>`;
  if (id===42) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ameth${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#c0a0f0"/><stop offset="100%" stop-color="#8060c0"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#ameth${id})"/><rect x="5" y="5" width="32" height="44" rx="2" fill="#f8f0ff" opacity="0.8"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="#9070c0" stroke-width="2"/>${[[5,5],[37,5],[5,49],[37,49]].map(([x,y])=>`<polygon points="${x},${y-4} ${x+3},${y} ${x},${y+4} ${x-3},${y}" fill="#c090e0"/>`).join('')}<text x="21" y="32" text-anchor="middle" font-size="12">💎</text></svg>`;
  if (id===43) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="champ${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#e8d080"/><stop offset="100%" stop-color="#c09040"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="#fffcf0"/><rect x="0" y="0" width="6" height="${h}" rx="2" fill="url(#champ${id})" opacity="0.6"/><rect x="${w-6}" y="0" width="6" height="${h}" rx="2" fill="url(#champ${id})" opacity="0.6"/><rect x="6" y="0" width="${w-12}" height="6" fill="url(#champ${id})" opacity="0.6"/><rect x="6" y="${h-6}" width="${w-12}" height="6" fill="url(#champ${id})" opacity="0.6"/><rect x="6" y="6" width="30" height="42" fill="#fffcf0"/><text x="21" y="32" text-anchor="middle" font-size="12">🥂</text></svg>`;
  if (id===44) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="holo${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffb0e0"/><stop offset="25%" stop-color="#b0e0ff"/><stop offset="50%" stop-color="#ffe0b0"/><stop offset="75%" stop-color="#b0ffb0"/><stop offset="100%" stop-color="#e0b0ff"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#holo${id})" opacity="0.8"/><rect x="5" y="5" width="32" height="44" rx="2" fill="white" opacity="0.4"/><rect x="2" y="2" width="38" height="50" rx="3" fill="none" stroke="url(#holo${id})" stroke-width="3"/><text x="21" y="32" text-anchor="middle" font-size="12">🦄</text></svg>`;
  if (id===45) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="lace${id}" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2" fill="none" stroke="#2a1020" stroke-width="0.5"/><circle cx="0" cy="0" r="1" fill="#2a1020" opacity="0.5"/><circle cx="8" cy="0" r="1" fill="#2a1020" opacity="0.5"/><circle cx="0" cy="8" r="1" fill="#2a1020" opacity="0.5"/><circle cx="8" cy="8" r="1" fill="#2a1020" opacity="0.5"/></pattern></defs><rect width="${w}" height="${h}" rx="3" fill="#fdf4f8"/><rect x="0" y="0" width="7" height="${h}" fill="url(#lace${id})"/><rect x="${w-7}" y="0" width="7" height="${h}" fill="url(#lace${id})"/><rect x="7" y="0" width="${w-14}" height="7" fill="url(#lace${id})"/><rect x="7" y="${h-7}" width="${w-14}" height="7" fill="url(#lace${id})"/><rect x="7" y="7" width="28" height="40" fill="#fdf4f8"/><text x="21" y="28" text-anchor="middle" font-size="11">🖤</text><text x="21" y="42" text-anchor="middle" font-size="9">🌹</text></svg>`;
  if (id===46) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="0" y="${h-14}" width="${w}" height="14" rx="2" fill="#90d060"/>${[3,10,17,24,31,38].map(x=>`<polygon points="${x},${h-14} ${x+3},${h-22} ${x+6},${h-14}" fill="#408040"/>`).join('')}<rect x="3" y="3" width="36" height="${h-16}" rx="3" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="26" text-anchor="middle" font-size="11">🌿</text><text x="10" y="40" text-anchor="middle" font-size="8">🍄</text><text x="32" y="40" text-anchor="middle" font-size="8">🦋</text></svg>`;
  if (id===47) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ocean${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87ceeb"/><stop offset="100%" stop-color="#1a6090"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#ocean${id})"/>${[10,20,30,40].map(y=>`<path d="M0,${y} Q10,${y-4} 21,${y} Q32,${y+4} 42,${y}" stroke="white" stroke-width="1" fill="none" opacity="0.4"/>`).join('')}<rect x="5" y="5" width="32" height="44" rx="2" fill="rgba(255,255,255,0.15)"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/><text x="21" y="30" text-anchor="middle" font-size="12">🌊</text><text x="21" y="44" text-anchor="middle" font-size="8">🐚</text></svg>`;
  if (id===48) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sunset${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ff9060"/><stop offset="40%" stop-color="#ffb060"/><stop offset="70%" stop-color="#ff6040"/><stop offset="100%" stop-color="#c03020"/></linearGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#sunset${id})"/><rect x="0" y="${h-12}" width="${w}" height="12" rx="2" fill="#1a3010"/>${[0,8,16,24,32].map(x=>`<polygon points="${x},${h-12} ${x+4},${h-20} ${x+8},${h-12}" fill="#2a5020"/>`).join('')}<rect x="4" y="4" width="34" height="${h-18}" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"/><circle cx="21" cy="18" r="8" fill="#ffe060" opacity="0.7"/><text x="21" y="40" text-anchor="middle" font-size="10">🌅</text></svg>`;
  if (id===49) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="${border}" stroke-width="2"/>${Array.from({length:14},(_,i)=>{const x=(i*13+5)%36+3,y=(i*17+8)%46+3;return `<g transform="translate(${x},${y}) rotate(${i*25})"><ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8"/><ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8" transform="rotate(72)"/><ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8" transform="rotate(144)"/><ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8" transform="rotate(216)"/><ellipse cx="2" cy="0" rx="2" ry="3.5" fill="#ffb0d0" opacity="0.8" transform="rotate(288)"/><circle r="1.5" fill="#ffe0f0"/></g>`;}).join('')}</svg>`;
  if (id===50) return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="#0e0c24"/>${Array.from({length:35},(_,i)=>{const x=(i*13+3)%40,y=(i*17+3)%52;return `<circle cx="${x}" cy="${y}" r="${i%5===0?1.5:0.7}" fill="white" opacity="${0.3+i%5*0.15}"/>`;}).join('')}<path d="M28,8 Q22,14 22,20 Q22,28 30,30 Q20,32 14,26 Q10,20 14,14 Q18,8 28,8 Z" fill="#e0e080" opacity="0.85"/><rect x="3" y="3" width="36" height="48" rx="3" fill="none" stroke="#4040a0" stroke-width="1.5"/><text x="21" y="48" text-anchor="middle" font-size="9" fill="#8090f0">✦ dream ✦</text></svg>`;
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="3" fill="${bg}" stroke="${border}" stroke-width="2"/><text x="${w/2}" y="${h/2+4}" text-anchor="middle" font-size="14">${f.s[0]}</text></svg>`;
}

// ─── Full-size frame SVG overlay ──────────────────────────────────────────────
function makeFrameSVGFull(f: Frame, W: number, H: number, PAD: number, PHOTO_W: number, PHOTO_H: number, GAP: number): string {
  const { id, bg: _bg, border, accent } = f;
  const TOP_BAND = STRIP.TOP_BAND;
  const TOTAL_LOCAL = 4;

  const photoHoles = Array.from({length: TOTAL_LOCAL}, (_, i) => {
    const py = TOP_BAND + i * (PHOTO_H + GAP);
    return `<rect x="${PAD}" y="${py}" width="${PHOTO_W}" height="${PHOTO_H}"/>`;
  }).join('');
  const borderClipId = `borderClip_${id}`;
  const borderClipDef = `<clipPath id="${borderClipId}" clipPathUnits="userSpaceOnUse">
    <path fill-rule="evenodd" d="M0,0 L${W},0 L${W},${H} L0,${H} Z ${Array.from({length: TOTAL_LOCAL}, (_, i) => { const py = TOP_BAND + i * (PHOTO_H + GAP); return `M${PAD},${py} L${PAD+PHOTO_W},${py} L${PAD+PHOTO_W},${py+PHOTO_H} L${PAD},${py+PHOTO_H} Z`; }).join(' ')}"/>
  </clipPath>`;

  let frameBg = ``;
  let frameOverlay = '';

  if (id===1) {
    const pp: number[][] = [];
    for(let i=0;i<28;i++){pp.push([PAD*0.4,(H/27)*i]);pp.push([W-PAD*0.4,(H/27)*i]);}
    for(let i=0;i<18;i++){pp.push([(W/17)*i,PAD*0.4]);pp.push([(W/17)*i,H-PAD*0.4]);}
    const petals=pp.map(([px,py],idx)=>{const rot=idx*37;return `<g transform="translate(${px},${py}) rotate(${rot})"><ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75"/><ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75" transform="rotate(72 0 0)"/><ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75" transform="rotate(144 0 0)"/><ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75" transform="rotate(216 0 0)"/><ellipse cx="4" cy="0" rx="4" ry="7" fill="#ffb8d9" opacity="0.75" transform="rotate(288 0 0)"/><circle r="3" fill="#ffe0f0"/></g>`;}).join('');
    frameOverlay=`${petals}<rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id===2) {
    const corners=[[PAD,PAD],[W-PAD,PAD],[PAD,H-PAD],[W-PAD,H-PAD]];
    const roses=corners.map(([cx,cy])=>`<g transform="translate(${cx},${cy})"><circle r="12" fill="#e87090" opacity="0.85"/><circle r="8" fill="#ff9ab0"/><circle r="5" fill="#ffb8c8"/><circle r="2.5" fill="#ffe0e8"/></g>`).join('');
    frameOverlay=`${roses}<rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="6" fill="none" stroke="${border}" stroke-width="5"/>`;
  } else if (id===3) {
    frameOverlay=`<path d="M0,${PAD} Q${W*0.25},${PAD-10} ${W*0.5},${PAD} Q${W*0.75},${PAD+10} ${W},${PAD} L${W},0 L0,0 Z" fill="${accent}"/><path d="M0,${H-PAD} Q${W*0.25},${H-PAD-10} ${W*0.5},${H-PAD} Q${W*0.75},${H-PAD+10} ${W},${H-PAD} L${W},${H} L0,${H} Z" fill="${accent}"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="8" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id===6) {
    const corners=[[PAD*0.4,PAD*0.4],[W-PAD*0.4,PAD*0.4],[PAD*0.4,H-PAD*0.4],[W-PAD*0.4,H-PAD*0.4]];
    const bows=corners.map(([cx,cy])=>`<text x="${cx}" y="${cy+8}" text-anchor="middle" font-size="28">🎀</text>`).join('');
    frameOverlay=`<rect x="0" y="0" width="${W}" height="${PAD*1.2}" rx="4" fill="${accent}"/><rect x="0" y="${H-PAD*1.2}" width="${W}" height="${PAD*1.2}" rx="4" fill="${accent}"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>${bows}`;
  } else {
    frameOverlay=`<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="6" fill="none" stroke="${border}" stroke-width="4"/>`;
  }

  const stickerRow=`<text x="${PAD*1.2}" y="${PAD*2.2}" font-size="28" font-family="serif">${f.s[0]}</text><text x="${W-PAD*1.2}" y="${PAD*2.2}" text-anchor="end" font-size="28" font-family="serif">${f.s[1]}</text><text x="${PAD*1.2}" y="${H-PAD*0.6}" font-size="28" font-family="serif">${f.s[2]}</text><text x="${W-PAD*1.2}" y="${H-PAD*0.6}" text-anchor="end" font-size="28" font-family="serif">${f.s[3]}</text>`;
  const defsRegex=/<defs>([\s\S]*?)<\/defs>/g;
  let embeddedDefs='';
  const cleanFrameBg=frameBg.replace(defsRegex,(_,d)=>{embeddedDefs+=d;return '';});
  const cleanFrameOverlay=frameOverlay.replace(defsRegex,(_,d)=>{embeddedDefs+=d;return '';});

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>${borderClipDef}${embeddedDefs}</defs>
    ${cleanFrameBg}
    <g clip-path="url(#${borderClipId})">${cleanFrameOverlay}</g>
    ${stickerRow}
  </svg>`;
}

// ─── Canvas render ────────────────────────────────────────────────────────────
async function renderStripToCanvas(canvas: HTMLCanvasElement, f: Frame, photoDataUrls: string[], scale: number) {
  const { PAD, PHOTO_W, PHOTO_H, GAP, TOP_BAND } = STRIP;
  const W = STRIP_W, H = STRIP_H;
  canvas.width  = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
  const ctx = canvas.getContext('2d')!;
  ctx.scale(scale, scale);
  ctx.fillStyle = f.bg;
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < TOTAL; i++) {
    if (!photoDataUrls[i]) continue;
    const img = new Image();
    img.src = photoDataUrls[i];
    await new Promise<void>(r => { img.onload = () => r(); img.onerror = () => r(); });
    const y = TOP_BAND + i * (PHOTO_H + GAP);
    ctx.drawImage(img, PAD, y, PHOTO_W, PHOTO_H);
  }
  const svgStr = makeFrameSVGFull(f, W, H, PAD, PHOTO_W, PHOTO_H, GAP);
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const fImg = new Image();
  await new Promise<void>((res, rej) => { fImg.onload = () => res(); fImg.onerror = () => rej(); fImg.src = url; });
  ctx.drawImage(fImg, 0, 0, W, H);
  URL.revokeObjectURL(url);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SiteHeader({ navOpen, onToggleNav }: { navOpen: boolean; onToggleNav: () => void }) {
  return (
    <header className="bs-header">
      <span className="bs-cloud-puff bs-cloud-puff-1" aria-hidden="true" />
      <span className="bs-cloud-puff bs-cloud-puff-2" aria-hidden="true" />
      <span className="bs-cloud-puff bs-cloud-puff-3" aria-hidden="true" />
      <a href="/" className="bs-logo">
        <span className="bs-logo-top"><span>🎀</span> photobooth <span>🎀</span></span>
        <span className="bs-logo-bottom">kawaii</span>
      </a>
      <nav className={`bs-site-nav${navOpen ? ' open' : ''}`} aria-label="Main">
        <ul className="bs-nav-main">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/photobooth" className="active" aria-current="page">Photobooth</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </nav>
      <span className="bs-header-bow" aria-hidden="true">🎀</span>
      <button
        className={`bs-hamburger${navOpen ? ' open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={navOpen}
        onClick={onToggleNav}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}

function GrassStrip() {
  return (
    <div className="bs-grass-strip" aria-hidden="true">
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="68" width="1440" height="42" fill="#8fd44e"/>
        <g fill="#4a8c1c">
          {Array.from({length: 134}, (_, i) => {
            const base = i * 12;
            const tip = base + 6;
            const end = base + 12;
            const h = [0,4,8,2,10,6,12,0,4,8,2,10][i%12];
            return <polygon key={i} points={`${base},70 ${tip},${h} ${end},70`}/>;
          })}
        </g>
        <g fill="#5fad28">
          {[5,17,29,53,77,101,137,173,209,257,305,365,425,497,557,617,677,749,809,869,929,1001,1061,1121,1181,1253,1313,1373,1433].map((x,i) => {
            const tips = [14,6,18,8,20,4,16,6,20,8,14,4,14,8,20,6,16,4,20,8,14,6,18,4,20,8,16,4,14];
            return <polygon key={i} points={`${x},70 ${x+8},${tips[i]} ${x+16},70`}/>;
          })}
        </g>
        <g fontSize="15" textAnchor="middle" fontFamily="serif">
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
  );
}

function Butterflies() {
  const bflies = [
    { bxDur:'22s', bxDelay:'0s',   byDur:'3.0s', byDelay:'0s',  flapDur:'.32s', flapDelay:'0s',   bottom:'100px', tilt:'-5deg' },
    { bxDur:'17s', bxDelay:'-5s',  byDur:'2.6s', byDelay:'.4s', flapDur:'.28s', flapDelay:'.1s',  bottom:'130px', tilt:'4deg'  },
    { bxDur:'25s', bxDelay:'-10s', byDur:'3.4s', byDelay:'.8s', flapDur:'.36s', flapDelay:'.05s', bottom:'115px', tilt:'-8deg' },
    { bxDur:'19s', bxDelay:'-3s',  byDur:'2.8s', byDelay:'.2s', flapDur:'.30s', flapDelay:'.15s', bottom:'145px', tilt:'6deg'  },
    { bxDur:'28s', bxDelay:'-14s', byDur:'3.8s', byDelay:'1s',  flapDur:'.40s', flapDelay:'0s',   bottom:'105px', tilt:'-3deg' },
    { bxDur:'15s', bxDelay:'-7s',  byDur:'2.4s', byDelay:'.6s', flapDur:'.26s', flapDelay:'.2s',  bottom:'160px', tilt:'9deg'  },
  ];
  return (
    <>
      {bflies.map((b, i) => (
        <span
          key={i}
          className="bs-butterfly"
          aria-hidden="true"
          style={{
            ['--bx-dur' as string]: b.bxDur,
            ['--bx-delay' as string]: b.bxDelay,
            ['--by-dur' as string]: b.byDur,
            ['--by-delay' as string]: b.byDelay,
            ['--flap-dur' as string]: b.flapDur,
            ['--flap-delay' as string]: b.flapDelay,
            ['--bf-bottom' as string]: b.bottom,
            ['--tilt' as string]: b.tilt,
          }}
        >🦋</span>
      ))}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BoothStrip() {
  const [navOpen, setNavOpen] = useState(false);
  const [step, setStep] = useState<'camera' | 'studio'>('camera');
  const [photos, setPhotos] = useState<string[]>([]);
  const [shotIndex, setShotIndex] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const [countNum, setCountNum] = useState('');
  const [countShow, setCountShow] = useState(false);
  const [flashPop, setFlashPop] = useState(false);
  const [showNextMsg, setShowNextMsg] = useState(false);
  const [camError, setCamError] = useState('');
  const [btnReady, setBtnReady] = useState(true); // disabled=true initially
  const [currentFrame, setCurrentFrame] = useState<Frame>(FRAMES[0]);
  const [shotStatus, setShotStatus] = useState('Photo 1 of 4 — Click Ready when you\'re set!');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Inject CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Init camera
  const initCamera = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      video.srcObject = stream;
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject();
      });
      await video.play();
      setBtnReady(false);
    } catch (e: unknown) {
      const err = e as DOMException;
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCamError('📷 Camera permission denied. Please allow access and reload.');
      } else if (err.name === 'NotFoundError') {
        setCamError('📷 No camera found. Please connect a camera and reload.');
      } else if (err.name === 'NotReadableError') {
        setCamError('📷 Camera is in use by another app. Please close it and reload.');
      } else {
        setCamError('📷 Camera access denied. Please allow camera permission and reload.');
      }
      setBtnReady(true);
    }
  }, []);

  useEffect(() => {
    initCamera();
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()); };
  }, [initCamera]);

  const updateDots = (idx: number) => idx; // dots derived from shotIndex state

  const captureShot = useCallback((currentIdx: number, currentPhotos: string[]) => {
    setFlashPop(true);
    try {
      const actx = new AudioContext();
      const buf = actx.createBuffer(1, actx.sampleRate * 0.15, actx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (actx.sampleRate * 0.03));
      const src = actx.createBufferSource(); src.buffer = buf; src.connect(actx.destination); src.start();
    } catch {}

    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx2 = canvas.getContext('2d')!;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    ctx2.save();
    ctx2.translate(canvas.width, 0);
    ctx2.scale(-1, 1);
    ctx2.drawImage(video, 0, 0);
    ctx2.restore();
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    setTimeout(() => {
      setFlashPop(false);
      const newPhotos = [...currentPhotos];
      newPhotos[currentIdx] = dataUrl;
      const newIdx = currentIdx + 1;

      if (newIdx < TOTAL) {
        setPhotos(newPhotos);
        setShotIndex(newIdx);
        setIsShooting(false);
        setBtnReady(false);
        setShotStatus(`📸 Got it! Photo ${newIdx + 1} of ${TOTAL} next ♡`);
        setShowNextMsg(false);
      } else {
        setPhotos(newPhotos);
        streamRef.current?.getTracks().forEach(t => t.stop());
        setStep('studio');
        setTimeout(() => {
          if (previewCanvasRef.current) {
            renderStripToCanvas(previewCanvasRef.current, FRAMES[0], newPhotos, 0.66).catch(console.error);
          }
        }, 100);
      }
    }, 250);
  }, []);

  const startShot = useCallback(() => {
    if (isShooting) return;
    setIsShooting(true);
    setBtnReady(true);
    setShowNextMsg(false);
    let count = 3;
    const tick = () => {
      setCountShow(false);
      setTimeout(() => {
        setCountNum(String(count));
        setCountShow(true);
        count--;
        if (count >= 0) setTimeout(tick, 900);
        else setTimeout(() => {
          setCountNum('');
          setCountShow(false);
          captureShot(shotIndex, photos);
        }, 400);
      }, 20);
    };
    tick();
  }, [isShooting, shotIndex, photos, captureShot]);

  const retake = useCallback(() => {
    setPhotos([]);
    setShotIndex(0);
    setIsShooting(false);
    setCountNum('');
    setCountShow(false);
    setShowNextMsg(false);
    setShotStatus('Photo 1 of 4 — Click Ready when you\'re set!');
    setStep('camera');
    setTimeout(() => { initCamera(); }, 100);
  }, [initCamera]);

  const applyFrame = useCallback((f: Frame) => {
    setCurrentFrame(f);
    if (previewCanvasRef.current) {
      renderStripToCanvas(previewCanvasRef.current, f, photos, 0.66).catch(console.error);
    }
  }, [photos]);

  const downloadStrip = useCallback(async () => {
    const canvas = document.createElement('canvas');
    await renderStripToCanvas(canvas, currentFrame, photos, 1);
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `kawaii-strip-${currentFrame.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    a.click();
  }, [currentFrame, photos]);

  // Group frames by category
  const cats = FRAMES.reduce<Record<string, Frame[]>>((acc, f) => {
    if (!acc[f.cat]) acc[f.cat] = [];
    acc[f.cat].push(f);
    return acc;
  }, {});

  return (
    <div className="bs-body">
      <SiteHeader navOpen={navOpen} onToggleNav={() => setNavOpen(v => !v)} />

      <main className="bs-main">
        <a href="/choose-style" className="bs-back-link">← back to style select</a>

        {/* ─── STEP 1: Camera ─── */}
        <div className={`bs-step${step === 'camera' ? ' active' : ''}`}>
          <div className="bs-cam-wrap">
            {[
              { top:'10%', left:'-8%', dur:'3.2s', delay:'0s',   r0:'-10deg', r1:'10deg',  e:'🎞️' },
              { top:'30%', left:'-10%',dur:'2.8s', delay:'.4s',  r0:'-6deg',  r1:'8deg',   e:'🌸' },
              { top:'60%', left:'-7%', dur:'3.5s', delay:'.8s',  r0:'-12deg', r1:'6deg',   e:'🎀' },
              { top:'80%', left:'-5%', dur:'2.6s', delay:'.2s',  r0:'4deg',   r1:'-10deg', e:'⭐' },
              { top:'5%',  right:'-8%',dur:'3.0s', delay:'.6s',  r0:'8deg',   r1:'-8deg',  e:'💖' },
              { top:'28%', right:'-10%',dur:'3.4s',delay:'0s',   r0:'-5deg',  r1:'12deg',  e:'✨' },
              { top:'55%', right:'-8%',dur:'2.9s', delay:'1s',   r0:'10deg',  r1:'-5deg',  e:'🍓' },
              { top:'78%', right:'-5%',dur:'3.1s', delay:'.3s',  r0:'-8deg',  r1:'6deg',   e:'🌟' },
              { top:'-4%', left:'15%', dur:'2.7s', delay:'.7s',  r0:'-5deg',  r1:'9deg',   e:'🎬' },
              { top:'-4%', right:'20%',dur:'3.3s', delay:'.1s',  r0:'6deg',   r1:'-10deg', e:'🌷' },
            ].map((em, i) => (
              <span key={i} className="bs-float-emoji" style={{ top: em.top, left: (em as Record<string,string>).left, right: (em as Record<string,string>).right, ['--dur' as string]: em.dur, ['--delay' as string]: em.delay, ['--rot0' as string]: em.r0, ['--rot1' as string]: em.r1 }}>
                {em.e}
              </span>
            ))}

            <h1 className="bs-cam-title">🎞️ 4-Photo Strip Session</h1>
            <p style={{ color:'var(--gray)', marginBottom:'.75rem', fontFamily:'var(--font-body)' }}>
              4 poses, 3 seconds each — let's go! ♡
            </p>

            <div className="bs-shot-dots">
              {Array.from({length: TOTAL}, (_, i) => (
                <div key={i} className={`bs-dot${i < shotIndex ? ' done' : i === shotIndex ? ' current' : ''}`} />
              ))}
            </div>
            <p className="bs-shot-status">{shotStatus}</p>

            <div className="bs-video-shell">
              <video ref={videoRef} className="bs-video" autoPlay playsInline muted />
              <div className="bs-countdown-overlay">
                <div className={`bs-countdown-num${countShow ? ' show' : ''}`}>{countNum}</div>
              </div>
              <div className={`bs-flash${flashPop ? ' pop' : ''}`} />
              {showNextMsg && <div className="bs-next-shot-msg">Get ready! 📸</div>}
            </div>

            <canvas ref={canvasRef} style={{ display:'none' }} width={640} height={480} />

            <div style={{ marginTop:'1rem' }}>
              <button className="bs-cam-btn" disabled={btnReady} onClick={startShot}>
                ✨ Ready / Start Pose
              </button>
            </div>
            {camError && <p style={{ color:'#e06090', marginTop:'.75rem', fontFamily:'var(--font-body)' }}>{camError}</p>}
          </div>
        </div>

        {/* ─── STEP 2: Studio ─── */}
        <div className={`bs-step${step === 'studio' ? ' active' : ''}`}>
          <div className="bs-studio-layout">
            <div className="bs-preview-panel">
              <h2>🎞️ Photostrip Design Studio</h2>
              <canvas
                ref={previewCanvasRef}
                style={{ borderRadius:'12px', boxShadow:'6px 8px 32px rgba(180,120,200,.3)', display:'block', margin:'0 auto', maxWidth:'100%' }}
              />
              <div className="bs-action-btns">
                <button className="bs-btn-retake" onClick={retake}>🔄 Retake All</button>
                <button className="bs-btn-download" onClick={downloadStrip}>⬇️ Download</button>
              </div>
              <p style={{ marginTop:'.75rem' }}>
                <a href="/" style={{ color:'var(--gray)', fontSize:'.85rem', fontFamily:'var(--font-body)' }}>← Back to Home</a>
              </p>
            </div>

            <div className="bs-frames-panel">
              <h3>🎨 Pick a Frame</h3>
              {Object.entries(cats).map(([cat, frames]) => (
                <div key={cat} className="bs-frames-category">
                  <div className="bs-cat-label">{cat}</div>
                  <div className="bs-frames-row">
                    {frames.map(f => (
                      <button
                        key={f.id}
                        className={`bs-frame-thumb-btn${currentFrame.id === f.id ? ' active' : ''}`}
                        title={f.name}
                        onClick={() => applyFrame(f)}
                      >
                        <div
                          className="bs-thumb-preview"
                          dangerouslySetInnerHTML={{ __html: makeFrameSVG(f) }}
                        />
                        <span className="bs-thumb-label">{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bs-footer">
        <div className="bs-footer-inner">
          <div className="bs-footer-brand">
            <div className="bs-footer-brand-icon">♡</div>
            <div>
              <div className="bs-footer-name">photobooth kawaii</div>
              <div className="bs-footer-sub">cute moments, forever ♡</div>
            </div>
          </div>
          <div className="bs-footer-divider" aria-hidden="true" />
          <div className="bs-footer-socials">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="TikTok">🎵</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
          <div className="bs-footer-divider" aria-hidden="true" />
          <p className="bs-copyright">© 2024 Photobooth Kawaii.<br />All rights reserved.</p>
        </div>
      </footer>

      <GrassStrip />
      <Butterflies />
    </div>
  );
}