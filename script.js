/* ============================================
   Loading Screen
============================================ */
const loadingScreen = document.getElementById('loadingScreen');
const loaderFill = document.getElementById('loaderFill');
let loadPct = 0;

const loadInterval = setInterval(() => {
  loadPct += Math.random() * 18 + 4;
  if (loadPct >= 100) {
    loadPct = 100;
    loaderFill.style.width = '100%';
    clearInterval(loadInterval);
    setTimeout(() => loadingScreen.classList.add('hidden'), 500);
  } else {
    loaderFill.style.width = loadPct + '%';
  }
}, 100);

/* ============================================
   Scroll Progress
============================================ */
const scrollBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = pct + '%';

  // Nav shadow
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 60 ? '0 4px 32px rgba(0,0,0,0.4)' : 'none';
});

/* ============================================
   Custom Cursor
============================================ */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  }, 80);
});

document.addEventListener('mousedown', () => {
  cursor.style.transform   = 'translate(-50%,-50%) scale(0.6)';
  follower.style.transform = 'translate(-50%,-50%) scale(1.4)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
  follower.style.transform = 'translate(-50%,-50%) scale(1)';
});

document.querySelectorAll('a, button, .skill-item, .resultado-card, .projeto-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.transform = 'translate(-50%,-50%) scale(1.6)';
    follower.style.opacity   = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.opacity   = '0.5';
  });
});

/* ============================================
   Theme Toggle
============================================ */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  updateMapTiles();
});

/* ============================================
   Typewriter
============================================ */
const words = ['Analista de Dados', 'Consultor SAP PP', 'Green Belt Six Sigma', 'Especialista em Automação', 'Analista de PCP'];
let wordIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const word = words[wordIdx];
  typeEl.textContent = deleting
    ? word.substring(0, charIdx - 1)
    : word.substring(0, charIdx + 1);

  deleting ? charIdx-- : charIdx++;

  if (!deleting && charIdx === word.length) {
    setTimeout(() => { deleting = true; }, 2200);
  } else if (deleting && charIdx === 0) {
    deleting = false;
    wordIdx = (wordIdx + 1) % words.length;
  }

  setTimeout(type, deleting ? 55 : 95);
}
type();

/* ============================================
   Hero Canvas — Network Particles
============================================ */
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');
const PARTICLES = 90;
let pts = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Pt {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 1.8 + 0.5;
    this.a  = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34,197,94,${this.a})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLES; i++) pts.push(new Pt());

(function animCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pts.forEach(p => { p.update(); p.draw(); });
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(34,197,94,${0.12*(1-d/130)})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animCanvas);
})();

/* ============================================
   Parallax Hero
============================================ */
const heroContent = document.getElementById('heroContent');
const heroMetrics = document.getElementById('heroMetrics');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroContent) heroContent.style.transform = `translateY(${y * 0.28}px)`;
  if (heroMetrics) heroMetrics.style.transform = `translateY(${y * 0.14}px)`;
});

/* ============================================
   Counter Animation
============================================ */
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const v = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    el.textContent = v.toLocaleString('pt-BR');
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}

/* ============================================
   Intersection Observer — Reveal & Counters & Bars
============================================ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.getAttribute('data-target')));
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.getAttribute('data-width') + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.prof-fill').forEach(el => barObs.observe(el));

/* ============================================
   3D Tilt on Cards
============================================ */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r   = card.getBoundingClientRect();
    const x   = e.clientX - r.left;
    const y   = e.clientY - r.top;
    const cx  = r.width  / 2;
    const cy  = r.height / 2;
    const rx  = (y - cy) / cy * -7;
    const ry  = (x - cx) / cx *  7;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ============================================
   Magnetic Buttons
