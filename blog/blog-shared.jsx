// Shared utilities for AERA blog: placeholders, icons, brand tokens, sample data

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

// Aerial-view SVG placeholder — generative gradient + subtle topographic feel
// Variants pick palette + composition that evokes flying/landscape/aerial
function AerialPlaceholder({ variant = 'sky', label, style, children }) {
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
        {/* horizon strip */}
        <rect x="0" y={v.horizonY} width="800" height={600 - v.horizonY} fill={`url(#h-${id})`} />
        {/* topographic / contour curves below horizon */}
        {v.contours.map((y, i) => (
          <path key={i}
            d={`M0 ${y} Q 200 ${y - 8 - i * 2} 400 ${y} T 800 ${y}`}
            stroke={v.lineColor} strokeWidth="0.7" fill="none" opacity={0.35 - i * 0.04} />
        ))}
        {/* faint clouds / haze above horizon */}
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
  // Dawn over forest — warm horizon, cool sky
  dawn: {
    stops: [{ o: '0%', c: '#1B3A6B' }, { o: '50%', c: '#3E6FA8' }, { o: '78%', c: '#7BA8D6' }, { o: '100%', c: '#0A2540' }],
    horizon: '#0A2540', horizonY: 360, sun: 0.55,
    contours: [400, 430, 460, 490, 520, 550, 580],
    clouds: [{ x: 150, y: 180, rx: 90, ry: 12, o: 0.12 }, { x: 600, y: 220, rx: 120, ry: 10, o: 0.18 }, { x: 320, y: 140, rx: 70, ry: 8, o: 0.1 }],
    lineColor: '#7BA8D6',
  },
  // Bright open sky — high altitude
  sky: {
    stops: [{ o: '0%', c: '#1462CC' }, { o: '40%', c: '#1877F2' }, { o: '75%', c: '#5BA3F5' }, { o: '100%', c: '#A8C9F0' }],
    horizon: '#0A1628', horizonY: 480, sun: 0.4,
    contours: [490, 510, 530, 550, 570, 590],
    clouds: [{ x: 200, y: 200, rx: 120, ry: 14, o: 0.25 }, { x: 550, y: 280, rx: 160, ry: 12, o: 0.32 }, { x: 700, y: 150, rx: 80, ry: 9, o: 0.18 }],
    lineColor: '#1462CC',
  },
  // Aerial forest / canopy — green
  forest: {
    stops: [{ o: '0%', c: '#0A2A1E' }, { o: '40%', c: '#14503A' }, { o: '70%', c: '#1F7A52' }, { o: '100%', c: '#22C55E' }],
    horizon: '#0A1628', horizonY: 200, sun: 0.25,
    contours: [240, 280, 320, 360, 400, 440, 480, 520, 560],
    clouds: [],
    lineColor: '#22C55E',
  },
  // Ocean / coast from above
  ocean: {
    stops: [{ o: '0%', c: '#0A1628' }, { o: '35%', c: '#0F2D52' }, { o: '70%', c: '#1462CC' }, { o: '100%', c: '#5BA3F5' }],
    horizon: '#0A1628', horizonY: 220, sun: 0.5,
    contours: [260, 300, 340, 380, 420, 460, 500, 540],
    clouds: [{ x: 100, y: 80, rx: 60, ry: 6, o: 0.15 }, { x: 450, y: 120, rx: 90, ry: 8, o: 0.2 }],
    lineColor: '#5BA3F5',
  },
  // Highway / road through landscape
  road: {
    stops: [{ o: '0%', c: '#1462CC' }, { o: '40%', c: '#5BA3F5' }, { o: '65%', c: '#C7B894' }, { o: '100%', c: '#3D2E1A' }],
    horizon: '#1A2540', horizonY: 280, sun: 0.4,
    contours: [320, 360, 400, 440, 480, 520, 560],
    clouds: [{ x: 200, y: 100, rx: 100, ry: 10, o: 0.2 }, { x: 580, y: 160, rx: 120, ry: 9, o: 0.18 }],
    lineColor: '#FFFFFF',
  },
  // Mist / fog mountains
  mist: {
    stops: [{ o: '0%', c: '#D8E3F2' }, { o: '50%', c: '#A8C9F0' }, { o: '100%', c: '#5BA3F5' }],
    horizon: '#0F2D52', horizonY: 350, sun: 0.7,
    contours: [380, 420, 460, 500, 540, 580],
    clouds: [{ x: 150, y: 250, rx: 130, ry: 16, o: 0.4 }, { x: 600, y: 280, rx: 180, ry: 18, o: 0.45 }],
    lineColor: '#0F2D52',
  },
  // Night / twilight aerial
  night: {
    stops: [{ o: '0%', c: '#050A14' }, { o: '50%', c: '#0A1628' }, { o: '100%', c: '#1462CC' }],
    horizon: '#000', horizonY: 420, sun: 0.3,
    contours: [450, 480, 510, 540, 570],
    clouds: [{ x: 300, y: 120, rx: 140, ry: 10, o: 0.08 }, { x: 650, y: 200, rx: 90, ry: 7, o: 0.06 }],
    lineColor: '#1877F2',
  },
};

