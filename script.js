function updateCountdown() {
  const now = new Date();
  const birthday = new Date(2026, 2, 12); // March 12 (months start from 0)

  const diff = birthday - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.querySelector(".days h2").textContent = days + " DAYS";
  document.querySelector(".hours h2").textContent = hours + " HOURS";
  document.querySelector(".minutes h2").textContent = minutes + " MINS";
  document.querySelector(".seconds h2").textContent = seconds + " SECS";
}

setInterval(updateCountdown, 1000);
updateCountdown();

const symbols = ['💕', '🌸', '✨', '💖', '🌹', '💫', '🎀'];

function spawnHeart() {
  const heart = document.createElement('span');
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.bottom = '-50px';
  heart.style.fontSize = (1 + Math.random()) + 'rem';
  heart.style.animation = `floatUp ${7 + Math.random() * 8}s linear forwards`;
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '0';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 15000);
}

setInterval(spawnHeart, 1800);

const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '0';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const pieces = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height - canvas.height,
  r: 4 + Math.random() * 6,
  d: 2 + Math.random() * 3,
  color: ['#e8567a','#f7c5d0','#d4a853','#f9d4b0','#b8d4e8'][Math.floor(Math.random() * 5)],
  tilt: Math.random() * 10 - 10,
  tiltAngle: 0,
  tiltSpeed: 0.07 + Math.random() * 0.05
}));

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r / 2;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
    ctx.stroke();

    p.tiltAngle += p.tiltSpeed;
    p.y += (Math.cos(p.d) + 1 + p.r / 2) * 0.6;
    p.tilt = Math.sin(p.tiltAngle) * 15;

    if (p.y > canvas.height) {
      p.x = Math.random() * canvas.width;
      p.y = -20;
    }
  });
  requestAnimationFrame(drawConfetti);
}

drawConfetti();


const password = "divine2026";

const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.background = "#fdf6ee";
overlay.style.display = "flex";
overlay.style.flexDirection = "column";
overlay.style.alignItems = "center";
overlay.style.justifyContent = "center";
overlay.style.zIndex = "9999";

overlay.innerHTML = `
  <h2 style="font-family: 'Playfair Display', serif; color: #e8567a; font-size: 2rem; margin-bottom: 10px;">🔒 Enter Password</h2>
  <p style="font-family: 'Lato', sans-serif; color: #5a3a45; margin-bottom: 20px;">This page is private 💕</p>
  <input id="pass-input" type="password" placeholder="Enter password..." style="padding: 12px 20px; border-radius: 100px; border: 2px solid #e8567a; outline: none; font-size: 1rem; text-align: center;" />
  <button id="pass-btn" style="margin-top: 12px; padding: 12px 30px; background: #e8567a; color: white; border: none; border-radius: 100px; font-size: 1rem; cursor: pointer;">Enter 💕</button>
  <p id="pass-error" style="color: red; margin-top: 10px; display: none;">Wrong password! Try again 😅</p>
`;

document.body.appendChild(overlay);

document.getElementById("pass-btn").addEventListener("click", function() {
  const input = document.getElementById("pass-input").value;
  if (input === password) {
    overlay.remove();
  } else {
    document.getElementById("pass-error").style.display = "block";
  }
});