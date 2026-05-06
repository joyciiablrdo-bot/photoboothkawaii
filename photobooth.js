// ===== PHOTOBOOTH JS =====
let currentFrame = null;
let capturedPhotos = [];
let isShooting = false;

// Start camera
async function startCamera() {
  const video = document.getElementById('video');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 }, audio: false });
    video.srcObject = stream;
  } catch(e) {
    alert('📷 Camera access denied or unavailable.\nPlease allow camera permission and reload.');
  }
}

// Render frame picker
function renderFramePicker() {
  const picker = document.getElementById('framePicker');
  if (!picker || !window.framesData) return;

  window.framesData.forEach(fr => {
    const btn = document.createElement('button');
    btn.className = 'frame-mini-btn';
    btn.innerHTML = `<span class="frame-mini-icon" style="background:${fr.bg}">${fr.emoji}</span>${fr.name}`;
    btn.onclick = () => selectFrame(fr, btn);
    picker.appendChild(btn);
  });

  // Auto-select from URL param
  const params = new URLSearchParams(location.search);
  const frameId = parseInt(params.get('frame'));
  if (frameId) {
    const fr = window.framesData.find(f => f.id === frameId);
    if (fr) {
      const btns = picker.querySelectorAll('.frame-mini-btn');
      selectFrame(fr, btns[frameId - 1]);
    }
  }
}

function selectFrame(fr, btn) {
  currentFrame = fr;
  // Update active btn
  document.querySelectorAll('.frame-mini-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // Update visual deco
  const wrapper = document.getElementById('frameWrapper');
  const deco = document.getElementById('frameDeco');
  wrapper.style.borderColor = fr.border;
  wrapper.style.boxShadow = `0 8px 32px ${fr.border}55`;
  deco.textContent = fr.emoji + ' ' + fr.emoji;
  deco.style.background = `linear-gradient(180deg, ${fr.bg}CC 0%, transparent 30%)`;
  // Scroll into view
  if (btn) btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// Countdown then capture
function startCountdown(callback) {
  if (isShooting) return;
  isShooting = true;
  disableButtons(true);
  const el = document.getElementById('countdown');
  let count = 3;
  el.textContent = count;
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      el.textContent = count;
    } else {
      clearInterval(interval);
      el.textContent = '📸';
      setTimeout(() => {
        el.textContent = '';
        capturePhoto();
        isShooting = false;
        disableButtons(false);
        if (callback) callback();
      }, 400);
    }
  }, 900);
}

function capturePhoto() {
  const video = document.getElementById('video');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  // Flip horizontally (mirror)
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);
  // Flash effect
  flashEffect();
  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  addPhotoToStrip(dataUrl);
  return dataUrl;
}

function flashEffect() {
  const flash = document.getElementById('pbFlash');
  flash.classList.add('flash-on');
  setTimeout(() => flash.classList.remove('flash-on'), 150);
}

function addPhotoToStrip(dataUrl) {
  capturedPhotos.push(dataUrl);
  const preview = document.getElementById('stripPreview');
  // Remove empty message
  const empty = preview.querySelector('.empty-msg');
  if (empty) empty.remove();

  const div = document.createElement('div');
  div.className = 'strip-photo';
  const img = document.createElement('img');
  img.src = dataUrl;
  img.style.transform = 'none'; // already flipped in canvas
  div.appendChild(img);
  preview.appendChild(div);

  document.getElementById('btnDownload').style.display = 'inline-block';
}

// Take 3 strip
function startStrip() {
  if (isShooting) return;
  capturedPhotos = [];
  document.getElementById('stripPreview').innerHTML = '';
  let taken = 0;
  function takeNext() {
    if (taken >= 3) return;
    taken++;
    startCountdown(() => { setTimeout(takeNext, 600); });
  }
  takeNext();
}

// Download strip as image
function downloadStrip() {
  if (capturedPhotos.length === 0) return;
  const W = 300, photoH = 225, padding = 12, gap = 8;
  const totalH = padding * 2 + capturedPhotos.length * photoH + (capturedPhotos.length - 1) * gap + 50;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = totalH;
  const ctx = canvas.getContext('2d');

  // Background
  const bg = currentFrame ? currentFrame.bg : '#FCE4EC';
  ctx.fillStyle = bg;
  ctx.roundRect ? ctx.roundRect(0,0,W,totalH,16) : ctx.fillRect(0,0,W,totalH);
  ctx.fill();

  // Load and draw each photo
  let loaded = 0;
  capturedPhotos.forEach((src, i) => {
    const img = new Image();
    img.onload = () => {
      const y = padding + i * (photoH + gap);
      ctx.drawImage(img, padding, y, W - padding*2, photoH);
      loaded++;
      if (loaded === capturedPhotos.length) {
        // Footer text
        ctx.fillStyle = currentFrame ? currentFrame.border : '#F44E7F';
        ctx.font = 'bold 14px Nunito, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Photobooth Kawaii 🎀', W/2, totalH - padding);
        // Download
        const a = document.createElement('a');
        a.download = 'kawaii-photobooth.jpg';
        a.href = canvas.toDataURL('image/jpeg', 0.92);
        a.click();
      }
    };
    img.src = src;
  });
}

function disableButtons(disabled) {
  document.getElementById('btnShoot').disabled = disabled;
  document.getElementById('btnStrip').disabled = disabled;
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    startCamera();
    renderFramePicker();
  }, 400);
});