============================================ */
document.querySelectorAll('.mag-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r  = btn.getBoundingClientRect();
    const x  = (e.clientX - r.left - r.width  / 2) * 0.18;
    const y  = (e.clientY - r.top  - r.height / 2) * 0.18;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ============================================
   Leaflet Map
============================================ */
const map = L.map('map', { center: [-15.78, -47.93], zoom: 4 });
let tileLayer;

function updateMapTiles() {
  const dark = html.getAttribute('data-theme') === 'dark';
  if (tileLayer) map.removeLayer(tileLayer);
  tileLayer = L.tileLayer(
    dark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { attribution: '© OpenStreetMap contributors © CARTO', maxZoom: 19 }
  ).addTo(map);
}
updateMapTiles();

const cities = [
  { name: 'São Paulo',      lat: -23.5505, lng: -46.6333, status: 'hub'       },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, status: 'delivered' },
  { name: 'Belo Horizonte', lat: -19.9167, lng: -43.9345, status: 'transit'   },
  { name: 'Curitiba',       lat: -25.4284, lng: -49.2733, status: 'hub'       },
  { name: 'Porto Alegre',   lat: -30.0346, lng: -51.2177, status: 'transit'   },
  { name: 'Salvador',       lat: -12.9714, lng: -38.5014, status: 'pending'   },
  { name: 'Fortaleza',      lat:  -3.7172, lng: -38.5433, status: 'pending'   },
  { name: 'Manaus',         lat:  -3.1190, lng: -60.0217, status: 'transit'   },
  { name: 'Recife',         lat:  -8.0476, lng: -34.8770, status: 'delivered' },
  { name: 'Brasília',       lat: -15.7801, lng: -47.9292, status: 'hub'       },
  { name: 'Goiânia',        lat: -16.6869, lng: -49.2648, status: 'delivered' },
  { name: 'Campo Grande',   lat: -20.4697, lng: -54.6201, status: 'transit'   },
];

const sColors = { hub: '#22c55e', delivered: '#22c55e', transit: '#f59e0b', pending: '#ef4444' };
const sLabels = { hub: 'Hub Central', delivered: 'Entregue', transit: 'Em Trânsito', pending: 'Pendente' };

cities.forEach(c => {
  L.circleMarker([c.lat, c.lng], {
    radius: c.status === 'hub' ? 11 : 7,
    fillColor: sColors[c.status], color: '#fff',
    weight: c.status === 'hub' ? 2 : 1,
    fillOpacity: 0.85, opacity: 0.9
  }).addTo(map).bindPopup(
    `<strong style="font-family:Inter,sans-serif">${c.name}</strong><br>
     <span style="color:${sColors[c.status]};font-size:0.82rem;font-weight:600">● ${sLabels[c.status]}</span>`
  );
});

[[0,1],[0,2],[0,3],[3,4],[0,5],[5,6],[6,8],[9,2],[9,5],[0,7],[9,10],[10,11],[11,0]]
  .forEach(([a,b]) => L.polyline(
    [[cities[a].lat, cities[a].lng],[cities[b].lat, cities[b].lng]],
    { color: '#3b82f6', weight: 1.5, opacity: 0.4, dashArray: '6,10' }
  ).addTo(map));

/* ============================================
   Charts
============================================ */
const grid  = 'rgba(148,163,184,0.07)';
const tick  = '#94a3b8';
const scales = {
  x: { grid: { color: grid }, ticks: { color: tick, font: { size: 11 } } },
  y: { grid: { color: grid }, ticks: { color: tick, font: { size: 11 } } }
};

new Chart(document.getElementById('chartEntregas'), {
  type: 'bar',
  data: {
    labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    datasets: [{ data: [320,410,380,520,480,610,590,720,680,800,750,920],
      backgroundColor: 'rgba(34,197,94,0.55)', borderColor: '#22c55e',
      borderWidth: 1, borderRadius: 5 }]
  },
  options: { responsive: true, plugins: { legend: { display: false } }, scales }
});

new Chart(document.getElementById('chartCusto'), {
  type: 'line',
  data: {
    labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    datasets: [{ data: [100,96,93,89,84,79,75,71,68,65,62,60],
      borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.08)',
      fill: true, tension: 0.4, borderWidth: 2.5,
      pointBackgroundColor: '#22c55e', pointRadius: 4 }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false },
      tooltip: { callbacks: { label: c => `Índice: ${c.raw}%` } } },
    scales
  }
});

new Chart(document.getElementById('chartABC'), {
  type: 'doughnut',
  data: {
    labels: ['Categoria A (70%)', 'Categoria B (20%)', 'Categoria C (10%)'],
    datasets: [{ data: [70,20,10],
      backgroundColor: ['#22c55e','#3b82f6','#f59e0b'],
      borderWidth: 0, hoverOffset: 6 }]
  },
  options: {
    responsive: true, cutout: '68%',
    plugins: { legend: { display: true, position: 'bottom',
      labels: { color: '#94a3b8', padding: 14, font: { size: 11 } } } }
  }
});

new Chart(document.getElementById('chartSLA'), {
  type: 'bar',
  data: {
    labels: ['No prazo', 'Atraso < 1d', 'Atraso 1-3d', 'Atraso > 3d'],
    datasets: [{ data: [92,5,2,1],
      backgroundColor: ['#22c55e','#f59e0b','#f97316','#ef4444'],
      borderRadius: 5 }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false },
      tooltip: { callbacks: { label: c => `${c.raw}%` } } },
    scales: { ...scales, y: { ...scales.y, max: 100,
      ticks: { ...scales.y.ticks, callback: v => v + '%' } } }
  }
});

