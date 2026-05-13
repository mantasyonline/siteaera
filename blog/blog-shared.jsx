// Shared utilities for AERA blog: placeholders, icons, brand tokens, sample data

// Hook: detecta mobile (≤768px) e reage ao resize
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= breakpoint);
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

const BRAND = {
  blue: '#1877F2',
  blueDark: '#1462CC',
  navy: '#0A1628',
  green: '#22C55E',
  bg: '#F8FAFE',
  bgAlt: '#F0F4FB',
  border: '#E2E8F0',
  textPrimary: '#0F172A',
  textSecondary: '#334155',
  textMuted: '#475569',
  textDim: '#94A3B8',
  white: '#FFFFFF',
};

// ─── localStorage: likes e saves persistentes ───────────────────────────────
const Storage = {
  getLikes: () => { try { return JSON.parse(localStorage.getItem('aera-blog-likes') || '{}'); } catch { return {}; } },
  getSaves: () => { try { return JSON.parse(localStorage.getItem('aera-blog-saves') || '{}'); } catch { return {}; } },
  isLiked: (id) => !!Storage.getLikes()[id],
  isSaved: (id) => !!Storage.getSaves()[id],
  toggleLike: (id) => {
    const d = Storage.getLikes();
    d[id] = !d[id];
    localStorage.setItem('aera-blog-likes', JSON.stringify(d));
    return !!d[id];
  },
  toggleSave: (id) => {
    const d = Storage.getSaves();
    d[id] = !d[id];
    localStorage.setItem('aera-blog-saves', JSON.stringify(d));
    return !!d[id];
  },
};

// ─── Compartilhar: Web Share API com fallback para clipboard ─────────────────
async function sharePost(post) {
  const url = window.location.href;
  const title = post.title;
  const text = post.excerpt;
  if (navigator.share) {
    try { await navigator.share({ title, text, url }); return; } catch (e) { /* usuário cancelou */ }
  }
  try {
    await navigator.clipboard.writeText(url);
    window.showToast && window.showToast('Link copiado para a área de transferência!');
  } catch {
    window.showToast && window.showToast('Não foi possível copiar o link.');
  }
}

// Aerial-view SVG placeholder — generative gradient + subtle topographic feel
function AerialPlaceholder({ variant = 'sky', label, style, children }) {
  // Support real image paths (relative, absolute, or http)
  const isRealImage = variant && (variant.startsWith('./') || variant.startsWith('/') || variant.startsWith('http') || variant.includes('.png') || variant.includes('.jpg') || variant.includes('.webp'));
  if (isRealImage) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0A1628', ...style }}>
        <img src={variant} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        {label && (
          <div style={{
            position: 'absolute', bottom: 12, left: 14,
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.78)', textShadow: '0 1px 4px rgba(10,22,40,.4)',
          }}>{label}</div>
        )}
        {children}
      </div>
    );
  }
  const v = AERIAL_VARIANTS[variant] || AERIAL_VARIANTS.sky;
  const id = React.useId();
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, display: 'block' }}>
        <defs>
          <linearGradient id={`g-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            {v.stops.map((s, i) => <stop key={i} offset={s.o} stopColor={s.c} />)}
          </linearGradient>
          <linearGradient id={`h-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={v.horizon} stopOpacity="0" />
            <stop offset="60%" stopColor={v.horizon} stopOpacity="0.35" />
            <stop offset="100%" stopColor={v.horizon} stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id={`s-${id}`} cx="78%" cy="22%" r="40%">
            <stop offset="0%" stopColor="#fff" stopOpacity={v.sun} />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill={`url(#g-${id})`} />
        <rect width="800" height="600" fill={`url(#s-${id})`} />
        <rect x="0" y={v.horizonY} width="800" height={600 - v.horizonY} fill={`url(#h-${id})`} />
        {v.contours.map((y, i) => (
          <path key={i}
            d={`M0 ${y} Q 200 ${y - 8 - i * 2} 400 ${y} T 800 ${y}`}
            stroke={v.lineColor} strokeWidth="0.7" fill="none" opacity={0.35 - i * 0.04} />
        ))}
        {v.clouds.map((c, i) => (
          <ellipse key={i} cx={c.x} cy={c.y} rx={c.rx} ry={c.ry} fill="#fff" opacity={c.o} />
        ))}
      </svg>
      {label && (
        <div style={{
          position: 'absolute', bottom: 12, left: 14,
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.78)', textShadow: '0 1px 4px rgba(10,22,40,.4)',
        }}>{label}</div>
      )}
      {children}
    </div>
  );
}

const AERIAL_VARIANTS = {
  dawn: {
    stops: [{ o: '0%', c: '#1B3A6B' }, { o: '50%', c: '#3E6FA8' }, { o: '78%', c: '#7BA8D6' }, { o: '100%', c: '#0A2540' }],
    horizon: '#0A2540', horizonY: 360, sun: 0.55,
    contours: [400, 430, 460, 490, 520, 550, 580],
    clouds: [{ x: 150, y: 180, rx: 90, ry: 12, o: 0.12 }, { x: 600, y: 220, rx: 120, ry: 10, o: 0.18 }, { x: 320, y: 140, rx: 70, ry: 8, o: 0.1 }],
    lineColor: '#7BA8D6',
  },
  sky: {
    stops: [{ o: '0%', c: '#1462CC' }, { o: '40%', c: '#1877F2' }, { o: '75%', c: '#5BA3F5' }, { o: '100%', c: '#A8C9F0' }],
    horizon: '#0A1628', horizonY: 480, sun: 0.4,
    contours: [490, 510, 530, 550, 570, 590],
    clouds: [{ x: 200, y: 200, rx: 120, ry: 14, o: 0.25 }, { x: 550, y: 280, rx: 160, ry: 12, o: 0.32 }, { x: 700, y: 150, rx: 80, ry: 9, o: 0.18 }],
    lineColor: '#1462CC',
  },
  forest: {
    stops: [{ o: '0%', c: '#0A2A1E' }, { o: '40%', c: '#14503A' }, { o: '70%', c: '#1F7A52' }, { o: '100%', c: '#22C55E' }],
    horizon: '#0A1628', horizonY: 200, sun: 0.25,
    contours: [240, 280, 320, 360, 400, 440, 480, 520, 560],
    clouds: [],
    lineColor: '#22C55E',
  },
  ocean: {
    stops: [{ o: '0%', c: '#0A1628' }, { o: '35%', c: '#0F2D52' }, { o: '70%', c: '#1462CC' }, { o: '100%', c: '#5BA3F5' }],
    horizon: '#0A1628', horizonY: 220, sun: 0.5,
    contours: [260, 300, 340, 380, 420, 460, 500, 540],
    clouds: [{ x: 100, y: 80, rx: 60, ry: 6, o: 0.15 }, { x: 450, y: 120, rx: 90, ry: 8, o: 0.2 }],
    lineColor: '#5BA3F5',
  },
  road: {
    stops: [{ o: '0%', c: '#1462CC' }, { o: '40%', c: '#5BA3F5' }, { o: '65%', c: '#C7B894' }, { o: '100%', c: '#3D2E1A' }],
    horizon: '#1A2540', horizonY: 280, sun: 0.4,
    contours: [320, 360, 400, 440, 480, 520, 560],
    clouds: [{ x: 200, y: 100, rx: 100, ry: 10, o: 0.2 }, { x: 580, y: 160, rx: 120, ry: 9, o: 0.18 }],
    lineColor: '#FFFFFF',
  },
  mist: {
    stops: [{ o: '0%', c: '#D8E3F2' }, { o: '50%', c: '#A8C9F0' }, { o: '100%', c: '#5BA3F5' }],
    horizon: '#0F2D52', horizonY: 350, sun: 0.7,
    contours: [380, 420, 460, 500, 540, 580],
    clouds: [{ x: 150, y: 250, rx: 130, ry: 16, o: 0.4 }, { x: 600, y: 280, rx: 180, ry: 18, o: 0.45 }],
    lineColor: '#0F2D52',
  },
  night: {
    stops: [{ o: '0%', c: '#050A14' }, { o: '50%', c: '#0A1628' }, { o: '100%', c: '#1462CC' }],
    horizon: '#000', horizonY: 420, sun: 0.3,
    contours: [450, 480, 510, 540, 570],
    clouds: [{ x: 300, y: 120, rx: 140, ry: 10, o: 0.08 }, { x: 650, y: 200, rx: 90, ry: 7, o: 0.06 }],
    lineColor: '#1877F2',
  },
};

