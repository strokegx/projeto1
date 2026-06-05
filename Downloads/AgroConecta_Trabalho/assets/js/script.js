
// ===== NAVIGATION =====
function mostrarPagina(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.getElementById('nav-' + page).classList.add('active');
  window.scrollTo(0, 0);
  if (page === 'dashboard') inicializarDashboard();
  if (page === 'home') animarEstatisticas();
}

function alternarMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== HOME STATS ANIMATION =====
function animarEstatisticas() {
  animarNumero('s1', 40, '%');
  animarNumero('s2', 25, '%');
  animarNumero('s3', 98, '%');
  animarNumero('s4', 320, '+');
}
function animarNumero(id, target, suffix) {
  const el = document.getElementById(id);
  let cur = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = (suffix === '+' ? Math.round(cur) : Math.round(cur)) + suffix;
    if (cur >= target) clearInterval(timer);
  }, 30);
}

// ===== SIMULATOR =====
function calcularImpacto() {
  const prod = parseFloat(document.getElementById('producao').value) || 500;
  const desp = parseFloat(document.getElementById('desperdicio').value) / 100;
  const preco = parseFloat(document.getElementById('preco').value) || 4.5;
  const dist = document.getElementById('distancia').value;

  const fatorReducao = 0.4; // AgroConecta reduz desperdício em 40%
  const kgSalvos = prod * desp * fatorReducao;
  const ganhoPorSemana = kgSalvos * preco;
  const ganhoMensal = ganhoPorSemana * 4.3;

  const fretes = { curta: 'R$ 80–120/semana', media: 'R$ 150–220/semana', longa: 'R$ 280–350/semana' };

  document.getElementById('r1').textContent = '-' + Math.round(desp * 40) + '% de perdas';
  document.getElementById('r2').textContent = kgSalvos.toFixed(0) + ' kg/semana';
  document.getElementById('r3').textContent = 'R$ ' + ganhoMensal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  document.getElementById('r4').textContent = fretes[dist];

  document.getElementById('resultPanel').classList.add('show');
  mostrarNotificacao('📊', 'Cálculo concluído!', 'Veja seu impacto potencial com AgroConecta.');
}

function simularPedido() {
  const rest = document.getElementById('restaurante').value;
  const prod = document.getElementById('produto').value;
  const produtores = ['José (Fazenda Boa Vista)', 'Ana (Sítio Verde)', 'Carlos (Cooperativa Vale)'];
  const produtor = produtores[Math.floor(Math.random() * produtores.length)];
  const horas = Math.floor(Math.random() * 12) + 6;

  const div = document.getElementById('pedidoResult');
  div.style.display = 'block';
  div.innerHTML = `
    <div style="color:var(--pink);font-weight:700;font-family:'Syne',sans-serif;margin-bottom:.5rem;">✅ Pedido Simulado com Sucesso</div>
    <b>Restaurante:</b> ${rest}<br>
    <b>Produto:</b> ${prod}<br>
    <b>Fornecedor alocado:</b> ${produtor}<br>
    <b>Rota otimizada:</b> Produtor → Hub Central → Restaurante<br>
    <b>Previsão de entrega:</b> ${horas}h após confirmação<br>
    <b>Rastreabilidade:</b> Ponta a ponta garantida
  `;
  mostrarNotificacao('📦', 'Pedido simulado!', `${prod} alocado via ${produtor}`);
}

// ===== DASHBOARD =====
function inicializarDashboard() {
  // Animate KPIs
  animarNumeroDash('kpi1', 47, '');
  animarNumeroDash('kpi2', 2840, '');
  animarNumeroDash('kpi3', 1136, ' kg');
  animarNumeroDash('kpi4', 38200, 'R$ ', true);

  // Bar chart
  const weeks = ['S18','S19','S20','S21','S22','S23'];
  const vals = [1800,2100,1950,2400,2650,2840];
  const max = Math.max(...vals);
  const chart = document.getElementById('barChart');
  chart.innerHTML = '';
  weeks.forEach((w, i) => {
    const h = (vals[i] / max * 120);
    chart.innerHTML += `
      <div class="bar-wrap">
        <div class="bar-val">${vals[i]}</div>
        <div class="bar ${i===weeks.length-1?'':'secondary'}" style="height:${h}px;"></div>
        <div class="bar-label">${w}</div>
      </div>`;
  });

  // Orders
  const orders = [
    ['Bistrô Verde', 'Alface 15kg', '15 kg', 'ativo'],
    ['Rest. Orgânico SP', 'Mix Folhas 10kg', '10 kg', 'entregue'],
    ['Cozinha Natural', 'Tomate 20kg', '20 kg', 'ativo'],
    ['Cantina Saudável', 'Abóbora 12kg', '12 kg', 'pendente'],
    ['Empório do Campo', 'Couve 8kg', '8 kg', 'entregue'],
  ];
  document.getElementById('ordersBody').innerHTML = orders.map(o => `
    <tr>
      <td>${o[0]}</td><td>${o[1]}</td><td>${o[2]}</td>
      <td><span class="badge ${o[3]}">${o[3].toUpperCase()}</span></td>
    </tr>`).join('');

  // Producers
  const producers = [
    ['JB', 'José Batista', 'Campinas, SP', '4.9'],
    ['AM', 'Ana Martins', 'Ibiúna, SP', '4.8'],
    ['CR', 'Carlos Rocha', 'Atibaia, SP', '4.7'],
    ['FL', 'Fátima Lima', 'Jundiaí, SP', '4.9'],
  ];
  document.getElementById('producerList').innerHTML = producers.map(p => `
    <div class="producer-item">
      <div class="producer-avatar">${p[0]}</div>
      <div class="producer-info">
        <div class="producer-name">${p[1]}</div>
        <div class="producer-loc">📍 ${p[2]}</div>
      </div>
      <div class="producer-score">⭐ ${p[3]}</div>
    </div>`).join('');
}

function animarNumeroDash(id, target, suffix, isMoney = false) {
  const el = document.getElementById(id);
  let cur = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    const val = Math.round(cur);
    el.textContent = isMoney
      ? 'R$ ' + val.toLocaleString('pt-BR')
      : suffix + val.toLocaleString('pt-BR') + (suffix && !isMoney ? suffix : '');
    if (cur >= target) { el.textContent = isMoney ? 'R$ ' + target.toLocaleString('pt-BR') : target.toLocaleString('pt-BR') + suffix; clearInterval(timer); }
  }, 25);
}

// ===== CONTACT =====
let tipoSelecionado = null;
function selecionarTipo(tipo, el) {
  tipoSelecionado = tipo;
  document.getElementById('card-produtor').style.borderColor = '';
  document.getElementById('card-restaurante').style.borderColor = '';
  el.style.borderColor = 'var(--pink)';
}

function enviarContato() {
  const nome = document.getElementById('f-nome').value;
  const email = document.getElementById('f-email').value;
  if (!nome || !email) {
    mostrarNotificacao('⚠️', 'Campos obrigatórios', 'Por favor preencha nome e email.');
    return;
  }
  document.getElementById('formSuccess').style.display = 'block';
  mostrarNotificacao('🌱', 'Sucesso!', 'Bem-vindo à rede AgroConecta, ' + nome + '!');
}

// ===== TOAST =====
let toastTimer;
function mostrarNotificacao(icon, title, body) {
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastBody').textContent = body;
  const t = document.getElementById('toast');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(fecharNotificacao, 4000);
}
function fecharNotificacao() { document.getElementById('toast').classList.remove('show'); }

// Init
animarEstatisticas();