// Topographic decoration — abstract contour lines
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

// AERA brand mark (logo)
function AeraLogo({ color = BRAND.blue, textColor, sub = true, size = 'md' }) {
  const s = size === 'sm' ? { box: 32, font: 15, sub: 10, gap: 10 } : size === 'lg' ? { box: 48, font: 24, sub: 13, gap: 14 } : { box: 38, font: 18, sub: 11, gap: 12 };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap }}>
      {/* Símbolo da Asa (Puxando o arquivo logo2.png) */}
      <div style={{ width: s.box, height: s.box, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="./logo2.png" alt="Logo AERA" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Nome Completo da Empresa */}
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontWeight: 900, fontSize: s.font, letterSpacing: '-0.01em', color: textColor || color }}>AERA</div>
        {sub && <div style={{ fontSize: s.sub, fontWeight: 500, color: textColor ? `${textColor}99` : BRAND.textMuted, marginTop: 1 }}>
          Soluções Ambientais e Sustentáveis
        </div>}
      </div>
    </div>
  );
}

// Minimal stroke icons
const Icon = {
  search: (p = {}) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/></svg>,
  arrow: (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 7h10M8 3l4 4-4 4"/></svg>,
  arrowDown: (p = {}) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M3 5l3 3 3-3"/></svg>,
  clock: (p = {}) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="6" cy="6" r="4.5"/><path d="M6 3.5V6l1.5 1" strokeLinecap="round"/></svg>,
  bookmark: (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" {...p}><path d="M3 2h8v10l-4-2.5L3 12V2z"/></svg>,
  share: (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="3.5" cy="7" r="1.5"/><circle cx="10.5" cy="3.5" r="1.5"/><circle cx="10.5" cy="10.5" r="1.5"/><path d="M5 6.3l4-2M5 7.7l4 2"/></svg>,
  menu: (p = {}) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M3 5h12M3 9h12M3 13h12"/></svg>,
  close: (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M3 3l8 8M11 3l-8 8"/></svg>,
  heart: (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" {...p}><path d="M7 12s-4.5-2.7-4.5-6a2.5 2.5 0 0 1 4.5-1.5A2.5 2.5 0 0 1 11.5 6c0 3.3-4.5 6-4.5 6z"/></svg>,
  comment: (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" {...p}><path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6l-3 2V4z"/></svg>,
  check: (p = {}) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2.5 6.5l2.5 2.5L10 3.5"/></svg>,
  plane: (p = {}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" {...p}><path d="M2 8l11-5-3 11-2.5-4.5L2 8z"/></svg>,
};

// Categories
const CATEGORIES = [
  { id: 'sustentabilidade', name: 'Sustentabilidade', color: BRAND.green },
  { id: 'meio-ambiente', name: 'Meio Ambiente', color: '#0EA5A4' },
  { id: 'esg', name: 'ESG', color: BRAND.blue },
  { id: 'certificacoes', name: 'Certificações', color: '#7C3AED' },
  { id: 'residuos', name: 'Gestão de Resíduos', color: '#F59E0B' },
];

// Sample posts — first one is the real article from the user
const POSTS = [
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
    featured: true,
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
];

// Article body — for the post page (the user's real post)
// 1. Renomeamos o artigo antigo para identificar que é sobre o Clima
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

// 2. Adicionamos o novo artigo do MTR
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
// --- NOVOS ARTIGOS ---

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

// --- ATUALIZAÇÃO DO DICIONÁRIO ---
// Substitua o dicionário antigo por este, que agora engloba todos os artigos.

const ARTICLES_CONTENT = {
  'consumidor-clima': ARTICLE_BODY_CLIMA,
  'mtr-digital': ARTICLE_BODY_MTR,
  'iso-14001': ARTICLE_BODY_ISO,
  'reporte-gri': ARTICLE_BODY_GRI,
  'biodiversidade': ARTICLE_BODY_TNFD,
  'economia-circular': ARTICLE_BODY_CIRCULAR,
  'creditos-carbono': ARTICLE_BODY_CARBONO,
  'agua-industrial': ARTICLE_BODY_AGUA
};

// Exporte o ARTICLES_CONTENT (esta deve ser a última linha do arquivo blog-shared.jsx)
Object.assign(window, { BRAND, AerialPlaceholder, AERIAL_VARIANTS, TopoLines, AeraLogo, Icon, CATEGORIES, POSTS, ARTICLES_CONTENT, COMMENTS });