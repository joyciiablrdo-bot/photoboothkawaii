import { useState, useRef, useEffect, useCallback } from "react";

// ===== Types =====
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

// ===== 50 POLAROID FRAME TEMPLATES =====
const FRAMES: Frame[] = [
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
  // Minimal
  { id:31, name:"Pure White", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#ffffff,#f8f8f8)", border:"#e0e0e0", accent:"#f0f0f0", s:["✦","○","✦","○"], caption:"simply you ♡", font:"#888888" },
  { id:32, name:"Gold Foil", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#fff8d8,#f8e898)", border:"#c8a800", accent:"#e0c000", s:["✨","◇","✨","◇"], caption:"golden moment", font:"#706000" },
  { id:33, name:"Silver Lining", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#f0f0f0,#e4e4e4)", border:"#909090", accent:"#b0b0b0", s:["◈","◇","◈","○"], caption:"silver lining ✦", font:"#505050" },
  { id:34, name:"Marble Blush", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#fff0ec,#f8e8e0)", border:"#d0a090", accent:"#e8b8a8", s:["◇","✦","◇","✦"], caption:"graceful & chic", font:"#806050" },
  { id:35, name:"Ink & Paper", cat:"🤍 Minimal", bg:"linear-gradient(135deg,#f8f4e8,#f0ecdc)", border:"#806040", accent:"#a08060", s:["🖊️","📝","🖊️","✦"], caption:"written in love", font:"#503020" },
  // Fun
  { id:36, name:"Rainbow", cat:"🌈 Fun", bg:"linear-gradient(135deg,#ffd0d0,#ffebd0,#d0ffd8,#d0e8ff,#f0d0ff)", border:"#c080c0", accent:"#e0a0e0", s:["🌈","☁️","🌈","⭐"], caption:"somewhere over ♡", font:"#806090" },
  { id:37, name:"Space Kei", cat:"🌈 Fun", bg:"linear-gradient(135deg,#101030,#201060)", border:"#4040a0", accent:"#6060c0", s:["🚀","⭐","🪐","✨"], caption:"to infinity ✦", font:"#9090ff" },
  { id:38, name:"Mermaid", cat:"🌈 Fun", bg:"linear-gradient(135deg,#a0e8f0,#90d0f8)", border:"#3090b0", accent:"#50b0d0", s:["🧜","🐚","🌊","✨"], caption:"ocean dreams ♡", font:"#105070" },
  { id:39, name:"Magic Girl", cat:"🌈 Fun", bg:"linear-gradient(135deg,#ffd8f8,#d8f0ff)", border:"#c060c0", accent:"#e090d0", s:["🌙","⭐","🔮","✨"], caption:"magical girl ★", font:"#9030a0" },
  { id:40, name:"Y2K Vibes", cat:"🌈 Fun", bg:"linear-gradient(135deg,#d0f8f0,#f0d0f8)", border:"#80a0c0", accent:"#a0c0e0", s:["💿","📱","💿","⚡"], caption:"y2k forever", font:"#304080" },
  // Glam
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

// ===== Polaroid dimensions =====
const POL = { W: 600, BORDER: 14, PHOTO_SIZE: 572, BOTTOM: 100 };
const POL_H = POL.BORDER + POL.PHOTO_SIZE + POL.BOTTOM;

function makePolaroidFrameSVG(f: Frame, W: number, H: number, BORDER: number, PHOTO_SIZE: number): string {
  const id = f.id;
  const border = f.border, accent = f.accent;
  const PAD = BORDER;
  const PX = BORDER, PY = BORDER, PS = PHOTO_SIZE;
  const borderClipId = `bclip${id}`;
  const borderClipDef = `<clipPath id="${borderClipId}"><path d="M0,0 L${W},0 L${W},${H} L0,${H} Z M${PX},${PY} L${PX+PS},${PY} L${PX+PS},${PY+PS} L${PX},${PY+PS} Z" fill-rule="evenodd"/></clipPath>`;
  const photoHolePath = `M0,0 L${W},0 L${W},${H} L0,${H} Z M${PX},${PY} L${PX+PS},${PY} L${PX+PS},${PY+PS} L${PX},${PY+PS} Z`;

  let frameBg = '';
  let frameOverlay = '';

  if (id === 1) {
    const petals: [number,number][] = [];
    for(let i=0;i<16;i++){petals.push([PAD*0.4,(H/15)*i]);petals.push([W-PAD*0.4,(H/15)*i]);}
    for(let i=0;i<10;i++){petals.push([(W/9)*i,PAD*0.4]);petals.push([(W/9)*i,H-PAD*0.4]);}
    const petalSvg=petals.map(([px,py],idx)=>{const rot=idx*37;return `<g transform="translate(${px},${py}) rotate(${rot})"><ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8"/><ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8" transform="rotate(72 0 0)"/><ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8" transform="rotate(144 0 0)"/><ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8" transform="rotate(216 0 0)"/><ellipse cx="3" cy="0" rx="3" ry="6" fill="#ffb8d9" opacity="0.8" transform="rotate(288 0 0)"/><circle r="2.5" fill="#ffe0f0"/></g>`;}).join('');
    frameOverlay=`${petalSvg}<rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 2) {
    const corners:[[number,number],[number,number],[number,number],[number,number]]=[[PAD,PAD],[W-PAD,PAD],[PAD,H-PAD],[W-PAD,H-PAD]];
    const roses=corners.map(([cx,cy])=>`<g transform="translate(${cx},${cy})"><circle r="11" fill="#e87090" opacity="0.85"/><circle r="7" fill="#ff9ab0"/><circle r="4" fill="#ffb8c8"/><circle r="2" fill="#ffe0e8"/></g>`).join('');
    frameOverlay=`${roses}<rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id === 3) {
    frameOverlay=`<path d="M0,${PAD} Q${W*0.25},${PAD-8} ${W*0.5},${PAD} Q${W*0.75},${PAD+8} ${W},${PAD} L${W},0 L0,0 Z" fill="${accent}"/><path d="M0,${H-PAD} Q${W*0.25},${H-PAD-8} ${W*0.5},${H-PAD} Q${W*0.75},${H-PAD+8} ${W},${H-PAD} L${W},${H} L0,${H} Z" fill="${accent}"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 4) {
    const rays=Array.from({length:36},(_,i)=>{const a=i*10*Math.PI/180,r1=Math.min(W,H)*0.48,r2=Math.min(W,H)*0.52,cx=W/2,cy=H/2;return `<line x1="${cx+r1*Math.cos(a)}" y1="${cy+r1*Math.sin(a)}" x2="${cx+r2*Math.cos(a)}" y2="${cy+r2*Math.sin(a)}" stroke="#e0b800" stroke-width="4"/>`;}).join('');
    frameOverlay=`${rays}<rect x="${PAD}" y="${PAD}" width="${W-PAD*2}" height="${H-PAD*2}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id === 5) {
    const grass=Array.from({length:Math.floor(W/7)},(_,i)=>`<rect x="${i*7+1}" y="${H-PAD*1.1}" width="3" height="${PAD*0.8}" rx="1" fill="#60a030"/>`).join('');
    frameOverlay=`<rect x="0" y="${H-PAD*1.4}" width="${W}" height="${PAD*1.4}" fill="#c8f090"/><rect x="0" y="${H-PAD*1.7}" width="${W}" height="${PAD*0.35}" fill="#90d060"/>${grass}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 6) {
    const bows=[[PAD*0.5,PAD*0.5],[W-PAD*0.5,PAD*0.5],[PAD*0.5,H-PAD*0.5],[W-PAD*0.5,H-PAD*0.5]].map(([cx,cy])=>`<text x="${cx}" y="${cy+7}" text-anchor="middle" font-size="22">🎀</text>`).join('');
    frameOverlay=`<rect x="0" y="0" width="${W}" height="${PAD*1.1}" fill="${accent}"/><rect x="0" y="${H-PAD*1.1}" width="${W}" height="${PAD*1.1}" fill="${accent}"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>${bows}`;
  } else if (id === 7) {
    frameOverlay=`<ellipse cx="${PAD*0.7}" cy="${PAD*0.5}" rx="9" ry="20" fill="#e0d0ff"/><ellipse cx="${PAD*0.7}" cy="${PAD*0.5}" rx="5" ry="12" fill="#ffb0d0"/><ellipse cx="${W-PAD*0.7}" cy="${PAD*0.5}" rx="9" ry="20" fill="#e0d0ff"/><ellipse cx="${W-PAD*0.7}" cy="${PAD*0.5}" rx="5" ry="12" fill="#ffb0d0"/><rect x="${PAD/2}" y="${PAD}" width="${W-PAD}" height="${H-PAD*1.5}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 8) {
    const starCorners:[[number,number],[number,number],[number,number],[number,number]]=[[PAD*0.5,PAD*0.5],[W-PAD*0.5,PAD*0.5],[PAD*0.5,H-PAD*0.5],[W-PAD*0.5,H-PAD*0.5]];
    const stars=starCorners.map(([cx,cy])=>{const pts=Array.from({length:5},(_,i)=>{const a=(i*72-90)*Math.PI/180,b=(i*72-90+36)*Math.PI/180;return `${cx+12*Math.cos(a)},${cy+12*Math.sin(a)} ${cx+5*Math.cos(b)},${cy+5*Math.sin(b)}`;}).join(' ');return `<polygon points="${pts}" fill="#e0c000"/>`;}).join('');
    frameOverlay=`${stars}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2" stroke-dasharray="7,5"/>`;
  } else if (id === 9) {
    frameOverlay=`<defs><pattern id="candy${id}" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="14" fill="#ff80a0"/><rect x="7" width="7" height="14" fill="#fff"/></pattern></defs><rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#candy${id})"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#candy${id})"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#candy${id})"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#candy${id})"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="#ff80a0" stroke-width="2"/>`;
  } else if (id === 10) {
    frameOverlay=`<defs><pattern id="dots${id}" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="3.5" fill="#ff8080" opacity="0.5"/></pattern></defs><rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#dots${id})"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#dots${id})"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#dots${id})"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#dots${id})"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id === 11) {
    const pawPos:[[number,number],[number,number],[number,number],[number,number],[number,number],[number,number],[number,number],[number,number],[number,number]]=[[PAD*0.5,H*0.2],[PAD*0.5,H*0.5],[PAD*0.5,H*0.8],[W-PAD*0.5,H*0.3],[W-PAD*0.5,H*0.6],[W/3,PAD*0.5],[W*2/3,PAD*0.5],[W/3,H-PAD*0.5],[W*2/3,H-PAD*0.5]];
    const paws=pawPos.map(([px,py])=>`<ellipse cx="${px}" cy="${py}" rx="7" ry="6" fill="${accent}"/><circle cx="${px-4}" cy="${py-7}" r="3" fill="${accent}"/><circle cx="${px+4}" cy="${py-7}" r="3" fill="${accent}"/><circle cx="${px}" cy="${py-9}" r="3" fill="${accent}"/>`).join('');
    frameOverlay=`${paws}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id === 12) {
    frameOverlay=`<defs><pattern id="stars${id}" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse"><text x="13" y="18" text-anchor="middle" font-size="14">⭐</text></pattern></defs><rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#stars${id})" opacity="0.6"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#stars${id})" opacity="0.6"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#stars${id})" opacity="0.6"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#stars${id})" opacity="0.6"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id === 13) {
    frameOverlay=`<defs><linearGradient id="ccg${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffd0f8"/><stop offset="50%" stop-color="#d0f0ff"/><stop offset="100%" stop-color="#f0ffd0"/></linearGradient></defs><rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#ccg${id})" opacity="0.95"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#ccg${id})" opacity="0.95"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#ccg${id})" opacity="0.95"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#ccg${id})" opacity="0.95"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="#d0b0f0" stroke-width="2"/>`;
  } else if (id === 14) {
    const leaves=Array.from({length:8},(_,i)=>{const y=(H/7)*i;return `<path d="M${PAD},${y+8} Q${-4},${y+16} ${PAD},${y+24}" fill="#80d0b0"/><path d="M${W-PAD},${y+8} Q${W+4},${y+16} ${W-PAD},${y+24}" fill="#80d0b0"/>`;}).join('');
    frameOverlay=`${leaves}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 15) {
    const clouds=[[PAD,PAD],[W-PAD,PAD],[PAD,H-PAD],[W-PAD,H-PAD]].map(([cx,cy])=>`<ellipse cx="${cx}" cy="${cy}" rx="16" ry="10" fill="white" opacity="0.85"/><ellipse cx="${cx-6}" cy="${cy+4}" rx="11" ry="8" fill="white" opacity="0.85"/><ellipse cx="${cx+6}" cy="${cy+4}" rx="11" ry="8" fill="white" opacity="0.85"/>`).join('');
    frameOverlay=`${clouds}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 16) {
    frameOverlay=`<path d="M${PAD},${PAD} Q${W*0.25},${PAD-10} ${W*0.5},${PAD} Q${W*0.75},${PAD+10} ${W-PAD},${PAD} L${W-PAD},${H-PAD} Q${W*0.75},${H-PAD-10} ${W*0.5},${H-PAD} Q${W*0.25},${H-PAD+10} ${PAD},${H-PAD} Z" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id === 17) {
    frameOverlay=`<defs><pattern id="lg${id}" x="0" y="0" width="11" height="11" patternUnits="userSpaceOnUse"><circle cx="5.5" cy="5.5" r="2" fill="${border}" opacity="0.5"/></pattern></defs><rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#lg${id})"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#lg${id})"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#lg${id})"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#lg${id})"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="2"/>`;
  } else if (id === 18) {
    const hS=16;
    const mkHex=(cx:number,cy:number)=>{const pts=Array.from({length:6},(_,k)=>{const a=(k*60-30)*Math.PI/180;return `${cx+hS*0.5*Math.cos(a)},${cy+hS*0.5*Math.sin(a)}`;}).join(' ');return `<polygon points="${pts}" fill="${accent}" stroke="${border}" stroke-width="1" opacity="0.9"/>`;};
    const topH=Array.from({length:Math.ceil(W/(hS*1.75))},(_,i)=>mkHex(i*hS*1.75,PAD/2)).join('');
    const botH=Array.from({length:Math.ceil(W/(hS*1.75))},(_,i)=>mkHex(i*hS*1.75,H-PAD/2)).join('');
    const lftH=Array.from({length:Math.ceil(H/(hS*1.75))},(_,i)=>mkHex(PAD/2,i*hS*1.75)).join('');
    const rgtH=Array.from({length:Math.ceil(H/(hS*1.75))},(_,i)=>mkHex(W-PAD/2,i*hS*1.75)).join('');
    frameOverlay=`${topH}${botH}${lftH}${rgtH}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;
  } else if (id === 19) {
    const holeCount=Math.floor(H/26);
    const holes=Array.from({length:holeCount},(_,i)=>{const y=6+i*26;return `<rect x="3" y="${y}" width="10" height="10" rx="2" fill="#0a0502" opacity="0.9"/><rect x="${W-13}" y="${y}" width="10" height="10" rx="2" fill="#0a0502" opacity="0.9"/>`;}).join('');
    frameOverlay=`<rect x="0" y="0" width="${PAD}" height="${H}" rx="2" fill="#2a1808"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" rx="2" fill="#2a1808"/>${holes}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="2" fill="none" stroke="${border}" stroke-width="2"/>`;
  } else if (id === 20) {
    frameOverlay=`<defs><pattern id="chk${id}" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#222"/><rect x="7" y="7" width="7" height="7" fill="#222"/><rect x="7" y="0" width="7" height="7" fill="#eee"/><rect x="0" y="7" width="7" height="7" fill="#eee"/></pattern></defs><rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#chk${id})"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#chk${id})"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#chk${id})"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#chk${id})"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;
  } else if (id === 21) {
    frameOverlay=`<rect x="0" y="0" width="${W}" height="${PAD*1.4}" fill="#e8b820"/><rect x="0" y="${H-PAD*1.4}" width="${W}" height="${PAD*1.4}" fill="#e8b820"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 22) {
    const tris:string[]=[];
    for(let i=0;i<Math.floor(W/18);i++){tris.push(`<polygon points="${i*18},0 ${i*18+9},${PAD} ${i*18+18},0" fill="${i%2===0?accent:border}"/>`);tris.push(`<polygon points="${i*18},${H} ${i*18+9},${H-PAD} ${i*18+18},${H}" fill="${i%2===0?border:accent}"/>`);}
    for(let i=0;i<Math.floor(H/18);i++){tris.push(`<polygon points="0,${i*18} ${PAD},${i*18+9} 0,${i*18+18}" fill="${i%2===0?accent:border}"/>`);tris.push(`<polygon points="${W},${i*18} ${W-PAD},${i*18+9} ${W},${i*18+18}" fill="${i%2===0?border:accent}"/>`);}
    frameOverlay=`${tris.join('')}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;
  } else if (id === 23) {
    frameOverlay=`<rect x="0" y="0" width="${W}" height="${H}" rx="6" fill="none" stroke="#ff0000" stroke-width="${PAD}"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#ff6000" stroke-width="3"/><rect x="${PAD*1.2}" y="${PAD*1.2}" width="${W-PAD*2.4}" height="${H-PAD*2.4}" rx="2" fill="none" stroke="#ff0000" stroke-width="2"/>`;
  } else if (id === 24) {
    frameOverlay=`<rect x="0" y="0" width="${PAD}" height="${H}" fill="${accent}" opacity="0.75"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="${accent}" opacity="0.75"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="${accent}" opacity="0.75"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="${accent}" opacity="0.75"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 25) {
    const snowCs:[[number,number],[number,number],[number,number],[number,number]]=[[PAD*1.2,PAD*1.2],[W-PAD*1.2,PAD*1.2],[PAD*1.2,H-PAD*1.2],[W-PAD*1.2,H-PAD*1.2]];
    const flakes=snowCs.map(([cx,cy])=>Array.from({length:6},(_,i)=>{const a=i*60*Math.PI/180,len=PAD*0.85;return `<line x1="${cx}" y1="${cy}" x2="${cx+len*Math.cos(a)}" y2="${cy+len*Math.sin(a)}" stroke="${border}" stroke-width="2"/><line x1="${cx+len*0.5*Math.cos(a)}" y1="${cy+len*0.5*Math.sin(a)}" x2="${cx+len*0.7*Math.cos(a+0.5)}" y2="${cy+len*0.7*Math.sin(a+0.5)}" stroke="${border}" stroke-width="1.5"/><line x1="${cx+len*0.5*Math.cos(a)}" y1="${cy+len*0.5*Math.sin(a)}" x2="${cx+len*0.7*Math.cos(a-0.5)}" y2="${cy+len*0.7*Math.sin(a-0.5)}" stroke="${border}" stroke-width="1.5"/>`;}).join('')).join('');
    frameOverlay=`${flakes}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="2" stroke-dasharray="5,4"/>`;
  } else if (id === 26) {
    frameOverlay=`<path d="M0,${PAD} Q${W*0.25},${PAD*0.4} ${W*0.5},${PAD} Q${W*0.75},${PAD*1.6} ${W},${PAD} L${W},0 L0,0 Z" fill="${accent}"/><path d="M0,${H-PAD} Q${W*0.25},${H-PAD*0.4} ${W*0.5},${H-PAD} Q${W*0.75},${H-PAD*1.6} ${W},${H-PAD} L${W},${H} L0,${H} Z" fill="${accent}"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 27) {
    const leafs:[[number,number,string],[number,number,string],[number,number,string],[number,number,string],[number,number,string],[number,number,string],[number,number,string],[number,number,string]]=[[PAD*0.5,PAD*0.5,'🍁'],[W-PAD*0.5,PAD*0.5,'🍂'],[PAD*0.5,H-PAD*0.5,'🍂'],[W-PAD*0.5,H-PAD*0.5,'🍁'],[PAD*0.5,H/2,'🍁'],[W-PAD*0.5,H/2,'🍂'],[W/2,PAD*0.5,'🍁'],[W/2,H-PAD*0.5,'🍂']];
    const ls=leafs.map(([x,y,e])=>`<text x="${x}" y="${y+8}" text-anchor="middle" font-size="18">${e}</text>`).join('');
    frameOverlay=`${ls}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 28) {
    const vines=Array.from({length:7},(_,i)=>{const y=(H/6)*i;return `<ellipse cx="${PAD*0.7}" cy="${y+12}" rx="9" ry="14" fill="#90d060" transform="rotate(-20 ${PAD*0.7} ${y+12})"/><ellipse cx="${W-PAD*0.7}" cy="${y+18}" rx="9" ry="14" fill="#90d060" transform="rotate(20 ${W-PAD*0.7} ${y+18})"/>`;}).join('');
    frameOverlay=`<path d="M${PAD*0.5},${H} Q${PAD*0.5},${H*0.6} ${PAD},${H*0.4} Q${PAD*1.2},${H*0.2} ${PAD},0" stroke="#60b060" stroke-width="4" fill="none"/><path d="M${W-PAD*0.5},${H} Q${W-PAD*0.5},${H*0.6} ${W-PAD},${H*0.4} Q${W-PAD*1.2},${H*0.2} ${W-PAD},0" stroke="#60b060" stroke-width="4" fill="none"/>${vines}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="2"/>`;
  } else if (id === 29) {
    frameOverlay=`<rect x="0" y="0" width="${PAD}" height="${H}" fill="#c02020"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="#c02020"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="#c02020"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="#c02020"/><text x="${W/2}" y="${PAD*0.8}" text-anchor="middle" font-size="13" fill="white">⭐ ⭐ ⭐ ⭐ ⭐</text><text x="${W/2}" y="${H-PAD*0.3}" text-anchor="middle" font-size="13" fill="white">🎁 🎁 🎁</text><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#ff4040" stroke-width="2"/>`;
  } else if (id === 30) {
    const webSize=PAD*3;
    const webLines=[0,30,60,90,120,150].map(angle=>{const a=angle*Math.PI/180;return `<line x1="0" y1="0" x2="${webSize*Math.cos(a)}" y2="${webSize*Math.sin(a)}" stroke="#888" stroke-width="1.5"/>`;}).join('');
    const webArcs=[webSize*0.3,webSize*0.6,webSize].map(r=>`<path d="M${r},0 A${r},${r} 0 0,1 0,${r}" fill="none" stroke="#888" stroke-width="1.5"/>`).join('');
    frameOverlay=`<g transform="translate(0,0)">${webLines}${webArcs}</g><g transform="translate(${W},0) scale(-1,1)">${webLines}${webArcs}</g><g transform="translate(0,${H}) scale(1,-1)">${webLines}${webArcs}</g><g transform="translate(${W},${H}) scale(-1,-1)">${webLines}${webArcs}</g><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="#553300" stroke-width="3"/>`;
  } else if (id === 31) {
    frameOverlay=`<rect x="4" y="4" width="${W-8}" height="${H-8}" rx="5" fill="none" stroke="#d0d0d0" stroke-width="3"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#e8e8e8" stroke-width="1.5"/>`;
  } else if (id === 32) {
    frameOverlay=`<defs><linearGradient id="gold${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f5d900"/><stop offset="40%" stop-color="#fffbe0"/><stop offset="100%" stop-color="#c8a800"/></linearGradient></defs><rect x="4" y="4" width="${W-8}" height="${H-8}" rx="7" fill="none" stroke="url(#gold${id})" stroke-width="7"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#e0c000" stroke-width="1.5"/>`;
  } else if (id === 33) {
    frameOverlay=`<defs><linearGradient id="silver${id}" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#909090"/><stop offset="40%" stop-color="#e0e0e0"/><stop offset="70%" stop-color="#b0b0b0"/><stop offset="100%" stop-color="#808080"/></linearGradient></defs><rect x="0" y="0" width="${PAD}" height="${H}" fill="url(#silver${id})"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="url(#silver${id})"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="url(#silver${id})"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="url(#silver${id})"/><rect x="4" y="4" width="${W-8}" height="${H-8}" rx="7" fill="none" stroke="url(#silver${id})" stroke-width="3"/>`;
  } else if (id === 34) {
    frameOverlay=`<rect x="0" y="0" width="${PAD}" height="${H}" fill="#f5ece8"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="#f5ece8"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="#f5ece8"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="#f5ece8"/><path d="M${W*0.1},0 Q${W*0.3},${H*0.3} ${W*0.2},${H*0.6} Q${W*0.3},${H*0.8} ${W*0.25},${H}" stroke="#d4a090" stroke-width="3.5" fill="none" opacity="0.65"/><path d="M${W*0.5},0 Q${W*0.6},${H*0.25} ${W*0.65},${H*0.5} Q${W*0.75},${H*0.75} ${W*0.55},${H}" stroke="#c09080" stroke-width="2.5" fill="none" opacity="0.45"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 35) {
    const lines=Array.from({length:Math.floor(H/22)},(_,i)=>`<line x1="${PAD*1.5}" y1="${18+i*22}" x2="${W-PAD}" y2="${18+i*22}" stroke="#c0b090" stroke-width="1.1"/>`).join('');
    frameOverlay=`${lines}<line x1="${PAD*1.5}" y1="0" x2="${PAD*1.5}" y2="${H}" stroke="#e0d0b0" stroke-width="2"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="3" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 36) {
    const rColors=['#ff4444','#ff8800','#ffee00','#44cc44','#4488ff','#8844cc'];
    const arcs=rColors.map((c,i)=>`<path d="M${8+i*5},${H} Q${W/2},${H*0.05+i*20} ${W-8-i*5},${H}" fill="none" stroke="${c}" stroke-width="4" opacity="0.6"/>`).join('');
    frameOverlay=`${arcs}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 37) {
    const stars37=Array.from({length:100},(_,i)=>{const x=(i*173+7)%W,y=(i*231+5)%H;return `<circle cx="${x}" cy="${y}" r="${i%7===0?2.2:i%3===0?1.3:0.7}" fill="white" opacity="${0.2+i%7*0.11}"/>`;}).join('');
    const shoots=[[W*0.2,H*0.15,W*0.35,H*0.22],[W*0.6,H*0.08,W*0.8,H*0.18]].map(([x1,y1,x2,y2])=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="1.5" opacity="0.6"/>`).join('');
    const planet=`<circle cx="${W*0.85}" cy="${H*0.1}" r="10" fill="#6040a0" opacity="0.75"/><circle cx="${W*0.85}" cy="${H*0.1}" r="6" fill="#8060c0" opacity="0.5"/>`;
    frameBg=`<path fill-rule="evenodd" fill="#0a0820" d="${photoHolePath}"/>${stars37}${shoots}${planet}`;
    frameOverlay=`<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="#5050c0" stroke-width="2"/>`;
  } else if (id === 38) {
    const waves=Array.from({length:5},(_,i)=>{const y=(H/4)*i;return `<path d="M0,${y} Q${W*0.25},${y-10} ${W*0.5},${y} Q${W*0.75},${y+10} ${W},${y}" stroke="${border}" stroke-width="2" fill="none" opacity="0.35"/>`;}).join('');
    frameOverlay=`${waves}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="7" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id === 39) {
    const sparkles=Array.from({length:24},(_,i)=>{let x=0,y=0;if(i<7){x=(W/6)*i;y=PAD*0.5;}else if(i<14){x=(W/6)*(i-7);y=H-PAD*0.5;}else if(i<19){x=PAD*0.5;y=(H/4)*(i-14);}else{x=W-PAD*0.5;y=(H/4)*(i-19);}return `<text x="${x}" y="${y+5}" text-anchor="middle" font-size="12">✨</text>`;}).join('');
    frameOverlay=`${sparkles}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 40) {
    const circuits=Array.from({length:7},(_,i)=>{const y=(H/6)*i;return `<line x1="0" y1="${y+8}" x2="${W*0.2}" y2="${y+8}" stroke="${border}" stroke-width="1.5" opacity="0.4"/><circle cx="${W*0.2}" cy="${y+8}" r="2.5" fill="${border}" opacity="0.4"/><line x1="${W*0.8}" y1="${y+8}" x2="${W}" y2="${y+8}" stroke="${border}" stroke-width="1.5" opacity="0.4"/><circle cx="${W*0.8}" cy="${y+8}" r="2.5" fill="${border}" opacity="0.4"/>`;}).join('');
    frameOverlay=`${circuits}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 41) {
    frameOverlay=`<defs><linearGradient id="rg${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8b0a0"/><stop offset="50%" stop-color="#f8d0c0"/><stop offset="100%" stop-color="#d09080"/></linearGradient></defs><rect x="4" y="4" width="${W-8}" height="${H-8}" rx="7" fill="none" stroke="url(#rg${id})" stroke-width="7"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2"/>`;
  } else if (id === 42) {
    const gemCs:[[number,number],[number,number],[number,number],[number,number]]=[[0,0],[W,0],[0,H],[W,H]];
    const gems=gemCs.map(([cx,cy])=>{const sx=cx===0?1:-1,sy=cy===0?1:-1,s=PAD*1.3;return `<polygon points="${cx},${cy} ${cx+sx*s},${cy} ${cx+sx*s*0.6},${cy+sy*s*0.6} ${cx},${cy+sy*s}" fill="${accent}" opacity="0.8"/>`;}).join('');
    frameOverlay=`${gems}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 43) {
    const bubbles=Array.from({length:36},(_,i)=>{let x=0,y=0;if(i<10){x=(W/9)*i;y=PAD*0.6;}else if(i<20){x=(W/9)*(i-10);y=H-PAD*0.6;}else if(i<28){x=PAD*0.6;y=(H/7)*(i-20);}else{x=W-PAD*0.6;y=(H/7)*(i-28);}const r=2.5+(i%4)*1.2;return `<circle cx="${x}" cy="${y}" r="${r}" fill="${accent}" opacity="0.6"/>`;}).join('');
    frameOverlay=`${bubbles}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 44) {
    frameOverlay=`<defs><linearGradient id="holo${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff80c0"/><stop offset="20%" stop-color="#ff80ff"/><stop offset="40%" stop-color="#8080ff"/><stop offset="60%" stop-color="#80ffff"/><stop offset="80%" stop-color="#80ff80"/><stop offset="100%" stop-color="#ffff80"/></linearGradient></defs><rect x="4" y="4" width="${W-8}" height="${H-8}" rx="7" fill="none" stroke="url(#holo${id})" stroke-width="9"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${border}" stroke-width="2" opacity="0.5"/>`;
  } else if (id === 45) {
    frameOverlay=`<rect x="0" y="0" width="${PAD}" height="${H}" fill="#2a1020" opacity="0.9"/><rect x="${W-PAD}" y="0" width="${PAD}" height="${H}" fill="#2a1020" opacity="0.9"/><rect x="${PAD}" y="0" width="${W-PAD*2}" height="${PAD}" fill="#2a1020" opacity="0.9"/><rect x="${PAD}" y="${H-PAD}" width="${W-PAD*2}" height="${PAD}" fill="#2a1020" opacity="0.9"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="#2a1020" stroke-width="2"/>`;
  } else if (id === 46) {
    const fVines=Array.from({length:10},(_,i)=>{const y=(H/9)*i;return `<ellipse cx="${PAD*0.5}" cy="${y+10}" rx="7" ry="12" fill="#90d060" opacity="0.75" transform="rotate(-15 ${PAD*0.5} ${y+10})"/><ellipse cx="${W-PAD*0.5}" cy="${y+15}" rx="7" ry="12" fill="#90d060" opacity="0.75" transform="rotate(15 ${W-PAD*0.5} ${y+15})"/>`;}).join('');
    frameOverlay=`${fVines}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 47) {
    const waveLines=[H*0.15,H*0.35,H*0.55,H*0.75,H*0.9].map(wy=>`<path d="M0,${wy} Q${W*0.25},${wy-8} ${W*0.5},${wy} Q${W*0.75},${wy+8} ${W},${wy}" stroke="white" stroke-width="2" fill="none" opacity="0.35"/>`).join('');
    frameBg=`<defs><linearGradient id="ocean${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87ceeb"/><stop offset="100%" stop-color="#1a6090"/></linearGradient></defs><path fill-rule="evenodd" fill="url(#ocean${id})" d="${photoHolePath}"/>${waveLines}`;
    frameOverlay=`<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="3"/>`;
  } else if (id === 48) {
    const treeCount=Math.floor(W/20);
    const trees=Array.from({length:treeCount},(_,i)=>`<polygon points="${i*20},${H} ${i*20+10},${H-40} ${i*20+20},${H}" fill="#1a3010"/>`).join('');
    frameBg=`<defs><linearGradient id="sunset${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ff9060"/><stop offset="40%" stop-color="#ffb060"/><stop offset="70%" stop-color="#ff6040"/><stop offset="100%" stop-color="#c03020"/></linearGradient></defs><path fill-rule="evenodd" fill="url(#sunset${id})" d="${photoHolePath}"/><rect x="0" y="${H-24}" width="${W}" height="24" fill="#1a3010"/>${trees}<circle cx="${W/2}" cy="${PAD*1.4}" r="${PAD*0.9}" fill="#ffe060" opacity="0.7"/>`;
    frameOverlay=`<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>`;
  } else if (id === 49) {
    const blossoms=Array.from({length:24},(_,i)=>{const bx=(i*137+10)%W,by=(i*173+10)%H;return `<g transform="translate(${bx},${by}) rotate(${i*25})"><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75"/><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75" transform="rotate(72)"/><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75" transform="rotate(144)"/><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75" transform="rotate(216)"/><ellipse cx="4" cy="0" rx="4" ry="8" fill="#ffb0d0" opacity="0.75" transform="rotate(288)"/><circle r="3" fill="#ffe0f0"/></g>`;}).join('');
    frameOverlay=`${blossoms}<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="${border}" stroke-width="4"/>`;
  } else if (id === 50) {
    const nightStars=Array.from({length:110},(_,i)=>{const x=(i*173+3)%W,y=(i*137+3)%H;return `<circle cx="${x}" cy="${y}" r="${i%5===0?1.8:i%3===0?1.1:0.6}" fill="white" opacity="${0.2+i%6*0.11}"/>`;}).join('');
    const moon=`<path d="M${W*0.78},${PAD*0.4} Q${W*0.64},${PAD*1.2} ${W*0.64},${PAD*2.4} Q${W*0.64},${PAD*3.8} ${W*0.80},${PAD*4.6} Q${W*0.64},${PAD*4.8} ${W*0.52},${PAD*3.8} Q${W*0.42},${PAD*2.4} ${W*0.52},${PAD*1.2} Q${W*0.58},${PAD*0.4} ${W*0.78},${PAD*0.4} Z" fill="#e8e860" opacity="0.9"/>`;
    frameBg=`<path fill-rule="evenodd" fill="#0e0c24" d="${photoHolePath}"/>${nightStars}${moon}`;
    frameOverlay=`<rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="5" fill="none" stroke="#5050b0" stroke-width="2"/>`;
  } else {
    frameOverlay=`<rect x="0" y="0" width="${W}" height="${H}" rx="5" fill="none" stroke="${border}" stroke-width="${PAD}"/><rect x="${PAD/2}" y="${PAD/2}" width="${W-PAD}" height="${H-PAD}" rx="4" fill="none" stroke="${accent}" stroke-width="2"/>`;
  }

  const stickerRow=`<text x="${PAD*0.9}" y="${PAD*1.8}" font-size="24" font-family="serif">${f.s[0]}</text><text x="${W-PAD*0.9}" y="${PAD*1.8}" text-anchor="end" font-size="24" font-family="serif">${f.s[1]}</text><text x="${PAD*0.9}" y="${H-PAD*0.4}" font-size="20" font-family="serif">${f.s[2]}</text><text x="${W-PAD*0.9}" y="${H-PAD*0.4}" text-anchor="end" font-size="20" font-family="serif">${f.s[3]}</text>`;

  const defsRe=/<defs>([\s\S]*?)<\/defs>/g;
  let embDefs='';
  const cleanFO=frameOverlay.replace(defsRe,(_,d)=>{embDefs+=d;return '';});
  const cleanFB=frameBg.replace(defsRe,(_,d)=>{embDefs+=d;return '';});

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><defs>${borderClipDef}${embDefs}</defs>${cleanFB}<g clip-path="url(#${borderClipId})">${cleanFO}</g>${stickerRow}</svg>`;
}

async function renderPolaroidToCanvas(canvas: HTMLCanvasElement, f: Frame, photoSrc: string | null, scale: number): Promise<void> {
  const { W, BORDER, PHOTO_SIZE } = POL;
  const H = POL_H;
  canvas.width = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
  const ctx = canvas.getContext('2d')!;
  ctx.scale(scale, scale);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, W, H);
  if (photoSrc) {
    const img = new Image();
    img.src = photoSrc;
    await new Promise<void>(r => { img.onload = () => r(); img.onerror = () => r(); });
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const side = Math.min(iw, ih);
    const sx = (iw - side) / 2;
    const sy = (ih - side) / 2;
    ctx.drawImage(img, sx, sy, side, side, BORDER, BORDER, PHOTO_SIZE, PHOTO_SIZE);
  }
  const svgStr = makePolaroidFrameSVG(f, W, H, BORDER, PHOTO_SIZE);
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const fImg = new Image();
  await new Promise<void>((res, rej) => { fImg.onload = () => res(); fImg.onerror = () => rej(); fImg.src = url; });
  ctx.drawImage(fImg, 0, 0, W, H);
  URL.revokeObjectURL(url);
}

// ===== Grass SVG strip =====
const GrassStrip = () => (
  <div className="grass-strip" aria-hidden="true">
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
      <rect x="0" y="50" width="1440" height="40" fill="#a8e063"/>
      <g fill="#6dbb2a">
        {[0,8,18,26,36,44,54,62,72,80,90,98,108,116,126,134,144,152,162,170,180,188,198,206,216,224,234,242,252,260,270,278,288,296,306,314,324,332,342,350,360,368,378,386,396,404,414,422,432,440,450,458,468,476,486,494,504,512,522,530,540,548,558,566,576,584,594,602,612,620,630,638,648,656,666,674,684,692,702,710,720,728,738,746,756,764,774,782,792,800,810,818,828,836,846,854,864,872,882,890,900,908,918,926,936,944,954,962,972,980,990,998,1008,1016,1026,1034,1044,1052,1062,1070,1080,1088,1098,1106,1116,1124,1134,1142,1152,1160,1170,1178,1188,1196,1206,1214,1224,1232,1242,1250,1260,1268,1278,1286,1296,1304,1314,1322,1332,1340,1350,1358,1368,1376,1386,1394,1404,1412,1422,1430].map((x,i)=>{
          const mids=[6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12,8,20,16,24,6,10,14,18,22,26,28,12];
          const mid=mids[i%mids.length];
          return <polygon key={i} points={`${x},52 ${x+6},${mid} ${x+12},52`}/>;
        })}
      </g>
      <g fill="#8dd44a" opacity="0.7">
        {[4,20,48,76,120,160,200,260,320,400,480,560,640,720,800,880,960,1040,1120,1200,1280,1360,1420].map((x,i)=>(
          <polygon key={i} points={`${x},52 ${x+6},22 ${x+12},52`}/>
        ))}
      </g>
      <g fontSize="14" textAnchor="middle" fontFamily="serif">
        {[60,380,740,1100,1420].map((x,i)=>(
          <text key={i} x={x} y="52">🌸</text>
        ))}
        {[200,560,920,1280].map((x,i)=>(
          <text key={i} x={x} y="50">🌼</text>
        ))}
      </g>
    </svg>
  </div>
);

// ===== Main Component =====
export default function BoothPolaroid() {
  const [step, setStep] = useState<'camera'|'studio'>('camera');
  const [capturedDataURL, setCapturedDataURL] = useState<string|null>(null);
  const [currentFrame, setCurrentFrame] = useState<Frame>(FRAMES[0]);
  const [navOpen, setNavOpen] = useState(false);
  const [camError, setCamError] = useState('');
  const [btnReady, setBtnReady] = useState(false);
  const [counting, setCounting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream|null>(null);
  const countNumRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const initCamera = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    setCamError('');
    setBtnReady(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false
      });
      streamRef.current = stream;
      video.srcObject = stream;
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject();
      });
      await video.play();
      setBtnReady(true);
    } catch (e: unknown) {
      const err = e as {name?:string, message?:string};
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCamError('📷 Camera permission denied. Please allow access in your browser and reload.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCamError('📷 No camera found. Please connect a camera and reload.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setCamError('📷 Camera is in use by another app. Please close it and reload.');
      } else {
        setCamError('📷 Could not start camera: ' + (err.message ?? 'Unknown error'));
      }
    }
  }, []);

  useEffect(() => {
    initCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [initCamera]);

  useEffect(() => {
    if (step === 'studio' && previewCanvasRef.current) {
      renderPolaroidToCanvas(previewCanvasRef.current, currentFrame, capturedDataURL, 0.47).catch(console.error);
    }
  }, [step, currentFrame, capturedDataURL]);

  const startCountdown = () => {
    if (!btnReady || counting) return;
    setCounting(true);
    const el = countNumRef.current;
    let count = 5;
    const tick = () => {
      if (el) {
        el.className = 'countdown-num';
        void el.offsetWidth;
        el.textContent = String(count);
        el.className = 'countdown-num show';
      }
      count--;
      if (count >= 0) {
        setTimeout(tick, 900);
      } else {
        setTimeout(() => {
          if (el) el.textContent = '';
          capturePhoto();
        }, 400);
      }
    };
    tick();
  };

  const capturePhoto = () => {
    const flash = flashRef.current;
    if (flash) { flash.classList.add('pop'); }
    try {
      const ctx = new AudioContext();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*0.03));
      const src = ctx.createBufferSource(); src.buffer=buf; src.connect(ctx.destination); src.start();
    } catch(e){}

    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx2 = canvas.getContext('2d')!;
    const vw = video.videoWidth || 640;
    const vh = video.videoHeight || 480;
    const side = Math.min(vw, vh);
    canvas.width = side;
    canvas.height = side;
    ctx2.save();
    ctx2.translate(side, 0);
    ctx2.scale(-1, 1);
    ctx2.drawImage(video, (vw-side)/2, (vh-side)/2, side, side, 0, 0, side, side);
    ctx2.restore();
    const dataURL = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedDataURL(dataURL);

    setTimeout(() => {
      if (flash) flash.classList.remove('pop');
      goToStudio();
    }, 250);
  };

  const goToStudio = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setStep('studio');
  };

  const retake = () => {
    setStep('camera');
    setCounting(false);
    setBtnReady(false);
    setTimeout(() => initCamera(), 100);
  };

  const downloadPolaroid = async () => {
    const canvas = document.createElement('canvas');
    await renderPolaroidToCanvas(canvas, currentFrame, capturedDataURL, 1);
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `kawaii-polaroid-${currentFrame.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    a.click();
  };

  // Group frames by category
  const cats: Record<string, Frame[]> = {};
  FRAMES.forEach(f => { if(!cats[f.cat]) cats[f.cat]=[]; cats[f.cat].push(f); });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700&display=swap');
        :root {
          --font-display: 'Baloo 2', cursive;
          --font-body: 'Nunito', sans-serif;
          --pink:#ff9ec8; --pink-deep:#ff6ba8; --lavender:#e8d4f0;
          --brown:#4a3728; --white:#fffefd; --gray:#6b5a52;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: linear-gradient(165deg,#f5e6ff 0%,#ffd6e8 45%,#e8d4ff 100%); min-height:100vh; }
        .step { display:none; animation:stepIn .4s ease both; }
        .step.active { display:block; }
        @keyframes stepIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .countdown-num { font-family:var(--font-display); font-size:8rem; font-weight:700; color:#fff; text-shadow:0 0 40px rgba(255,120,180,.8),0 4px 0 rgba(0,0,0,.2); opacity:0; transition:none; animation:none; }
        .countdown-num.show { animation:countPop .85s ease forwards; }
        @keyframes countPop { 0%{opacity:0;transform:scale(2);}20%{opacity:1;transform:scale(1);}80%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(0.8);} }
        .flash-cap { position:absolute; inset:0; background:#fff; opacity:0; pointer-events:none; border-radius:20px; transition:opacity .08s ease; }
        .flash-cap.pop { opacity:1; }
        @keyframes floatBob { 0%,100%{transform:translateY(0) rotate(var(--rot0,-8deg));}50%{transform:translateY(-12px) rotate(var(--rot1,8deg));} }
        @keyframes backGlow {
          0%,100%{box-shadow:0 0 10px 2px rgba(255,220,0,.55),0 0 28px 6px rgba(255,200,0,.30),0 0 55px 14px rgba(255,180,0,.15),0 3px 10px rgba(200,140,0,.25);}
          50%{box-shadow:0 0 16px 5px rgba(255,230,0,.80),0 0 42px 12px rgba(255,210,0,.45),0 0 75px 22px rgba(255,185,0,.22),0 3px 10px rgba(200,140,0,.25);}
        }
        .butterfly { position:fixed; font-size:1.5rem; pointer-events:none; z-index:51; bottom:var(--bf-bottom,90px); animation: bflyX var(--bx-dur,18s) linear infinite var(--bx-delay,0s), bflyY var(--by-dur,3.2s) ease-in-out infinite var(--by-delay,0s), bflyFlap var(--flap-dur,.38s) ease-in-out infinite var(--flap-delay,0s); }
        @keyframes bflyX { 0%{left:-6%;}100%{left:110%;} }
        @keyframes bflyY { 0%,100%{transform:translateY(0) rotate(var(--tilt,-5deg));}50%{transform:translateY(-26px) rotate(var(--tilt,-5deg));} }
        @keyframes bflyFlap { 0%,100%{letter-spacing:0;}50%{letter-spacing:-.5em;} }
        .grass-strip { position:fixed; bottom:0; left:0; right:0; height:90px; pointer-events:none; z-index:50; overflow:hidden; }
        @media(max-width:740px){ .studio-layout{grid-template-columns:1fr!important;} }
        @media(max-width:640px){
          .site-header{ display:flex!important; flex-wrap:wrap; border-radius:60px 60px 30px 30px / 50px 50px 25px 25px!important; margin:1.2rem .75rem 0!important; padding:.65rem 1.1rem .9rem!important; }
          .hamburger{ display:flex!important; }
          nav.site-nav{ display:none!important; width:100%; order:4; padding:.5rem 0 .25rem; }
          nav.site-nav.open{ display:flex!important; }
          .nav-main{ flex-direction:column!important; align-items:flex-start!important; gap:0!important; width:100%; }
          .nav-main li{ width:100%; }
          .nav-main a{ display:block; padding:.55rem .25rem; border-bottom:1px solid rgba(255,160,200,.2); font-size:1.05rem; }
          .nav-main li:last-child a{ border-bottom:none; }
          .footer-inner{ justify-content:center!important; text-align:center!important; }
          .footer-divider,.footer-divider2{ display:none!important; }
          .copyright{ text-align:center!important; width:100%; }
          .footer-brand{ justify-content:center!important; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{background:'#fff',margin:'1.6rem 1rem 0',padding:'.75rem 1.75rem 1.1rem',display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',position:'relative',zIndex:100,borderRadius:'120px 120px 60px 60px / 80px 80px 40px 40px',boxShadow:'0 6px 28px rgba(255,160,200,.22),0 2px 8px rgba(255,160,200,.12)'}} className="site-header">
        <span style={{position:'absolute',background:'#fff',borderRadius:'50%',zIndex:-1,width:140,height:70,top:-30,left:'12%'}} aria-hidden="true"/>
        <span style={{position:'absolute',background:'#fff',borderRadius:'50%',zIndex:-1,width:100,height:55,top:-22,left:'32%'}} aria-hidden="true"/>
        <span style={{position:'absolute',background:'#fff',borderRadius:'50%',zIndex:-1,width:80,height:50,top:-18,left:'50%'}} aria-hidden="true"/>
        <span style={{position:'absolute',background:'#fff',borderRadius:'50%',zIndex:-1,width:110,height:60,top:-26,right:'22%'}} aria-hidden="true"/>
        <span style={{position:'absolute',background:'#fff',borderRadius:'50%',zIndex:-1,width:70,height:45,top:-14,right:'10%'}} aria-hidden="true"/>

        <a href="/" style={{textDecoration:'none',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',lineHeight:1,gap:0,textAlign:'center'}}>
          <span style={{fontFamily:'var(--font-body)',fontSize:'.88rem',fontWeight:700,color:'var(--pink-deep)',letterSpacing:'.04em',display:'flex',alignItems:'center',justifyContent:'center',gap:'.3rem',whiteSpace:'nowrap'}}>
            <span>🎀</span> photobooth <span>🎀</span>
          </span>
          <span style={{fontFamily:'var(--font-display)',fontSize:'1.8rem',fontWeight:800,color:'var(--pink-deep)',lineHeight:1,marginTop:'.05rem',letterSpacing:'.01em'}}>kawaii</span>
        </a>

        <nav className={`site-nav${navOpen?' open':''}`} id="siteNav" aria-label="Main" style={{display:'flex',justifyContent:'center'}}>
          <ul style={{listStyle:'none',display:'flex',alignItems:'center',gap:'2.8rem',margin:0,padding:0}} className="nav-main">
            <li><a href="/" style={{fontFamily:'var(--font-body)',fontSize:'1rem',fontWeight:700,color:'var(--brown)',textDecoration:'none'}}>Home</a></li>
            <li><a href="/about" style={{fontFamily:'var(--font-body)',fontSize:'1rem',fontWeight:700,color:'var(--brown)',textDecoration:'none'}}>About</a></li>
            <li><a href="/photobooth" style={{fontFamily:'var(--font-body)',fontSize:'1rem',fontWeight:700,color:'var(--pink-deep)',textDecoration:'none',borderBottom:'2.5px solid var(--pink-deep)',paddingBottom:2}} aria-current="page">Photobooth</a></li>
            <li><a href="/contact" style={{fontFamily:'var(--font-body)',fontSize:'1rem',fontWeight:700,color:'var(--brown)',textDecoration:'none'}}>Contact</a></li>
            <li><a href="/privacy" style={{fontFamily:'var(--font-body)',fontSize:'1rem',fontWeight:700,color:'var(--brown)',textDecoration:'none'}}>Privacy Policy</a></li>
          </ul>
        </nav>

        <span style={{fontSize:'1.5rem',filter:'drop-shadow(0 0 5px rgba(255,120,180,.5))',flexShrink:0,justifySelf:'end'}} aria-hidden="true">🎀</span>
        <button className={`hamburger${navOpen?' open':''}`} id="hamburger" aria-label="Toggle menu" aria-expanded={navOpen}
          onClick={() => setNavOpen(o => !o)}
          style={{display:'none',flexDirection:'column',justifyContent:'center',gap:5,background:'none',border:'none',cursor:'pointer',padding:4,zIndex:200}}>
          <span style={{display:'block',width:22,height:2.5,background:'var(--pink-deep)',borderRadius:99,transition:'transform .3s, opacity .3s'}}/>
          <span style={{display:'block',width:22,height:2.5,background:'var(--pink-deep)',borderRadius:99,transition:'transform .3s, opacity .3s'}}/>
          <span style={{display:'block',width:22,height:2.5,background:'var(--pink-deep)',borderRadius:99,transition:'transform .3s, opacity .3s'}}/>
        </button>
      </header>

      <main style={{maxWidth:980,margin:'0 auto',padding:'1.5rem 1rem 5rem',position:'relative',zIndex:1}}>
        <a href="/choose-style" style={{display:'inline-flex',alignItems:'center',gap:'.45rem',fontFamily:'var(--font-body)',fontSize:'.92rem',fontWeight:700,color:'#7a5800',textDecoration:'none',background:'radial-gradient(circle at 40% 35%, #fff7a0, #ffd700 60%, #f5b800)',padding:'.55rem 1.3rem .55rem 1rem',borderRadius:999,marginBottom:'1.25rem',letterSpacing:'.02em',boxShadow:'0 0 10px 2px rgba(255,220,0,.55),0 0 28px 6px rgba(255,200,0,.30),0 0 55px 14px rgba(255,180,0,.15),0 3px 10px rgba(200,140,0,.25)',animation:'backGlow 2.4s ease-in-out infinite'}}>← back to style select</a>

        {/* STEP 1: Camera */}
        <div className={`step${step==='camera'?' active':''}`} id="stepCamera">
          <div style={{maxWidth:520,margin:'0 auto',textAlign:'center',position:'relative'}}>
            {[
              {style:{top:'10%',left:'-8%',['--dur' as string]:'3.2s',['--delay' as string]:'0s',['--rot0' as string]:'-10deg',['--rot1' as string]:'10deg'},e:'🌸'},
              {style:{top:'30%',left:'-10%',['--dur' as string]:'2.8s',['--delay' as string]:'.4s',['--rot0' as string]:'-6deg',['--rot1' as string]:'8deg'},e:'🍓'},
              {style:{top:'60%',left:'-7%',['--dur' as string]:'3.5s',['--delay' as string]:'.8s',['--rot0' as string]:'-12deg',['--rot1' as string]:'6deg'},e:'🎀'},
              {style:{top:'80%',left:'-5%',['--dur' as string]:'2.6s',['--delay' as string]:'.2s',['--rot0' as string]:'4deg',['--rot1' as string]:'-10deg'},e:'⭐'},
              {style:{top:'5%',right:'-8%',['--dur' as string]:'3.0s',['--delay' as string]:'.6s',['--rot0' as string]:'8deg',['--rot1' as string]:'-8deg'},e:'💖'},
              {style:{top:'28%',right:'-10%',['--dur' as string]:'3.4s',['--delay' as string]:'0s',['--rot0' as string]:'-5deg',['--rot1' as string]:'12deg'},e:'🌟'},
              {style:{top:'55%',right:'-8%',['--dur' as string]:'2.9s',['--delay' as string]:'1s',['--rot0' as string]:'10deg',['--rot1' as string]:'-5deg'},e:'🐰'},
              {style:{top:'78%',right:'-5%',['--dur' as string]:'3.1s',['--delay' as string]:'.3s',['--rot0' as string]:'-8deg',['--rot1' as string]:'6deg'},e:'✨'},
              {style:{top:'-4%',left:'15%',['--dur' as string]:'2.7s',['--delay' as string]:'.7s',['--rot0' as string]:'-5deg',['--rot1' as string]:'9deg'},e:'🍬'},
              {style:{top:'-4%',right:'20%',['--dur' as string]:'3.3s',['--delay' as string]:'.1s',['--rot0' as string]:'6deg',['--rot1' as string]:'-10deg'},e:'🌷'},
            ].map((item,i)=>(
              <span key={i} style={{position:'absolute',fontSize:'1.6rem',pointerEvents:'none',userSelect:'none',animation:`floatBob ${item.style['--dur']} ease-in-out infinite ${item.style['--delay']}`, ...item.style as React.CSSProperties}} aria-hidden="true">{item.e}</span>
            ))}
            <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,4vw,2rem)',color:'var(--pink-deep)',marginBottom:'.75rem',textShadow:'2px 2px 0 var(--white)'}}>🎀 Polaroid Selfie</h1>
            <p style={{color:'var(--gray)',marginBottom:'1rem'}}>Strike a pose — you've got 5 seconds after you're ready! ♡</p>
            <div style={{position:'relative',borderRadius:20,overflow:'hidden',boxShadow:'0 12px 40px rgba(255,100,160,.3)',background:'#1a0a14',aspectRatio:'1/1'}}>
              <video ref={videoRef} autoPlay playsInline muted style={{width:'100%',height:'100%',objectFit:'cover',display:'block',transform:'scaleX(-1)'}}/>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
                <div className="countdown-num" ref={countNumRef}/>
              </div>
              <div className="flash-cap" ref={flashRef}/>
            </div>
            <canvas ref={canvasRef} style={{display:'none'}}/>
            <div style={{marginTop:'1rem'}}>
              <button
                onClick={startCountdown}
                disabled={!btnReady || counting}
                style={{padding:'.85rem 2.5rem',background:'linear-gradient(145deg,#ffb8d9,var(--pink-deep))',color:'#fff',border:'none',borderRadius:99,cursor:btnReady&&!counting?'pointer':'not-allowed',fontFamily:'var(--font-display)',fontSize:'1.2rem',boxShadow:'0 8px 28px rgba(255,100,160,.4)',transition:'transform .2s, box-shadow .2s',opacity:btnReady&&!counting?1:.5}}>
                {!btnReady ? '⏳ Starting camera…' : counting ? '⏳ Get ready…' : '✨ Ready / Start Pose'}
              </button>
            </div>
            {camError && <p style={{color:'#e06090',marginTop:'.75rem'}}>{camError}</p>}
          </div>
        </div>

        {/* STEP 2: Studio */}
        <div className={`step${step==='studio'?' active':''}`} id="stepStudio">
          <div className="studio-layout" style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'1.5rem',alignItems:'start'}}>
            <div style={{textAlign:'center'}}>
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'1.5rem',color:'var(--pink-deep)',marginBottom:'1rem',textShadow:'2px 2px 0 var(--white)'}}>🌸 Polaroid Design Studio</h2>
              <div style={{display:'inline-block',borderRadius:6,position:'relative',maxWidth:282,lineHeight:0}}>
                <canvas ref={previewCanvasRef} style={{display:'block',borderRadius:6,width:282,height:'auto',boxShadow:'6px 8px 32px rgba(180,120,200,.3)'}}/>
              </div>
              <div style={{display:'flex',gap:'.75rem',justifyContent:'center',marginTop:'1.25rem',flexWrap:'wrap'}}>
                <button onClick={retake} style={{padding:'.7rem 1.5rem',background:'var(--white)',color:'var(--pink-deep)',border:'2px solid var(--pink)',borderRadius:99,cursor:'pointer',fontFamily:'var(--font-display)',fontSize:'1rem'}}>🔄 Retake Photo</button>
                <button onClick={downloadPolaroid} style={{padding:'.7rem 1.5rem',background:'linear-gradient(145deg,#ffb8d9,var(--pink-deep))',color:'#fff',border:'none',borderRadius:99,cursor:'pointer',fontFamily:'var(--font-display)',fontSize:'1rem',boxShadow:'0 6px 20px rgba(255,100,160,.35)'}}>⬇️ Download</button>
              </div>
              <p style={{marginTop:'.75rem'}}><a href="/" style={{color:'var(--gray)',fontSize:'.85rem'}}>← Back to Home</a></p>
            </div>

            <div style={{background:'var(--white)',borderRadius:20,padding:'1rem',boxShadow:'0 8px 28px rgba(180,120,200,.15)',maxHeight:560,overflowY:'auto'}}>
              <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.1rem',color:'var(--pink-deep)',margin:'0 0 .75rem',textAlign:'center'}}>🎨 Pick a Frame</h3>
              {Object.entries(cats).map(([cat, frames]) => (
                <div key={cat} style={{marginBottom:'1rem'}}>
                  <span style={{fontSize:'.72rem',fontWeight:700,letterSpacing:'.08em',color:'var(--gray)',textTransform:'uppercase',marginBottom:'.4rem',padding:'.25rem .5rem',background:'var(--lavender)',borderRadius:99,display:'inline-block'}}>{cat}</span>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem',marginTop:'.4rem'}}>
                    {frames.map(f => (
                      <button
                        key={f.id}
                        title={f.name}
                        onClick={() => setCurrentFrame(f)}
                        style={{width:64,height:80,borderRadius:10,border:`2px solid ${currentFrame.id===f.id?'var(--pink-deep)':'transparent'}`,cursor:'pointer',background:'none',padding:3,transition:'transform .15s, border-color .15s',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,fontSize:'.6rem',color:'var(--brown)',boxShadow:currentFrame.id===f.id?'0 0 0 3px rgba(255,107,168,.3)':'0 2px 8px rgba(180,120,200,.15)'}}>
                        <div style={{width:42,height:54,borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',position:'relative',overflow:'hidden',flexShrink:0,background:f.bg,border:`2px solid ${f.border}`}}>{f.s[0]}</div>
                        <span style={{fontSize:'.5rem',textAlign:'center',lineHeight:1.2,color:'var(--gray)'}}>{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{background:'transparent',padding:'1.25rem 1rem 1.5rem',marginTop:'2.5rem'}}>
        <div className="footer-inner" style={{maxWidth:900,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',borderTop:'1.5px solid rgba(255,160,200,.35)',paddingTop:'1.25rem',flexWrap:'wrap',gap:'.75rem 1.25rem'}}>
          <div className="footer-brand" style={{display:'flex',alignItems:'center',gap:'.65rem'}}>
            <div style={{width:34,height:34,background:'var(--pink-deep)',color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.9rem',flexShrink:0}}>♡</div>
            <div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'.98rem',fontWeight:700,color:'var(--brown)',lineHeight:1.2}}>photobooth kawaii</div>
              <div style={{fontSize:'.75rem',color:'var(--gray)'}}>cute moments, forever ♡</div>
            </div>
          </div>
          <div className="footer-divider" style={{width:1,height:36,background:'rgba(255,160,200,.35)',flexShrink:0}} aria-hidden="true"/>
          <div style={{display:'flex',gap:'.5rem',alignItems:'center'}}>
            <a href="#" aria-label="Instagram" style={{width:34,height:34,background:'var(--pink-deep)',color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.85rem',textDecoration:'none'}}>📷</a>
            <a href="#" aria-label="TikTok" style={{width:34,height:34,background:'var(--pink-deep)',color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.85rem',textDecoration:'none'}}>🎵</a>
            <a href="#" aria-label="Twitter" style={{width:34,height:34,background:'var(--pink-deep)',color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.85rem',textDecoration:'none'}}>🐦</a>
          </div>
          <div className="footer-divider2" style={{width:1,height:36,background:'rgba(255,160,200,.35)',flexShrink:0}} aria-hidden="true"/>
          <p className="copyright" style={{fontSize:'.75rem',color:'var(--gray)',textAlign:'right',margin:0,lineHeight:1.5}}>© 2024 Photobooth Kawaii.<br/>All rights reserved.</p>
        </div>
      </footer>

      {/* GRASS STRIP */}
      <GrassStrip />

      {/* BUTTERFLIES */}
      {[
        {bxDur:'22s',bxDelay:'0s',byDur:'3.0s',byDelay:'0s',flapDur:'.32s',flapDelay:'0s',bottom:'100px',tilt:'-5deg'},
        {bxDur:'17s',bxDelay:'-5s',byDur:'2.6s',byDelay:'.4s',flapDur:'.28s',flapDelay:'.1s',bottom:'130px',tilt:'4deg'},
        {bxDur:'25s',bxDelay:'-10s',byDur:'3.4s',byDelay:'.8s',flapDur:'.36s',flapDelay:'.05s',bottom:'115px',tilt:'-8deg'},
        {bxDur:'19s',bxDelay:'-3s',byDur:'2.8s',byDelay:'.2s',flapDur:'.30s',flapDelay:'.15s',bottom:'145px',tilt:'6deg'},
        {bxDur:'28s',bxDelay:'-14s',byDur:'3.8s',byDelay:'1s',flapDur:'.40s',flapDelay:'0s',bottom:'105px',tilt:'-3deg'},
        {bxDur:'15s',bxDelay:'-7s',byDur:'2.4s',byDelay:'.6s',flapDur:'.26s',flapDelay:'.2s',bottom:'160px',tilt:'9deg'},
      ].map((b,i)=>(
        <span key={i} className="butterfly" aria-hidden="true"
          style={{'--bx-dur':b.bxDur,'--bx-delay':b.bxDelay,'--by-dur':b.byDur,'--by-delay':b.byDelay,'--flap-dur':b.flapDur,'--flap-delay':b.flapDelay,'--bf-bottom':b.bottom,'--tilt':b.tilt} as React.CSSProperties}>🦋</span>
      ))}
    </>
  );
}