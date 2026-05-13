// Home v1 — Vista Aérea Cinematográfica

function HomeCinema({ onOpenPost, onOpenSearch, initialCat = 'todos', onCatChange }) {
  const [activeCat, setActiveCat] = React.useState(initialCat);
  const isMobile = useIsMobile();

  React.useEffect(() => { setActiveCat(initialCat); }, [initialCat]);

  const handleCatChange = (cat) => {
    setActiveCat(cat);
    onCatChange && onCatChange(cat);
  };

  const featured = POSTS.find(p => p.featured);
  const rest = POSTS.filter(p => !p.featured && (activeCat === 'todos' || p.category === activeCat));
  const [secondary, ...grid] = rest;

  const px = isMobile ? '16px' : '48px';

  return (
    <div style={{ background: lightPal.bg, color: lightPal.text, fontFamily: "'Inter', sans-serif", minHeight: '100%' }}>
      <Nav palette={lightPal} onOpenSearch={onOpenSearch} onFilterCat={handleCatChange} />

      {/* HERO */}
      <section style={{ position: 'relative', height: isMobile ? 520 : 720, overflow: 'hidden' }}>
        <AerialPlaceholder variant="sky" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,22,40,0.15) 0%, rgba(10,22,40,0.05) 40%, rgba(10,22,40,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <TopoLines color="#ffffff" opacity={0.12} />
        </div>
        {!isMobile && (
          <div style={{ position: 'absolute', top: 100, right: 48, color: 'rgba(255,255,255,0.55)',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', fontSize: 11, letterSpacing: '0.08em', textAlign: 'right', lineHeight: 1.7 }}>
            <div>—— BLOG · ED. 042</div>
            <div>22.04.2026  ·  SP −23.55°</div>
            <div>ALT 10.500 m  ·  ATM 264 ppm CO₂</div>
          </div>
        )}

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: isMobile ? `0 ${px} 36px` : `0 ${px} 64px` }}>
          <div style={{ maxWidth: 880 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 12px',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)', borderRadius: 999,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#fff', marginBottom: isMobile ? 16 : 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: BRAND.green, boxShadow: `0 0 8px ${BRAND.green}` }} />
              Em destaque · ESG
            </div>
            {featured && <>
              <h1 onClick={() => onOpenPost(featured.id)}
                style={{ fontSize: isMobile ? 34 : 72, fontWeight: 800,
                  lineHeight: isMobile ? 1.1 : 1.05, letterSpacing: '-0.025em', color: '#fff',
                  marginBottom: isMobile ? 14 : 24, cursor: 'pointer' }}>
                {featured.title}
              </h1>
              {!isMobile && (
                <p style={{ fontSize: 19, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', maxWidth: 680, marginBottom: 32, fontWeight: 400 }}>
                  {featured.excerpt}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: isMobile ? 10 : 24,
                color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                {!isMobile && <>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 14, background: BRAND.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>AE</span>
                    {featured.author}
                  </span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.clock /> {featured.readTime}</span>
                </>}
                <button onClick={() => onOpenPost(featured.id)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: isMobile ? '12px 20px' : '14px 24px',
                    background: BRAND.blue, border: 'none', color: '#fff',
                    fontSize: isMobile ? 13 : 14, fontWeight: 600,
                    borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Ler artigo <Icon.arrow />
                </button>
              </div>
            </>}
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section id="category-strip" style={{ borderBottom: `1px solid ${lightPal.border}`, position: 'sticky', top: 56, background: `${lightPal.bg}EE`, backdropFilter: 'blur(12px)', zIndex: 20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${px}`,
          display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 28,
          height: 48, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {!isMobile && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: lightPal.muted, flexShrink: 0 }}>Editorias</span>}
          {[{ id: 'todos', name: 'Todos' }, ...CATEGORIES].map(c => (
            <button key={c.id} onClick={() => handleCatChange(c.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: isMobile ? 13 : 14, fontWeight: activeCat === c.id ? 600 : 500,
                color: activeCat === c.id ? lightPal.text : lightPal.muted,
                position: 'relative', padding: '16px 0', flexShrink: 0,
                borderBottom: activeCat === c.id ? `2px solid ${BRAND.blue}` : '2px solid transparent',
                marginBottom: -1 }}>
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* SECONDARY FEATURE + GRID */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '32px 16px' : '64px 48px' }}>
        {secondary && (
          <div onClick={() => onOpenPost(secondary.id)}
            style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
              gap: isMobile ? 24 : 56, marginBottom: isMobile ? 48 : 80, cursor: 'pointer', alignItems: 'center' }}>
            <div style={{ aspectRatio: '4 / 3', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
              <AerialPlaceholder variant={secondary.image} label={`${secondary.category} · cobertura aérea`} />
            </div>
            <div>
              <CategoryTag cat={secondary.category} />
              <h2 style={{ fontSize: isMobile ? 26 : 44, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em',
                color: lightPal.text, margin: '14px 0', textWrap: 'balance' }}>{secondary.title}</h2>
              {!isMobile && <p style={{ fontSize: 17, lineHeight: 1.65, color: lightPal.textMuted, marginBottom: 28 }}>{secondary.excerpt}</p>}
              <Meta post={secondary} palette={lightPal} />
            </div>
          </div>
        )}

        {rest.length === 0 && (
          <div style={{ padding: '80px 0', textAlign: 'center', color: lightPal.muted }}>
            <div style={{ fontSize: 40, opacity: 0.25, marginBottom: 16 }}>∅</div>
            <p style={{ fontSize: 15 }}>Nenhum artigo nesta categoria ainda.</p>
            <button onClick={() => handleCatChange('todos')}
              style={{ marginTop: 16, padding: '10px 20px', background: BRAND.blue, color: '#fff',
                border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Ver todos os artigos
            </button>
          </div>
        )}

        {grid.length > 0 && <>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 28, paddingBottom: 16, borderBottom: `1px solid ${lightPal.border}` }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 6 }}>Mais recentes</div>
              <h3 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 700, color: lightPal.text, letterSpacing: '-0.02em' }}>O horizonte da gestão ambiental</h3>
            </div>
            <span style={{ fontSize: 13, color: lightPal.muted, fontFamily: 'ui-monospace, monospace' }}>{grid.length.toString().padStart(2, '0')}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 32 : 40, rowGap: isMobile ? 32 : 56 }}>
            {grid.map((p, i) => (
              <PostCard key={p.id} post={p} palette={lightPal} onClick={() => onOpenPost(p.id)} variant={i === 0 && !isMobile ? 'tall' : 'default'} />
            ))}
          </div>
        </>}
      </section>

      <NewsletterBand palette={lightPal} isMobile={isMobile} />
      <Footer palette={lightPal} onFilterCat={handleCatChange} isMobile={isMobile} />
    </div>
  );
}

// ─────────── sub-components ───────────

function Nav({ palette, onOpenSearch, onFilterCat, variant = 'cinema' }) {
  const onDark = variant === 'cinema';
  const isMobile = useIsMobile();
  const NAV_CATS = [
    { label: 'Sustentabilidade', id: 'sustentabilidade' },
    { label: 'ESG',              id: 'esg' },
    { label: 'Resíduos',         id: 'residuos' },
    { label: 'Certificações',    id: 'certificacoes' },
  ];

  const handleNavCat = (id) => {
    onFilterCat && onFilterCat(id);
    const el = document.getElementById('category-strip');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50,
      background: onDark ? 'rgba(10,22,40,0.85)' : `${palette.bg}EE`,
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${onDark ? 'rgba(255,255,255,0.08)' : palette.border}`,
      height: 56, display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto',
        padding: isMobile ? '0 16px' : '0 32px',
        display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 32 }}>
        {/* Logo com link para o site principal */}
        <AeraLogo color={BRAND.blue} textColor={BRAND.blue} sub={false} size="sm" homeUrl="../" />
        <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, flexShrink: 0,
          background: onDark ? 'rgba(255,255,255,0.1)' : BRAND.bgAlt,
          color: onDark ? 'rgba(255,255,255,0.7)' : BRAND.textMuted,
          fontWeight: 600, letterSpacing: '0.05em' }}>BLOG</span>
        <div style={{ display: 'flex', gap: isMobile ? 8 : 20, marginLeft: 'auto', alignItems: 'center' }}>
          {!isMobile && NAV_CATS.map(({ label, id }) => (
            <button key={id} onClick={() => handleNavCat(id)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 13, fontWeight: 500, color: onDark ? 'rgba(255,255,255,0.85)' : palette.text }}>
              {label}
            </button>
          ))}
          <button onClick={onOpenSearch} style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: isMobile ? '7px 10px' : '8px 12px',
            background: onDark ? 'rgba(255,255,255,0.1)' : BRAND.bgAlt,
            border: `1px solid ${onDark ? 'rgba(255,255,255,0.15)' : palette.border}`,
            color: onDark ? 'rgba(255,255,255,0.7)' : palette.muted,
            borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12 }}>
            <Icon.search /> {!isMobile && 'Buscar'}
            {!isMobile && <kbd style={{ marginLeft: 6, fontSize: 10, padding: '2px 5px', background: onDark ? 'rgba(255,255,255,0.1)' : '#fff', borderRadius: 3, fontFamily: 'ui-monospace, monospace' }}>⌘K</kbd>}
          </button>
          {!isMobile && (
            <a href="../aera-app.html"
              style={{ padding: '8px 16px', background: BRAND.blue, color: '#fff', border: 'none',
                borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
              Acessar AERA APP
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

function CategoryTag({ cat }) {
  const c = CATEGORIES.find(x => x.id === cat) || CATEGORIES[0];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.color }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: c.color }} />
      {c.name}
    </span>
  );
}

function Meta({ post, palette, compact = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 10 : 16, fontSize: 12, color: palette.muted }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 24, height: 24, borderRadius: 12, background: BRAND.blue, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
          {post.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </span>
        <span style={{ color: palette.text, fontWeight: 500 }}>{post.author}</span>
      </span>
      <span>·</span>
      <span>{post.date}</span>
      <span>·</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon.clock /> {post.readTime}</span>
    </div>
  );
}

function PostCard({ post, palette, onClick, variant = 'default' }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ aspectRatio: variant === 'tall' ? '4 / 5' : '4 / 3', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', transition: 'transform .6s cubic-bezier(.2,.7,.3,1)', transform: hover ? 'scale(1.04)' : 'scale(1)' }}>
          <AerialPlaceholder variant={post.image} />
        </div>
        <div style={{ position: 'absolute', top: 14, left: 14,
          padding: '5px 10px', background: 'rgba(255,255,255,0.95)', borderRadius: 4,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: BRAND.navy }}>
          {(CATEGORIES.find(c => c.id === post.category) || {}).name}
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: variant === 'tall' ? 24 : 20, fontWeight: 700, lineHeight: 1.25,
          letterSpacing: '-0.015em', color: palette.text, marginBottom: 10, textWrap: 'balance',
          textDecoration: hover ? 'underline' : 'none', textDecorationColor: BRAND.blue, textUnderlineOffset: 4 }}>
          {post.title}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: palette.textMuted, marginBottom: 16,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>
        <Meta post={post} palette={palette} compact />
      </div>
    </article>
  );
}

function NewsletterBand({ palette, isMobile }) {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: BRAND.navy, color: '#fff' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <AerialPlaceholder variant="dawn" />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,22,40,0.8) 0%, rgba(10,22,40,0.95) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto',
        padding: isMobile ? '48px 16px' : '96px 48px',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
        gap: isMobile ? 32 : 80, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BRAND.green, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon.plane /> Newsletter
          </div>
          <h2 style={{ fontSize: isMobile ? 30 : 48, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 20, textWrap: 'balance' }}>
            Vista aérea da gestão ambiental, no seu inbox
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: 480 }}>
            Uma curadoria quinzenal com os movimentos relevantes em ESG, regulação ambiental e tecnologia para sustentabilidade. Sem ruído, sem newsletter genérica.
          </p>
        </div>
        <div>
          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: 28 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>Seu email corporativo</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@empresa.com.br"
                style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10,
                  color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none', marginBottom: 14 }} />
              <button type="submit" style={{ width: '100%', padding: '14px', background: BRAND.blue,
                border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, borderRadius: 10,
                cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                Inscrever-se <Icon.arrow />
              </button>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 12, textAlign: 'center' }}>
                Sem spam. Cancele quando quiser. ∼ 4.200 leitores.
              </p>
            </form>
          ) : (
            <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: 16, padding: 32, textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 24, background: BRAND.green, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icon.check style={{ width: 24, height: 24 }} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Você está dentro.</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Próxima edição na próxima quinta.</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ palette, onFilterCat, isMobile }) {
  const COLS = [
    { t: 'Editorias', items: [
      { label: 'Sustentabilidade', action: () => onFilterCat && onFilterCat('sustentabilidade') },
      { label: 'ESG',              action: () => onFilterCat && onFilterCat('esg') },
      { label: 'Resíduos',         action: () => onFilterCat && onFilterCat('residuos') },
      { label: 'Certificações',    action: () => onFilterCat && onFilterCat('certificacoes') },
    ]},
    { t: 'AERA', items: [
      { label: 'Sobre nós',   href: '../nossa-historia.html' },
      { label: 'AERA APP',   href: '../aera-app.html' },
      { label: 'Copilotos',  href: '../copilotos.html' },
      { label: 'Contato',    href: '../index.html#contato' },
    ]},
    { t: 'Recursos', items: [
      { label: 'Newsletter', action: () => document.querySelector('[placeholder="voce@empresa.com.br"]')?.focus() },
      { label: 'ESG',        action: () => onFilterCat && onFilterCat('esg') },
      { label: 'Certificações', action: () => onFilterCat && onFilterCat('certificacoes') },
      { label: 'Imprensa',   href: 'mailto:comercial@aerasustentavel.com.br' },
    ]},
  ];

  return (
    <footer style={{ background: palette.bgAlt, borderTop: `1px solid ${palette.border}`, padding: isMobile ? '40px 16px 24px' : '56px 48px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr', gap: isMobile ? 32 : 48, marginBottom: 48 }}>
        <div>
          <AeraLogo color={BRAND.blue} textColor={palette.text} size="md" homeUrl="../" />
          <p style={{ fontSize: 13, lineHeight: 1.7, color: palette.muted, marginTop: 16, maxWidth: 320 }}>
            Soluções Ambientais e Sustentáveis. Tecnologia + Propósito ambiental para empresas que querem operar com responsabilidade.
          </p>
        </div>
        {COLS.map(col => (
          <div key={col.t}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 14 }}>{col.t}</div>
            {col.items.map(item => (
              item.href
                ? <a key={item.label} href={item.href}
                    style={{ display: 'block', fontSize: 13, color: palette.textMuted, marginBottom: 10, cursor: 'pointer', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = BRAND.blue} onMouseLeave={e => e.target.style.color = palette.textMuted}>
                    {item.label}
                  </a>
                : <button key={item.label} onClick={item.action}
                    style={{ display: 'block', fontSize: 13, color: palette.textMuted, marginBottom: 10, cursor: 'pointer',
                      background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', textAlign: 'left' }}
                    onMouseEnter={e => e.target.style.color = BRAND.blue} onMouseLeave={e => e.target.style.color = palette.textMuted}>
                    {item.label}
                  </button>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingTop: 28, borderTop: `1px solid ${palette.border}`,
        display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 6 : 0, fontSize: 12, color: palette.muted }}>
        <span>© 2026 AERA — Soluções Ambientais e Sustentáveis</span>
        <span style={{ fontFamily: 'ui-monospace, monospace' }}>comercial@aerasustentavel.com.br · @aerasustentavel</span>
      </div>
    </footer>
  );
}

const lightPal = {
  bg: BRAND.bg, bgAlt: BRAND.bgAlt, text: BRAND.textPrimary, textMuted: BRAND.textSecondary,
  muted: BRAND.textMuted, border: BRAND.border,
};
const darkPal = {
  bg: '#06101F', bgAlt: '#0A1628', text: '#F1F5F9', textMuted: '#CBD5E1',
  muted: '#94A3B8', border: 'rgba(255,255,255,0.1)',
};

Object.assign(window, { HomeCinema, Nav, CategoryTag, Meta, PostCard, NewsletterBand, Footer, lightPal, darkPal });