function TopoLines({ color = BRAND.blue, opacity = 0.08, style }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}>
      {[...Array(12)].map((_, i) => {
        const y = 30 + i * 22;
        return (
          <path key={i}
            d={`M-20 ${y} Q 80 ${y - 18} 200 ${y} T 420 ${y - 6}`}
            fill="none" stroke={color} strokeWidth="0.8" opacity={opacity * (1 - i * 0.04)} />
        );
      })}
    </svg>
  );
}

// Logo AERA — quando homeUrl for passado, vira link clicável para o site principal
function AeraLogo({ color = BRAND.blue, textColor, sub = true, size = 'md', homeUrl }) {
  const s = size === 'sm' ? { box: 32, font: 15, sub: 10, gap: 10 } : size === 'lg' ? { box: 48, font: 24, sub: 13, gap: 14 } : { box: 38, font: 18, sub: 11, gap: 12 };

  const inner = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap }}>
      <div style={{ width: s.box, height: s.box, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="./logo2.png" alt="Logo AERA" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontWeight: 900, fontSize: s.font, letterSpacing: '-0.01em', color: textColor || color }}>AERA</div>
        {sub && <div style={{ fontSize: s.sub, fontWeight: 500, color: textColor ? `${textColor}99` : BRAND.textMuted, marginTop: 1 }}>
          Soluções Ambientais e Sustentáveis
        </div>}
      </div>
    </div>
  );

  if (homeUrl) {
    return (
      <a href={homeUrl} title="Voltar ao site AERA" style={{ textDecoration: 'none', display: 'inline-flex' }}>
        {inner}
      </a>
    );
  }
  return inner;
}