/* ============================================
   Project Modal
============================================ */
const projects = {
  wms3d: {
    emoji: '📦', tag: 'WMS + IA', title: 'Smart WMS 3D',
    desc: 'Sistema de visualização 3D de armazém inteligente com análise ABC automatizada e IA para otimização do posicionamento de produtos. Reduz o tempo de picking em até 40% ao posicionar produtos de alta rotatividade nas melhores localizações do armazém.',
    features: [
      'Visualização 3D interativa do layout completo do armazém',
      'Análise ABC automática por curva de rotatividade e valor',
      'IA para sugestão de relocação de produtos por categoria',
      'Dashboard de ocupação e eficiência por corredor e prateleira',
    ],
    tech: ['Python', 'Three.js', 'Pandas', 'Scikit-learn', 'FastAPI'],
    resultado: '40% redução no tempo de picking',
    link: 'https://github.com/welitonbarbosa405-code/wms-3d-inteligente',
    images: [
      'projetos/wms-3d/capa1.png',
      'projetos/wms-3d/barracao.png',
      'projetos/wms-3d/prateleira1.png',
      'projetos/wms-3d/curva_abc.png',
      'projetos/wms-3d/top20.png',
      'projetos/wms-3d/comparador.png',
      'projetos/wms-3d/heatmap.png',
      'projetos/wms-3d/timeline.png',
      'projetos/wms-3d/estoque.png',
    ],
  },
  plataforma: {
    emoji: '🚀', tag: 'Tempo Real', title: 'Plataforma Logística',
    desc: 'Plataforma completa de gestão logística com módulos de portaria eletrônica, roteirização inteligente e rastreamento em tempo real. Integra múltiplos players da cadeia logística em um único painel de controle.',
    features: [
      'Portaria eletrônica com controle de entrada e saída de veículos',
      'Roteirização automática por menor custo ou menor tempo',
      'Rastreamento em tempo real com alertas por status de entrega',
      'Integração com múltiplas transportadoras via API REST',
    ],
    tech: ['Python', 'FastAPI', 'WebSocket', 'Leaflet.js', 'PostgreSQL'],
    resultado: '5.000+ entregas monitoradas',
    link: 'https://github.com/welitonbarbosa405-code/plataforma-logistica-tempo-real',
    images: [
      'projetos/plataforma-logistica/login.png',
      'projetos/plataforma-logistica/cadastro_motorista.png',
      'projetos/plataforma-logistica/entrada_saida.png',
      'projetos/plataforma-logistica/janela.png',
      'projetos/plataforma-logistica/horarios.png',
      'projetos/plataforma-logistica/onibus.png',
      'projetos/plataforma-logistica/roteirizacao4.png',
      'projetos/plataforma-logistica/roteirizacao5.png',
      'projetos/plataforma-logistica/roteirizacao6.png',
      'projetos/plataforma-logistica/roteirizacao8.png',
      'projetos/plataforma-logistica/roteirizacao9.png',
      'projetos/plataforma-logistica/roteirizacao10.png',
    ],
  },
  reporte: {
    emoji: '📊', tag: 'Analytics', title: 'Sistema de Reporte',
    desc: 'Sistema de padronização e automação de relatórios comerciais e logísticos para a Kuhn Parts Brasil, eliminando processos manuais repetitivos e garantindo consistência e velocidade nas análises gerenciais.',
    features: [
      'Geração automática de relatórios mensais consolidados',
      'Padronização de KPIs entre departamentos comercial e logístico',
      'Análise comparativa de dados de estoque e vendas',
      'Envio automático por e-mail aos gestores com agendamento',
    ],
    tech: ['Python', 'Pandas', 'SQL Server', 'Power BI', 'Openpyxl'],
    resultado: '8h/semana economizadas por analista',
    link: 'https://github.com/welitonbarbosa405-code/sistema-reporte-mensal-kuhn',
    images: [
      'projetos/sistema-reporte/login.png',
      'projetos/sistema-reporte/sistema.png',
      'projetos/sistema-reporte/formulario.png',
      'projetos/sistema-reporte/pdf_reporte.png',
    ],
  },
  integrada: {
    emoji: '🏢', tag: 'Integração', title: 'Sistema de Logística Integrada',
    desc: 'Sistema ERP logístico completo com integração de CTe, controle de estoque, gestão de custos e operações logísticas end-to-end, trazendo visibilidade total da cadeia de suprimentos.',
    features: [
      'Leitura e validação automática de CTe via XML',
      'Controle de estoque em tempo real com alertas de ruptura',
      'Gestão de custos por operação, rota e transportadora',
      'Integração via API com fornecedores e transportadoras',
    ],
    tech: ['Python', 'API REST', 'XML/CTe', 'SQLite', 'Requests'],
    resultado: '98% de precisão no controle de estoque',
    link: 'https://github.com/welitonbarbosa405-code/sistema-logistica',
    images: [
      'projetos/sistema-logistica/login.png',
      'projetos/sistema-logistica/sistema.png',
      'projetos/sistema-logistica/rastreamento.png',
      'projetos/sistema-logistica/rastreamento2.png',
      'projetos/sistema-logistica/expedicao.png',
      'projetos/sistema-logistica/consumiveis.png',
      'projetos/sistema-logistica/acuracidade1.png',
      'projetos/sistema-logistica/acuracidade2.png',
      'projetos/sistema-logistica/acuracidade3.png',
      'projetos/sistema-logistica/lancamentos_fiscais.png',
      'projetos/sistema-logistica/divergencia_notas.png',
      'projetos/sistema-logistica/gestao_feiras.png',
    ],
  },
};

