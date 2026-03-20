// Particle canvas
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1,
      c: Math.random() > 0.5 ? '74,158,255' : '123,111,255'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.o})`;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(74,158,255,${0.06 * (1 - dist/100)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Auth modal
function showAuth(type) {
  const modal = document.getElementById('auth-modal');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (!modal) return;
  if (loginForm) loginForm.classList.toggle('hidden', type !== 'login');
  if (signupForm) signupForm.classList.toggle('hidden', type !== 'signup');
  modal.classList.add('active');
}

function closeAuth(e) {
  if (e.target.id === 'auth-modal') closeAuthDirect();
}
function closeAuthDirect() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.remove('active');
}

// Toggle password
function togglePwd(btn) {
  const input = btn.closest('.input-wrap').querySelector('input');
  input.type = input.type === 'password' ? 'text' : 'password';
}

// Password strength
function checkStrength(val) {
  const fill = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');
  if (!fill) return;
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const levels = [
    {w:'0%', c:'transparent', l:'Weak'},
    {w:'25%', c:'#ef4444', l:'Weak'},
    {w:'50%', c:'#f97316', l:'Fair'},
    {w:'75%', c:'#eab308', l:'Good'},
    {w:'100%', c:'#22c55e', l:'Strong'}
  ];
  const lvl = levels[score];
  fill.style.width = lvl.w;
  fill.style.background = lvl.c;
  label.textContent = lvl.l;
  label.style.color = lvl.c;
}

// Toast
function showToast(title, msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon"></div>
      <div class="toast-text"><strong></strong><p></p></div>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('strong').textContent = title;
  toast.querySelector('p').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Updated Login handler
function handleLogin(e) {
  e.preventDefault();
  
  // Grab the email the user typed in
  const emailInput = e.target.querySelector('input[type="email"]');
  const email = emailInput ? emailInput.value : '';

  const btn = e.target.querySelector('button[type=submit]');
  const btnText = btn.querySelector('span');
  const btnLoader = '<span class="btn-loader" style="display:inline-block;width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;"></span>';
  
  // Show loading animation on the button
  btnText.style.display = 'none';
  btn.innerHTML = btnLoader;
  
  showToast('Welcome back!', 'Verifying credentials…');
  
  setTimeout(() => {
    // Smart Routing: Check if it's the admin email
    if (email === 'admin@hive.com') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'dashboard.html';
    }
  }, 1200);
}

// Navbar scroll
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.style.background = window.scrollY > 10 ? 'rgba(5,8,15,.95)' : 'rgba(5,8,15,.7)';
});
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('sessions.html')) {
    loadSampleSessions();
  }
});

function loadSampleSessions() {
  const container = document.getElementById('sessions-container');
  if (!container) return;

  const sessions = [
    { title: 'JavaScript Advanced', tutor: 'Jal Patel', status: 'live', seu: 40, time: 'Live Now' },
    { title: 'Machine Learning Basics', tutor: 'Smit Thakar', status: 'upcoming', seu: 60, time: 'Starts in 10min' },
    { title: 'Spoken English Practice', tutor: 'You (Vandan)', status: 'upcoming', seu: 25, time: 'Tomorrow 5PM' }
  ];

  container.innerHTML = sessions.map(session => `
    <div class="session-card">
      <div class="session-header">
        <div class="session-avatar">${session.title.charAt(0)}</div>
        <div class="session-info">
          <h4>${session.title}</h4>
          <p>${session.tutor} • ${session.seu} SEU</p>
        </div>
        <div class="session-status ${session.status}">
          <span class="status-dot ${session.status}"></span>
          <span>${session.time}</span>
        </div>
      </div>
      <button class="btn-primary btn-sm">Join Session</button>
    </div>
  `).join('');

  showToast('Sessions loaded!', '3 active/upcoming sessions');
}


// Spin keyframe
const style = document.createElement('style');
style.textContent = '@keyframes spin{to{transform:rotate(360deg)}} .toast{position:fixed;bottom:28px;right:28px;background:#0d1120;border:1px solid rgba(74,158,255,.3);border-radius:14px;padding:16px 22px;color:#e8eaf0;display:flex;align-items:center;gap:12px;transform:translateX(400px);transition:transform .4s;} .toast.show{transform:translateX(0);}';
document.head.appendChild(style);
// Skill progress chart
function initChart() {
  const canvas = document.getElementById('skillChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const skills = ['JavaScript', 'Python', 'ML', 'UI/UX', 'English'];
  const progress = [85, 72, 65, 58, 90];
  const maxWidth = 240;
  const barHeight = 24;
  const padding = 40;
  
  ctx.fillStyle = 'rgba(13,17,32,0.8)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  skills.forEach((skill, i) => {
    const x = padding;
    const y = padding + i * 32;
    const barWidth = (progress[i] / 100) * maxWidth;
    
    // Background bar
    ctx.fillStyle = 'rgba(148,163,184,0.3)';
    ctx.fillRect(x, y + 4, maxWidth, barHeight);
    
    // Progress bar
    const grad = ctx.createLinearGradient(x, y, x + barWidth, y);
    grad.addColorStop(0, '#4A9EFF');
    grad.addColorStop(1, '#7B6FFF');
    ctx.fillStyle = grad;
    ctx.fillRect(x, y + 4, barWidth, barHeight);
    
    // Label
    ctx.fillStyle = '#e8eaf0';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(skill, x + 8, y + 16);
    
    // Progress text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(progress[i] + '%', x + maxWidth - 8, y + 16);
  });
}

// Initialize chart when page loads
if (document.getElementById('skillChart')) {
  initChart();
}