const Icon = {
  search:   (p = {}) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/></svg>,
  arrow:    (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 7h10M8 3l4 4-4 4"/></svg>,
  arrowDown:(p = {}) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M3 5l3 3 3-3"/></svg>,
  clock:    (p = {}) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="6" cy="6" r="4.5"/><path d="M6 3.5V6l1.5 1" strokeLinecap="round"/></svg>,
  bookmark: (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" {...p}><path d="M3 2h8v10l-4-2.5L3 12V2z"/></svg>,
  share:    (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="3.5" cy="7" r="1.5"/><circle cx="10.5" cy="3.5" r="1.5"/><circle cx="10.5" cy="10.5" r="1.5"/><path d="M5 6.3l4-2M5 7.7l4 2"/></svg>,
  menu:     (p = {}) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M3 5h12M3 9h12M3 13h12"/></svg>,
  close:    (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M3 3l8 8M11 3l-8 8"/></svg>,
  heart:    (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" {...p}><path d="M7 12s-4.5-2.7-4.5-6a2.5 2.5 0 0 1 4.5-1.5A2.5 2.5 0 0 1 11.5 6c0 3.3-4.5 6-4.5 6z"/></svg>,
  comment:  (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" {...p}><path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6l-3 2V4z"/></svg>,
  check:    (p = {}) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2.5 6.5l2.5 2.5L10 3.5"/></svg>,
  plane:    (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" {...p}><path d="M2 8l11-5-3 11-2.5-4.5L2 8z"/></svg>,
  filter:   (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}><path d="M2 4h10M4 7h6M6 10h2"/></svg>,
};

const CATEGORIES = [
  { id: 'sustentabilidade', name: 'Sustentabilidade', color: BRAND.green },
  { id: 'meio-ambiente',    name: 'Meio Ambiente',    color: '#0EA5A4' },
  { id: 'esg',              name: 'ESG',              color: BRAND.blue },
  { id: 'certificacoes',    name: 'Certificações',    color: '#7C3AED' },
  { id: 'residuos',         name: 'Gestão de Resíduos', color: '#F59E0B' },
];

const POSTS = [
  // ─── Série: O ESG na Vida Real ───────────────────────────────────────
  {
    id: 'esg-vida-real-intro',
    title: 'O ESG não senta na mesa do chefe. Ele senta na sua.',
    excerpt: 'Por que cada decisão operacional — do frete negociado à segregação de resíduos no galpão — define o valor financeiro da sua empresa. Lançamento da série "O ESG na Vida Real".',
    category: 'esg',
    author: 'Equipe AERA',
    authorRole: 'Editorial',
    date: '01 Mai 2026',
    readTime: '4 min',
    image: './images/aera-esg-intro.png',
    featured: true,
    tags: ['ESG', 'Sustentabilidade Corporativa', 'Gestão de Riscos', 'Série'],
  },
  {
    id: 'esg-vida-real-cap1',
    title: 'O Comercial, o Marketing e a armadilha do discurso vazio',
    excerpt: 'Como usar a sustentabilidade como argumento real de vendas sem cair no Greenwashing — e por que a transparência operacional virou o maior diferencial competitivo.',
    category: 'esg',
    author: 'Equipe AERA',
    authorRole: 'Editorial',
    date: '08 Mai 2026',
    readTime: '5 min',
    image: './images/aera-esg-cap1.png',
    tags: ['ESG', 'Marketing', 'Vendas', 'Greenwashing', 'Série'],
  },
  {
    id: 'esg-vida-real-cap2',
    title: 'A Logística, Compras e o preço oculto do contrato mais barato',
    excerpt: 'O fornecedor mais barato pode ser a sua maior vulnerabilidade jurídica. Como a cadeia de suprimentos define a reputação e o risco ambiental da operação.',
    category: 'esg',
    author: 'Equipe AERA',
    authorRole: 'Editorial',
    date: '15 Mai 2026',
    readTime: '5 min',
    image: './images/aera-esg-cap2.png',
    tags: ['ESG', 'Logística', 'Compras', 'Cadeia de Suprimentos', 'Série'],
  },
  {
    id: 'esg-vida-real-cap3',
    title: 'O Financeiro, a Controladoria e o novo Serasa corporativo',
    excerpt: 'O desempenho ESG tornou-se o critério invisível nos comitês de crédito. Como a gestão ambiental impacta diretamente o custo do capital e o balanço da empresa.',
    category: 'esg',
    author: 'Equipe AERA',
    authorRole: 'Editorial',
    date: '22 Mai 2026',
    readTime: '5 min',
    image: './images/aera-esg-cap3.png',
    tags: ['ESG', 'Financeiro', 'Controladoria', 'Crédito Verde', 'Série'],
  },
  {
    id: 'esg-vida-real-cap4',
    title: 'O RH, a Operação e a cultura que sustenta o discurso',
    excerpt: 'Estratégia ESG que não chega ao chão de fábrica é documento engavetado. Como RH e Operação se tornam os pilares reais da sustentabilidade corporativa.',
    category: 'esg',
    author: 'Equipe AERA',
    authorRole: 'Editorial',
    date: '29 Mai 2026',
    readTime: '5 min',
    image: './images/aera-esg-cap4.png',
    tags: ['ESG', 'RH', 'Operação', 'Cultura Organizacional', 'Série'],
  },
  {
    id: 'esg-vida-real-cap5',
    title: 'A tecnologia e o fim das planilhas isoladas',
    excerpt: 'ESG sem dados confiáveis e auditáveis é apenas poesia corporativa. Como dashboards, APIs e automação conectam todas as áreas e transformam conformidade em vantagem competitiva.',
    category: 'esg',
    author: 'Equipe AERA',
    authorRole: 'Editorial',
    date: '05 Jun 2026',
    readTime: '5 min',
    image: './images/aera-esg-cap5.png',
    tags: ['ESG', 'Tecnologia', 'Dados', 'Dashboards', 'Série'],
  },
  // ─── Posts editoriais ────────────────────────────────────────────────
  {
    id: 'iso-14001-2026',
    title: 'ISO 14001:2026: O que muda na nova versão recém-publicada',
    excerpt: 'Publicada em 15 de abril de 2026, a nova versão da principal norma de gestão ambiental traz um novo requisito para gestão de mudanças e estende o rigor operacional para toda a cadeia de fornecedores.',
    category: 'certificacoes',
    author: 'Equipe AERA',
    authorRole: 'Especialistas em Certificações',
    date: '28 Abr 2026',
    readTime: '7 min',
    image: 'sky',
    tags: ['ISO 14001', 'Atualização 2026', 'SGA', 'Auditoria'],
  },
  {
    id: 'consumidor-clima',
    title: 'O jogo virou: Por que o consumidor brasileiro está de olho na sua estratégia climática',
    excerpt: 'Pesquisas recentes mostram que mais de 70% dos consumidores brasileiros consideram a postura climática das empresas antes de comprar. Não é mais sobre marketing verde — é sobre licença social para operar.',
    category: 'esg',
    author: 'Equipe AERA',
    authorRole: 'Editorial',
    date: '22 Abr 2026',
    readTime: '8 min',
    image: 'sky',
    tags: ['ESG', 'Consumo Consciente', 'Estratégia Climática'],
  },
  {
    id: 'mtr-digital',
    title: 'MTR Digital: o que muda com a obrigatoriedade nacional em 2026',
    excerpt: 'O Manifesto de Transporte de Resíduos eletrônico unifica o controle entre estados. Veja como adequar processos, integrar sistemas e evitar autuações.',
    category: 'residuos',
    author: 'Equipe AERA',
    date: '18 Abr 2026',
    readTime: '6 min',
    image: 'forest',
    tags: ['MTR', 'Compliance', 'Resíduos'],
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001 na prática: do checklist à cultura ambiental',
    excerpt: 'Certificação não é troféu de parede. Como pequenas e médias empresas estão transformando o sistema de gestão em vantagem operacional.',
    category: 'certificacoes',
    author: 'Equipe AERA',
    date: '14 Abr 2026',
    readTime: '11 min',
    image: 'mist',
    tags: ['ISO 14001', 'Gestão', 'Auditoria'],
  },
  {
    id: 'reporte-gri',
    title: 'Relato de sustentabilidade: GRI, SASB ou CDP — qual escolher?',
    excerpt: 'Um guia técnico-prático para diretorias que precisam reportar e não querem se perder no alfabeto das normas.',
    category: 'certificacoes',
    author: 'Equipe AERA',
    date: '10 Abr 2026',
    readTime: '14 min',
    image: 'ocean',
    tags: ['GRI', 'SASB', 'Reporte'],
  },
  {
    id: 'biodiversidade',
    title: 'Biodiversidade entra na agenda corporativa: o que esperar do TNFD',
    excerpt: 'Após o TCFD para clima, o framework de natureza começa a ganhar tração. Empresas brasileiras saem na frente?',
    category: 'meio-ambiente',
    author: 'Equipe AERA',
    date: '07 Abr 2026',
    readTime: '7 min',
    image: 'forest',
    tags: ['TNFD', 'Biodiversidade'],
  },
  {
    id: 'economia-circular',
    title: 'Economia circular não é reciclagem: como redesenhar produtos para o ciclo fechado',
    excerpt: 'Da coleta seletiva ao design regenerativo: três casos brasileiros que mostram o caminho.',
    category: 'sustentabilidade',
    author: 'Equipe AERA',
    date: '03 Abr 2026',
    readTime: '9 min',
    image: 'dawn',
    tags: ['Circular', 'Design', 'Cases'],
  },
  {
    id: 'creditos-carbono',
    title: 'Mercado regulado de carbono no Brasil: o que muda para sua operação',
    excerpt: 'A Lei do SBCE entra em vigor com cronograma escalonado. Setores cobertos, MRV, e o impacto no balanço de 2027.',
    category: 'esg',
    author: 'Equipe AERA',
    date: '28 Mar 2026',
    readTime: '12 min',
    image: 'road',
    tags: ['Carbono', 'SBCE', 'Regulação'],
  },
  {
    id: 'agua-industrial',
    title: 'Outorga de água: três erros que travam projetos industriais',
    excerpt: 'Disponibilidade hídrica é o novo gargalo de novos empreendimentos. Como antecipar e dimensionar corretamente.',
    category: 'meio-ambiente',
    author: 'Equipe AERA',
    date: '24 Mar 2026',
    readTime: '5 min',
    image: 'mist',
    tags: ['Água', 'Outorga', 'Indústria'],
  },
  {
    id: 'pme-jornada-esg',
    title: 'Como pequenas e médias empresas podem começar uma jornada ESG',
    excerpt: 'Um passo a passo prático para estruturar governança, métricas ambientais e relatórios de impacto sem inflar a operação — começando pelo que já existe na sua empresa.',
    category: 'esg',
    author: 'Equipe AERA',
    authorRole: 'Editorial',
    date: '06 Mai 2026',
    readTime: '8 min',
    image: 'mist',
    tags: ['ESG', 'PME', 'Governança', 'Sustentabilidade'],
  },
];

// ─── Série: O ESG na Vida Real ───────────────────────────────────────────────

const ARTICLE_BODY_ESG_INTRO = [
  { type: 'lead', text: 'Você já parou para pensar que aquela decisão de frete que você toma numa terça-feira à tarde, ou a forma como você negocia com um novo fornecedor, pode alterar o valor de mercado da empresa onde você trabalha?' },
  { type: 'p', text: 'Quando falamos em ESG (Ambiental, Social e Governança), a rádio peão costuma dizer: "Isso aí é problema da turma do Compliance, do Pessoal da Qualidade ou do chato do Meio Ambiente." Essa é a maior armadilha do mundo corporativo moderno.' },
  { type: 'h2', text: 'O ESG saiu da sala da diretoria' },
  { type: 'p', text: 'O ESG não é mais um "selo verde" ou um projeto de filantropia para ficar bonito no relatório anual. Hoje, o ESG é a nova métrica de saúde financeira e sobrevivência de um negócio. E adivinha? Essa saúde é construída no dia a dia, na SUA mesa.' },
  { type: 'p', text: 'Se a operação falha, o indicador acende vermelho. Se o indicador fica vermelho, o crédito no banco fica mais caro, o grande cliente cancela o contrato e o bônus de todo mundo vai pro espaço. Simples assim.' },
  { type: 'h2', text: 'A série: O ESG na Vida Real' },
  { type: 'p', text: 'Nas próximas semanas, vamos tirar o ESG das nuvens, tirar os termos difíceis e aterrissar esse conceito na realidade de cada departamento. Vamos entender, na prática, como o seu trabalho diário está conectado a essa revolução.' },
  { type: 'list', items: [
    'Episódio 1 — O Comercial e Marketing: O que vende e o que é armadilha? Como usar a sustentabilidade como argumento de vendas sem cair no crime do Greenwashing.',
    'Episódio 2 — A Logística e Compras: O ESG na boleia e no galpão: Por que o fornecedor mais barato pode custar a reputação da sua empresa?',
    'Episódio 3 — O Financeiro e a Controladoria: O ESG na planilha: Como os bancos e investidores olham para a sua gestão de resíduos antes de liberar crédito.',
    'Episódio 4 — O RH e a Operação: Do recrutamento ao chão de fábrica: A licença para operar começa na segurança e na segregação do resíduo na fonte.',
    'Episódio 5 — A Tecnologia: Como a governança de dados conecta todas as áreas sem perder o controle.',
  ] },
  { type: 'quote', text: 'Sustentabilidade não é um departamento, é um jeito de trabalhar. E você? De qual departamento você é e como acha que o ESG impacta a sua rotina hoje?' },
];

const ARTICLE_BODY_ESG_CAP1 = [
  { type: 'lead', text: 'Você está na linha de frente. O cliente exige práticas sustentáveis no edital de concorrência ou o consumidor final pressiona por um posicionamento mais responsável. A tentação de usar o ESG puramente como um gatilho de vendas é enorme.' },
  { type: 'p', text: 'Mas é exatamente na pressa de vender uma imagem sustentável que as empresas caem no maior risco de reputação da atualidade: o Greenwashing, a famosa "maquiagem verde". Vender uma narrativa que não se comprova na operação diária deixou de ser apenas um tropeço de comunicação. Hoje, é um passivo financeiro e jurídico.' },
  { type: 'h2', text: 'Greenwashing: o passivo que se esconde no discurso' },
  { type: 'p', text: 'O mercado corporativo, os investidores e o consumidor final estão vacinados contra discursos vazios e promessas genéricas. Se o time comercial bate no peito em uma reunião para dizer que a empresa é "zero aterro" ou "neutra em carbono", ele precisa ter a garantia absoluta de que a operação está fazendo a lição de casa.' },
  { type: 'p', text: 'É necessário que o galpão esteja segregando resíduos com rigor, que a destinação final seja rastreável e que o inventário de Gases de Efeito Estufa (GEE) esteja atualizado e baseado em dados reais. Uma foto de descarte irregular na internet ou uma denúncia na cadeia de fornecedores destrói em minutos a campanha de marketing que custou milhões.' },
  { type: 'h2', text: 'Como o Comercial e o Marketing devem atuar na era do ESG real' },
  { type: 'numlist', items: [
    'A transparência é o novo diferencial de vendas. O cliente corporativo maduro (B2B) prefere a honestidade. É muito mais forte apresentar um dashboard mostrando que a empresa reduziu em 15% o envio de resíduos para aterro nos últimos doze meses do que prometer uma perfeição irreal sem provas.',
    'Venda dados, não apenas intenções. No pilar Ambiental, a matemática não mente. Certificados de destinação final, relatórios de inventário de emissões e indicadores de eficiência energética valem muito mais do que qualquer selo de procedência duvidosa.',
    'O fim do silo corporativo. Antes de aprovar qualquer peça de comunicação sobre sustentabilidade, o marketing precisa validar as informações com a operação, com a engenharia ambiental e com compras.',
  ] },
  { type: 'p', text: 'O papel do marketing não é inventar uma narrativa verde, mas dar visibilidade a uma transformação real e contínua que já acontece na operação da empresa. O comercial que compreende essa dinâmica para de vender apenas produtos e passa a vender segurança, compliance e mitigação de riscos para o seu cliente.' },
  { type: 'quote', text: 'Com qual frequência vocês sentam com a operação técnica para validar os dados ambientais e sociais antes de levá-los ao mercado? O discurso do panfleto bate com a realidade do galpão?' },
];

const ARTICLE_BODY_ESG_CAP2 = [
  { type: 'lead', text: 'O setor de Compras e a Logística operam os motores que mantêm qualquer indústria funcionando. Historicamente, o sucesso nessas áreas foi medido por duas variáveis implacáveis: custo e prazo. Mas na era do ESG, essa equação pode ser fatal para o negócio.' },
  { type: 'p', text: 'O risco não mora apenas dentro dos muros da sua empresa. Ele se estende por toda a sua cadeia de suprimentos. Quando o critério de contratação ignora a conformidade ambiental e as práticas sociais, o fornecedor mais barato pode se transformar na sua maior vulnerabilidade jurídica e de reputação.' },
  { type: 'h2', text: 'A Logística e a matemática das emissões' },
  { type: 'p', text: 'Na movimentação de cargas, otimizar rotas, consolidar fretes e avaliar o tipo de frota contratada deixaram de ser apenas estratégias para cortar gastos com combustíveis. Trata-se de mitigação direta de impacto climático. O transporte é um dos maiores responsáveis pelas emissões de Gases de Efeito Estufa (GEE). Cada rota ineficiente reflete negativamente no inventário de emissões da companhia. A logística eficiente é, por definição, uma logística de baixo carbono.' },
  { type: 'h2', text: 'O poder e o risco do setor de Compras' },
  { type: 'p', text: 'A mesa de Compras é a grande fronteira de Governança e responsabilidade Social da empresa. A homologação de um novo fornecedor precisa ir muito além da capacidade de entrega e do CNPJ ativo. Se a sua empresa adquire insumos de uma operação que utiliza mão de obra em condições precárias, ou que opera com licenças ambientais vencidas, o risco contamina o seu produto final.' },
  { type: 'numlist', items: [
    'Logística e emissões: Cada rota ineficiente reflete no inventário de emissões. A gestão operacional de resíduos exige rastreabilidade ponta a ponta — o transportador terceirizado precisa provar destino final licenciado.',
    'Rastreio e gestão operacional: O descarte irregular feito por um terceiro volta para a conta do gerador, trazendo multas e danos incalculáveis à marca.',
    'Auditoria da cadeia de suprimentos: Garante que você não está financiando passivos ocultos de fornecedores com licenças vencidas ou práticas trabalhistas irregulares.',
  ] },
  { type: 'quote', text: 'Profissionais de Logística e Compras não são apenas fechadores de contratos ou expedidores de carga. Eles são os verdadeiros guardiões da gestão de riscos da empresa.' },
  { type: 'p', text: 'Um processo de compras estruturado sob a ótica ESG blinda a operação, atrai clientes mais exigentes e garante a perenidade do negócio. O critério de menor preço ainda atropela a avaliação de conformidade dos seus parceiros de negócio?' },
];

const ARTICLE_BODY_ESG_CAP3 = [
  { type: 'lead', text: 'A área Financeira e a Controladoria são os guardiões do fluxo de caixa, da rentabilidade e da alocação eficiente de recursos. As regras do jogo financeiro global mudaram: hoje, grandes bancos e fundos de investimento avaliam os indicadores ambientais e de governança com o mesmo rigor que analisam um DRE.' },
  { type: 'p', text: 'O desempenho ESG tornou-se um verdadeiro "Serasa corporativo". Mas como, na prática, a gestão ambiental impacta a planilha do Diretor Financeiro?' },
  { type: 'h2', text: 'O custo do capital e a precificação do risco' },
  { type: 'p', text: 'Empresas que não possuem clareza sobre seus passivos ambientais ou que gerenciam seus resíduos de forma amadora são classificadas pelo mercado como negócios de alto risco. Se há risco de multas severas, paralisação das operações por embargo de órgãos fiscalizadores ou escândalos na cadeia produtiva, as instituições financeiras entendem que a chance de inadimplência aumenta. O resultado é direto: o crédito fica mais restrito e os juros sobem.' },
  { type: 'p', text: 'Em contrapartida, operações que comprovam eficiência ambiental acessam linhas de crédito verde com taxas significativamente menores.' },
  { type: 'h2', text: 'Três frentes de impacto financeiro do ESG' },
  { type: 'numlist', items: [
    'O custo do capital: Passivos ambientais não declarados encarecem o crédito. A conformidade ambiental auditável abre portas para linhas de crédito verde com taxas menores.',
    'A ineficiência como ralo de recursos: Resíduo gerado em excesso significa matéria-prima comprada, processada e não convertida em receita — gerando ainda custo extra para descarte. Uma gestão inteligente transforma esse centro de custo em eficiência.',
    'Governança e auditoria de dados: A controladoria garante que os dados reportados sejam reais e auditáveis, permitindo ao Financeiro sentar à mesa com investidores e comprovar, com números, que a operação está blindada contra passivos futuros.',
  ] },
  { type: 'quote', text: 'O capital inteligente foge da imprevisibilidade. Na sua empresa, a área Financeira já enxerga a gestão ambiental como um indicador de risco de crédito, ou ainda trata esse tema apenas como uma despesa obrigatória no fim do mês?' },
];

const ARTICLE_BODY_ESG_CAP4 = [
  { type: 'lead', text: 'Quando o assunto é ESG, é fácil acreditar que tudo se resolve com a contratação de uma consultoria e a assinatura de novas diretrizes pela diretoria. Mas a verdade é que o papel aceita qualquer estratégia. A execução e a cultura acontecem nas relações humanas e no chão de fábrica.' },
  { type: 'p', text: 'Se o RH e a Operação não estiverem alinhados com o propósito corporativo, qualquer meta ambiental ou social será apenas um documento engavetado.' },
  { type: 'h2', text: 'O RH e a engenharia da cultura corporativa (Pilar Social)' },
  { type: 'p', text: 'O RH não é apenas um processador de folhas de pagamento. No contexto ESG, ele é o arquiteto do ambiente interno. Hoje, a retenção de talentos está diretamente ligada aos valores da empresa. Profissionais altamente qualificados, especialmente as novas gerações, recusam propostas de companhias envolvidas em escândalos éticos, falta de diversidade ou ambientes tóxicos.' },
  { type: 'p', text: 'O papel estratégico do RH é garantir a inclusão, o desenvolvimento de lideranças éticas e a construção de um ambiente de trabalho justo. É o RH que transforma o discurso do pilar Social em uma cultura que as pessoas realmente vivenciam todos os dias.' },
  { type: 'h2', text: 'A Operação e o momento da verdade (Pilar Ambiental na prática)' },
  { type: 'p', text: 'A alta gestão e o time de QSMA podem desenhar o melhor projeto de gestão de resíduos ou de transição energética do mundo. Mas se o operador, lá na ponta, não realizar a segregação correta do material na fonte, todo o sistema falha e o dado que vai para o relatório fica comprometido.' },
  { type: 'p', text: 'Executar os procedimentos corretamente, evitar o desperdício de matéria-prima e manter o rigor nos processos não são detalhes mecânicos; são as ações que garantem a conformidade ambiental e evitam passivos para a companhia.' },
  { type: 'h2', text: 'A sinergia que transforma obrigação em hábito' },
  { type: 'p', text: 'A virada de chave do ESG acontece quando o RH (Cultura) e as Lideranças Operacionais (Execução) se alinham através da educação corporativa. Quando um operador compreende que segregar um resíduo de forma correta não é apenas "uma regra chata da qualidade", mas uma atitude que ajuda a manter grandes contratos ativos e garante a estabilidade do negócio, o comportamento muda.' },
  { type: 'quote', text: 'Uma empresa só é verdadeiramente sustentável quando a sua cultura interna é forte o suficiente para que as decisões corretas sejam tomadas mesmo quando ninguém está olhando.' },
];

const ARTICLE_BODY_ESG_CAP5 = [
  { type: 'lead', text: 'Até aqui, vimos que o ESG transita pela mesa do Comercial, entra nos galpões de Logística, dita as taxas do Financeiro e molda a cultura no RH. A sustentabilidade corporativa é, na prática, um organismo complexo. Como conectar todas essas pontas de forma segura sem perder o controle da operação?' },
  { type: 'p', text: 'A resposta dita a regra de sobrevivência dos negócios nesta década: o fim do "eu acho" e a adoção rigorosa da governança de dados. A maior vulnerabilidade das indústrias é a dependência de planilhas manuais, fragmentadas e sujeitas a falhas operacionais. O mercado global não aceita mais estimativas otimistas. Ele exige comprovação e rastreabilidade.' },
  { type: 'h2', text: 'Como a tecnologia se torna o divisor de águas' },
  { type: 'numlist', items: [
    'A era dos Dashboards: Não basta gerar a informação; é crucial visualizá-la de forma estratégica e em tempo real. A gestão operacional de resíduos ou o controle de inventário de GEE exigem painéis de controle dinâmicos que cruzam volume gerado, destinação final e impacto financeiro.',
    'Rastreabilidade e mitigação na raiz: A tecnologia permite monitorar a conformidade de toda a cadeia de forma ativa — bloqueando, por exemplo, a contratação de um serviço caso a licença ambiental de um transportador não esteja validada pelo sistema.',
    'Automação para focar na engenharia do negócio: Ferramentas automatizadas e APIs assumem o trabalho de coleta e organização de dados, liberando engenharia e gestão para analisar cenários preditivos, identificar gargalos e redesenhar processos para a economia circular.',
  ] },
  { type: 'quote', text: 'O ESG sem dados confiáveis e auditáveis é apenas poesia corporativa. A tecnologia transforma intenções em ativos financeiros inquestionáveis.' },
  { type: 'h2', text: 'O próximo passo' },
  { type: 'p', text: 'Com este episódio, encerramos a série "O ESG na Vida Real". Se a sua empresa ainda enxerga a gestão de resíduos, a conformidade legal e os inventários ambientais como um centro de custos burocrático, ou se os dados críticos da operação ainda dependem de planilhas isoladas, é hora de mudar a estratégia.' },
  { type: 'p', text: 'Na AERA, atuamos exatamente nessa dor. Prestamos a consultoria estratégica e técnica necessária para estruturar a jornada ESG do zero, conectando a realidade do chão de fábrica com os indicadores que a diretoria e os investidores exigem. Acesse www.aerasustentavel.com.br e vamos conversar.' },
];

const ARTICLE_BODY_CLIMA = [
  { type: 'lead', text: 'Por muito tempo, sustentabilidade foi tratada como pauta de marketing. Algo que cabia no relatório anual, no posicionamento institucional, na campanha de fim de ano. Em 2026, essa lógica se inverteu — e o consumidor brasileiro virou protagonista da cobrança climática.' },
  { type: 'p', text: 'Pesquisas conduzidas no último trimestre indicam que mais de 70% dos consumidores brasileiros levam em conta a postura climática de uma marca antes de comprar. Entre o público de 25 a 44 anos — o coração da classe consumidora — o número passa de 80%. E não estamos falando apenas de embalagem reciclável: a pergunta é mais profunda. "Essa empresa está fazendo a coisa certa?"' },
  { type: 'h2', text: 'Da percepção à decisão de compra' },
  { type: 'p', text: 'O que mudou foi o critério de escolha. Antes, sustentabilidade era um diferencial — um "bom de ter". Hoje, é um filtro. Marcas que não conseguem articular sua estratégia climática de forma clara, mensurável e auditável estão sendo cortadas no carrinho de compras, no comparativo de fornecedores corporativos, no edital público.' },
  { type: 'quote', text: 'Não é greenwashing que assusta o consumidor — é silêncio. A ausência de posicionamento virou sinal de risco.' },
  { type: 'h2', text: 'O que está em jogo' },
  { type: 'p', text: 'Três frentes simultâneas pressionam empresas brasileiras a se posicionarem com mais clareza:' },
  { type: 'list', items: [
    'Regulação: o SBCE (Sistema Brasileiro de Comércio de Emissões) começa a impor MRV obrigatório para setores intensivos em carbono.',
    'Cadeia de fornecimento: grandes compradores estão exigindo inventário de emissões Escopo 3 dos seus fornecedores.',
    'Capital: bancos e investidores institucionais aplicam screen climático em decisões de crédito e equity.',
  ] },
  { type: 'h2', text: 'O caminho prático' },
  { type: 'p', text: 'A boa notícia é que o roteiro está bem estabelecido. Inventário de emissões, metas com base científica, plano de transição com marcos verificáveis, e — fundamental — comunicação honesta sobre o que ainda não foi resolvido. O consumidor brasileiro perdoa o caminho imperfeito; o que ele não perdoa mais é a omissão.' },
  { type: 'p', text: 'Para empresas que estão começando, três passos imediatos:' },
  { type: 'numlist', items: [
    'Mapear os pontos materiais — não tente cobrir tudo de uma vez.',
    'Definir metas com referência (SBTi, NetZero, Race to Zero) e horizonte realista.',
    'Estabelecer um cronograma público de relato — anual, no mínimo.',
  ] },
  { type: 'h2', text: 'O recado' },
  { type: 'p', text: 'Estratégia climática deixou de ser tema do departamento de sustentabilidade. É decisão de CEO, é pauta de conselho, é critério de compra. A pergunta não é mais se a sua empresa precisa se posicionar — é quando, e com que profundidade.' },
];

const ARTICLE_BODY_MTR = [
  { type: 'lead', text: 'Em 2026, o controle de resíduos no Brasil não aceita mais planilhas isoladas. A consolidação do MTR Digital (Manifesto de Transporte de Resíduos) em âmbito nacional transformou a rastreabilidade em um processo de dados em tempo real, onde a falha de integração custa caro.' },
  { type: 'p', text: 'Instituído originalmente pela Portaria MMA nº 280/2020 e integrado ao Sistema Nacional de Informações sobre a Gestão de Resíduos Sólidos (SINIR), o MTR Eletrônico tornou-se a espinha dorsal da fiscalização ambiental. O que antes era um controle fragmentado por estados, agora é uma malha de dados cruzados que o Ibama e os órgãos estaduais utilizam para malhas fiscais automáticas.' },
  { type: 'h2', text: 'O fim da fragmentação estadual' },
  { type: 'p', text: 'O maior gargalo histórico para empresas com operações interestaduais era a multiplicidade de sistemas (como o SIGOR em São Paulo ou o FEAM em Minas Gerais). Com a obrigatoriedade de espelhamento com o MTR Nacional (SINIR), o órgão federal passa a ter visibilidade total da cadeia: do gerador, passando pelo transportador, até a destinação final.' },
  { type: 'p', text: 'Isso significa que divergências de peso, inconsistências de rotas ou o uso de destinadores com licenças vencidas geram alertas sistêmicos imediatos, configurando infrações que podem levar à suspensão das atividades.' },
  { type: 'quote', text: 'A fiscalização ambiental deixou de ser reativa (baseada em denúncias ou vistorias anuais) para ser algorítmica. O dado errado no MTR hoje é a multa de amanhã.' },
  { type: 'h2', text: 'Software e Integração: A única saída segura' },
  { type: 'p', text: 'A complexidade atual exige que a gestão de resíduos seja tratada como um processo de software B2B especializado. A digitação manual de MTRs em portais do governo é um risco de compliance inaceitável para médias e grandes indústrias.' },
  { type: 'p', text: 'Para adequar processos e evitar autuações, as empresas precisam focar em três pilares de automação:' },
  { type: 'list', items: [
    'Integração via API com o SINIR e sistemas estaduais: Emissão de MTRs diretamente do ERP ou CRM ambiental da empresa, eliminando o erro humano na transcrição de dados.',
    'Controle automatizado de Licenças (LO) e CADRI: O sistema emissor deve bloquear automaticamente a geração de um MTR se a licença do destinador estiver vencida ou se o resíduo não constar no CADRI aprovado.',
    'Indicadores Diretos em Tempo Real: Geração de dashboards e relatórios para auditorias (como ISO 14001), utilizando os dados do MTR para comprovar a destinação ambientalmente adequada.'
  ] },
  { type: 'h2', text: 'O próximo passo' },
  { type: 'p', text: 'A adequação ao MTR Nacional não é apenas um projeto de TI, mas uma reestruturação de governança ambiental. Empresas que digitalizam esse controle reduzem passivos, otimizam a logística reversa e transformam a conformidade em vantagem competitiva.' },
];

const ARTICLE_BODY_ISO = [
  { type: 'lead', text: 'A certificação ISO 14001 muitas vezes é tratada como um troféu de parede ou um checklist burocrático para vencer licitações. No entanto, quando bem implementada, ela é o motor da eficiência operacional.' },
  { type: 'p', text: 'O grande desafio das médias e grandes empresas é fazer a transição do papel para a cultura. O sistema de gestão ambiental (SGA) precisa estar enraizado no chão de fábrica e na diretoria, não apenas na sala do coordenador de meio ambiente às vésperas da auditoria.' },
  { type: 'h2', text: 'O erro dos indicadores na auditoria' },
  { type: 'p', text: 'Um ponto crítico de falha em auditorias de certificação é a definição equivocada de métricas nos Padrões de Desempenho Ambiental. É fundamental distinguir claramente entre indicadores diretos (como o volume absoluto de efluente tratado ou toneladas de CO2 emitidas) e indicadores indiretos (como o número de horas de treinamento ambiental ou campanhas de conscientização).' },
  { type: 'quote', text: 'Métricas indiretas mostram o esforço; métricas diretas comprovam o resultado ambiental. Um SGA maduro exige os dois, mas nunca os confunde.' },
  { type: 'h2', text: 'Três passos para reativar seu SGA' },
  { type: 'list', items: [
    'Integração de Normas: Se a sua empresa já possui a ISO 9001 (Qualidade) ou ISO 45001 (Saúde e Segurança), unifique os processos de auditoria interna e análise crítica pela direção.',
    'Gestão de Risco Real: Avalie os aspectos e impactos ambientais não apenas sob a ótica da conformidade legal, mas como riscos de continuidade de negócio.',
    'Engajamento da Liderança: A alta direção deve ser cobrada pelos indicadores de desempenho ambiental da mesma forma que é cobrada pelo EBITDA.'
  ] }
];

const ARTICLE_BODY_GRI = [
  { type: 'lead', text: 'A atual sopa de letrinhas da sustentabilidade corporativa confunde até conselheiros experientes. Diante da pressão de investidores, a pergunta que chega à mesa ambiental é: devemos reportar via GRI, SASB, CDP ou TCFD?' },
  { type: 'p', text: 'A resposta curta é que esses frameworks não são excludentes, mas complementares. No entanto, escolher a estrutura errada como ponto de partida gera relatórios caros, exaustivos e que não conversam com o público-alvo da empresa.' },
  { type: 'h2', text: 'Entendendo o ecossistema de reporte' },
  { type: 'list', items: [
    'GRI (Global Reporting Initiative): É o framework mais universal e abrangente. Foca na materialidade de impacto, ou seja, como a empresa impacta o meio ambiente e a sociedade. Excelente para stakeholders variados e ONGs.',
    'SASB (Sustainability Accounting Standards Board): Foca na materialidade financeira. Mostra como as questões ESG impactam o balanço e a geração de valor da empresa. É o idioma preferido dos investidores.',
    'GHG Protocol e CDP: Estruturas focadas primordialmente na quantificação técnica e divulgação de emissões de gases de efeito estufa e mudanças climáticas.'
  ] },
  { type: 'h2', text: 'Por onde começar?' },
  { type: 'p', text: 'Se a sua empresa vai publicar seu primeiro Relatório de Sustentabilidade, a estrutura GRI aliada a um inventário padrão GHG Protocol forma a base mais sólida. A partir dessa maturidade de dados alcançada, a transição para relatórios de risco financeiro climático torna-se um passo natural, e não um salto no escuro.' }
];

const ARTICLE_BODY_TNFD = [
  { type: 'lead', text: 'O mercado já entendeu que o carbono tem preço. O próximo choque regulatório e financeiro tem outro nome: biodiversidade. O TNFD (Taskforce on Nature-related Financial Disclosures) começa a ganhar tração global.' },
  { type: 'p', text: 'Assim como o TCFD forçou as empresas a precificarem o risco climático, o TNFD exige que as corporações meçam sua dependência e impacto sobre o capital natural. Para o Brasil, uma potência em biodiversidade e agronegócio, essa não é uma agenda periférica.' },
  { type: 'h2', text: 'Do risco físico ao risco regulatório' },
  { type: 'p', text: 'Operações que dependem de polinização, disponibilidade hídrica local ou integridade do solo precisam mapear essas dependências. A degradação do entorno não é mais apenas um problema de licenciamento ambiental (risco regulatório), mas uma ameaça direta à cadeia de suprimentos (risco físico).' },
  { type: 'p', text: 'As empresas brasileiras que anteciparem a adoção do TNFD não apenas protegerão suas operações, mas terão acesso privilegiado a linhas de financiamento (green bonds) atreladas à conservação.' }
];

const ARTICLE_BODY_CIRCULAR = [
  { type: 'lead', text: 'Tratar a economia circular apenas como um sinônimo moderno para "coleta seletiva" ou "reciclagem" é um erro estratégico. A circularidade verdadeira começa na prancheta de engenharia, muito antes do descarte.' },
  { type: 'p', text: 'Modelos avançados exigem que a empresa repense o design do produto, a escolha das matérias-primas e a logística de retorno. O resíduo deve ser tratado como um erro de design.' },
  { type: 'h2', text: 'O modelo de Total Waste Management' },
  { type: 'p', text: 'Para indústrias e grandes geradores (incluindo serviços de saúde), a transição passa pela adoção de contratos de Total Waste Management (Gerenciamento Total de Resíduos). Nesse modelo, o prestador de serviço não é pago para "levar o problema embora", mas sim para auditar a planta, otimizar a segregação na fonte e reinserir fluxos de materiais em novas cadeias produtivas.' },
  { type: 'quote', text: 'A monetização do passivo ambiental só acontece quando deixamos de gerenciar lixo e passamos a gerenciar recursos secundários.' }
];

const ARTICLE_BODY_CARBONO = [
  { type: 'lead', text: 'A aprovação do Sistema Brasileiro de Comércio de Emissões (SBCE) altera definitivamente a contabilidade das grandes operações no país. O carbono deixa de ser um indicador voluntário para se tornar um ativo (ou um passivo) regulado.' },
  { type: 'p', text: 'O cronograma escalonado do SBCE dará tempo para adaptação, mas as empresas que emitem acima de 10 mil toneladas de CO2e/ano já precisam ter sistemas robustos de Monitoramento, Relato e Verificação (MRV).' },
  { type: 'h2', text: 'O impacto na operação diária' },
  { type: 'p', text: 'Para os setores regulados (como cimento, siderurgia e óleo e gás), o custo da emissão entrará no cálculo de viabilidade de qualquer novo projeto. Além disso, a compra de créditos de carbono no mercado voluntário exigirá diligência extrema para garantir a integridade do crédito e evitar acusações de greenwashing.' }
];

const ARTICLE_BODY_AGUA = [
  { type: 'lead', text: 'O licenciamento ambiental de novos projetos industriais no Brasil esbarra cada vez mais em um gargalo crítico: a disponibilidade hídrica. Negligenciar a estratégia de captação e efluentes na fase de viabilidade é garantia de atraso.' },
  { type: 'p', text: 'Mapeamos os três erros mais comuns que travam processos de outorga nos órgãos gestores estaduais e na ANA (Agência Nacional de Águas):' },
  { type: 'numlist', items: [
    'Dimensionamento Incorreto: Solicitar vazões baseadas na capacidade máxima teórica dos equipamentos, e não no balanço hídrico real da planta, inviabilizando a outorga em bacias com conflito de uso.',
    'Desconexão com o Efluente: Projetar a captação sem atrelar a modelagem de dispersão e a capacidade de diluição do corpo receptor para o lançamento do efluente tratado.',
    'Ausência de Alternativas: Não apresentar, no projeto básico, estudos de reuso interno ou captação de água de chuva para fins menos nobres (lavagem de piso, resfriamento).'
  ] },
  { type: 'p', text: 'A água não é um recurso infinito. A engenharia ambiental deve provar ao órgão regulador que a empresa sabe usar cada gota de forma eficiente.' }
];

const ARTICLE_BODY_ISO_2026 = [
  { type: 'lead', text: 'Publicada oficialmente no dia 15 de abril de 2026, a nova versão da ISO 14001 encerra anos de revisão técnica. A boa notícia? Quem já possui um sistema maduro não precisará recomeçar do zero. A má notícia para quem tratava a norma como um checklist burocrático? O cerco sobre o ciclo de vida e a cadeia de valor acabou de ficar muito mais rigoroso.' },
  { type: 'p', text: 'Substituindo a edição de 2015, a ISO 14001:2026 mantém a Estrutura Harmonizada (Anexo SL), mas eleva a gestão ambiental a um patamar de gestão de risco inegociável. As organizações certificadas terão um período de transição de três anos (até maio de 2029) para adequarem seus Sistemas de Gestão Ambiental (SGA).' },
  { type: 'h2', text: 'As 3 principais mudanças da versão 2026' },
  { type: 'p', text: 'A atualização não é apenas editorial. A norma agora reflete as fronteiras planetárias de forma muito mais explícita. Preste atenção nestes três pilares:' },
  { type: 'numlist', items: [
    'Novo Requisito 6.3 - Planejamento de Mudanças: Uma lacuna histórica foi preenchida. A partir de agora, a norma exige um processo estruturado para prever, responder e gerenciar mudanças organizacionais e técnicas no SGA (um alinhamento direto com o que já existia na ISO 9001).',
    'Expansão do Controle Operacional (Seção 8.1): O foco ultrapassa os limites físicos da planta. O conceito de "gerenciamento de externalidades" foi redefinido, cobrando que as organizações estendam o rigor e o controle ambiental para os produtos, serviços e processos fornecidos externamente (fornecedores e parceiros logísticos).',
    'Fronteiras Planetárias e Clima: O alinhamento com a agenda global agora é textual. A análise de contexto e a identificação de aspectos ambientais significativos devem considerar explicitamente questões como mudanças climáticas, biodiversidade, água e escassez de recursos.'
  ] },
  { type: 'h2', text: 'A armadilha na Avaliação de Desempenho' },
  { type: 'p', text: 'Com a inclusão de temas complexos cobrindo toda a cadeia de valor, a Avaliação de Desempenho (Seção 9) se tornará o principal alvo de não-conformidades durante as auditorias de transição.' },
  { type: 'p', text: 'Aqui, a diferenciação técnica entre indicadores no processo de auditoria separa sistemas de gestão maduros de sistemas frágeis. É fundamental que a empresa distinja com clareza o que são indicadores diretos e indiretos na hora de comprovar os Padrões de Desempenho Ambiental.' },
  { type: 'p', text: 'O envio de cartilhas ou a realização de auditorias documentais em fornecedores representam esforço (indicadores indiretos). No entanto, para comprovar o atendimento à nova Seção 8.1, o auditor buscará a redução real do impacto no ciclo de vida — como a redução mensurável de emissões ou de geração de resíduos na cadeia logística contratada (indicadores diretos).' },
  { type: 'quote', text: 'A ISO 14001:2026 deixa claro: a empresa é corresponsável pelo impacto daqueles que operam em seu nome.' },
  { type: 'h2', text: 'O plano de ação imediato' },
  { type: 'p', text: 'O prazo de transição até 2029 não deve ser motivo para inércia. O primeiro passo estratégico é realizar uma Análise de Gaps (Gap Analysis) confrontando o seu SGA atual com as novas exigências de ciclo de vida e planejamento de mudanças. Revisar o controle de parceiros e garantir que seus indicadores de fato reflitam mitigação ambiental são os passaportes para uma transição sem sustos.' }
];

const ARTICLE_BODY_PME_ESG = [
  { type: 'lead', text: 'Existe uma percepção comum de que ESG é coisa de empresa grande. De multinacional com relatório anual de 200 páginas, equipe dedicada de sustentabilidade e consultoria internacional na porta. Mas essa ideia está ficando cada vez mais para trás, e a boa notícia é que muita empresa pequena já está na frente sem nem ter percebido.' },
  { type: 'h2', text: 'O que você provavelmente já faz' },
  { type: 'p', text: 'Se a sua empresa separa o lixo, tem alguma preocupação com o bem-estar dos funcionários, ou simplesmente opera dentro da lei, você já pratica ESG. O problema, na maioria das vezes, não é ausência de ação. É ausência de registro, estrutura e narrativa. A diferença entre uma empresa que "já faz coisas sustentáveis" e uma empresa com agenda ESG é basicamente essa: organização e intenção.' },
  { type: 'p', text: 'Pesquisas recentes mostram que a grande maioria das PMEs já adota algum tipo de prática ESG no dia a dia. O que falta, em geral, é transformar essas práticas em algo gerenciável e comunicável.' },
  { type: 'h2', text: 'Por onde começar de verdade' },
  { type: 'p', text: 'O primeiro movimento é fazer um diagnóstico honesto. Não é preciso contratar ninguém para isso agora. Olha para dentro da operação: quanto a empresa consome de energia e água por mês? Qual é o destino dos resíduos gerados? Existe alguma política formal de contratação ou de relacionamento com fornecedores? Essas perguntas simples já revelam muito.' },
  { type: 'p', text: 'A partir daí, o próximo passo é escolher dois ou três pontos prioritários para trabalhar, aqueles que fazem mais sentido para o seu setor e para o tamanho da sua operação. Uma meta de reduzir o consumo de energia em 15% nos próximos 12 meses é infinitamente mais útil do que um plano genérico de "ser sustentável". Concretude é o que transforma intenção em resultado.' },
  { type: 'h2', text: 'Governança não precisa ser complicada' },
  { type: 'p', text: 'A palavra "governança" intimida, mas na prática ela significa apenas que alguém dentro da empresa é responsável por acompanhar essas metas e que existe um processo mínimo de decisão. Para uma PME, isso pode ser tão simples quanto uma reunião mensal para revisar indicadores e um canal aberto para feedbacks da equipe.' },
  { type: 'p', text: 'O que a estrutura de governança faz é garantir que o ESG não seja apenas um projeto de momento, mas algo integrado à gestão. Sem essa âncora, os esforços tendem a se perder com o tempo ou ficarem dependentes da motivação de uma única pessoa.' },
  { type: 'h2', text: 'Métricas não precisam ser sofisticadas' },
  { type: 'p', text: 'Um relatório de impacto não precisa ser extenso para ser honesto e útil. Para começar, basta monitorar alguns indicadores básicos: consumo mensal de energia e água, geração de resíduos por tipo de destinação, taxa de rotatividade e horas de treinamento por funcionário. Com esses dados em mão, você já consegue identificar tendências, comunicar evolução e, eventualmente, atrair fornecedores, clientes e investidores que valorizam essa transparência.' },
  { type: 'p', text: 'Em 2026, esse movimento deixou de ser diferencial para se tornar condição de acesso a certas cadeias de valor. Empresas maiores estão começando a exigir critérios ESG de quem fornece para elas, e isso afeta diretamente quem quer crescer e manter contratos relevantes.' },
  { type: 'h2', text: 'Começar pelo que existe' },
  { type: 'p', text: 'A jornada ESG de uma PME não começa do zero. Começa pelo mapeamento do que já existe, pela formalização do que já é feito e pela escolha consciente de onde melhorar. Esse caminho é muito mais acessível do que parece, e os resultados aparecem antes do que se imagina: redução de custos operacionais, melhora no clima interno, acesso a linhas de crédito com juros menores e uma reputação que se constrói de forma consistente.' },
  { type: 'p', text: 'Não é uma transformação que acontece da noite para o dia, e não precisa ser. É uma jornada que começa com perguntas simples e avança no ritmo da empresa. O importante é começar.' },
  { type: 'quote', text: 'Se você quer estruturar a jornada ESG da sua empresa sem complicar a operação, a equipe da AERA pode te ajudar. Entre em contato pelo e-mail comercial@aerasustentavel.com.br e vamos conversar sobre o que faz sentido para o seu negócio.' },
];

const ARTICLES_CONTENT = {
  'esg-vida-real-intro': ARTICLE_BODY_ESG_INTRO,
  'esg-vida-real-cap1':  ARTICLE_BODY_ESG_CAP1,
  'esg-vida-real-cap2':  ARTICLE_BODY_ESG_CAP2,
  'esg-vida-real-cap3':  ARTICLE_BODY_ESG_CAP3,
  'esg-vida-real-cap4':  ARTICLE_BODY_ESG_CAP4,
  'esg-vida-real-cap5':  ARTICLE_BODY_ESG_CAP5,
  'iso-14001-2026':  ARTICLE_BODY_ISO_2026,
  'consumidor-clima': ARTICLE_BODY_CLIMA,
  'mtr-digital':     ARTICLE_BODY_MTR,
  'iso-14001':       ARTICLE_BODY_ISO,
  'reporte-gri':     ARTICLE_BODY_GRI,
  'biodiversidade':  ARTICLE_BODY_TNFD,
  'economia-circular': ARTICLE_BODY_CIRCULAR,
  'creditos-carbono': ARTICLE_BODY_CARBONO,
  'agua-industrial': ARTICLE_BODY_AGUA,
  'pme-jornada-esg': ARTICLE_BODY_PME_ESG,
};

const COMMENTS = [];

Object.assign(window, {
  BRAND, Storage, sharePost, useIsMobile,
  AerialPlaceholder, AERIAL_VARIANTS, TopoLines, AeraLogo, Icon,
  CATEGORIES, POSTS, ARTICLES_CONTENT, COMMENTS,
});