const modal      = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

// Carousel state
let carouselImages = [];
let carouselIndex  = 0;

function setCarouselSlide(idx) {
  const img     = document.getElementById('carouselImg');
  const counter = document.getElementById('carouselCounter');
  const dots    = document.querySelectorAll('.carousel-dot');

  img.classList.add('fade');
  setTimeout(() => {
    img.src = carouselImages[idx];
    img.classList.remove('fade');
  }, 180);

  counter.textContent = `${idx + 1} / ${carouselImages.length}`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  carouselIndex = idx;
}

function buildDots(count) {
  const dotsEl = document.getElementById('carouselDots');
  dotsEl.innerHTML = Array.from({ length: count }, (_, i) =>
    `<span class="carousel-dot${i === 0 ? ' active' : ''}" data-i="${i}"></span>`
  ).join('');
  dotsEl.querySelectorAll('.carousel-dot').forEach(d => {
    d.addEventListener('click', () => setCarouselSlide(parseInt(d.getAttribute('data-i'))));
  });
}

document.getElementById('carouselPrev').addEventListener('click', () => {
  setCarouselSlide((carouselIndex - 1 + carouselImages.length) % carouselImages.length);
});
document.getElementById('carouselNext').addEventListener('click', () => {
  setCarouselSlide((carouselIndex + 1) % carouselImages.length);
});

// Swipe support
let touchStartX = 0;
document.getElementById('carousel').addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
document.getElementById('carousel').addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) dx < 0
    ? setCarouselSlide((carouselIndex + 1) % carouselImages.length)
    : setCarouselSlide((carouselIndex - 1 + carouselImages.length) % carouselImages.length);
});

// Lightbox
const lightbox    = document.createElement('div');
lightbox.className = 'lightbox';
const lightboxImg  = document.createElement('img');
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

document.getElementById('carouselImg').addEventListener('click', () => {
  lightboxImg.src = carouselImages[carouselIndex];
  lightbox.classList.add('active');
});
lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

function openModal(id) {
  const p = projects[id];
  if (!p) return;

  document.getElementById('modalEmoji').textContent     = p.emoji;
  document.getElementById('modalTag').textContent       = p.tag;
  document.getElementById('modalTitle').textContent     = p.title;
  document.getElementById('modalDesc').textContent      = p.desc;
  document.getElementById('modalResultado').textContent = '🎯 ' + p.resultado;
  document.getElementById('modalLink').href             = p.link;

  document.getElementById('modalFeatures').innerHTML =
    p.features.map(f => `<li>${f}</li>`).join('');
  document.getElementById('modalTech').innerHTML =
    p.tech.map(t => `<span>${t}</span>`).join('');

  // Carousel
  carouselImages = p.images || [];
  carouselIndex  = 0;
  if (carouselImages.length > 0) {
    document.getElementById('carousel').style.display = 'block';
    buildDots(carouselImages.length);
    document.getElementById('carouselImg').src = carouselImages[0];
    document.getElementById('carouselCounter').textContent = `1 / ${carouselImages.length}`;
  } else {
    document.getElementById('carousel').style.display = 'none';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => openModal(card.getAttribute('data-project')));
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ============================================
   Contact Form
============================================ */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const btn    = e.target.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

  setTimeout(() => {
    status.textContent = '✓ Mensagem recebida! Entrarei em contato em breve.';
    status.style.color = '#22c55e';
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
    e.target.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  }, 1200);
});
