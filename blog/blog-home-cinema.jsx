// Home v1 — Vista Aérea Cinematográfica
// Edge-to-edge hero with horizon, asymmetric magazine grid, atmospheric.

function HomeCinema({ onOpenPost, onOpenSearch, dark = false }) {
  const [activeCat, setActiveCat] = React.useState('todos');
  const palette = dark ? darkPal : lightPal;

  const featured = POSTS.find(p => p.featured);
  const rest = POSTS.filter(p => !p.featured && (activeCat === 'todos' || p.category === activeCat));
  const [secondary, ...grid] = rest;

  return (
    <div style={{ background: palette.bg, color: palette.text, fontFamily: "'Inter', sans-serif", minHeight: '100%' }}>
      {/* NAV */}
      <Nav palette={palette} onOpenSearch={onOpenSearch} variant="cinema" />

      {/* HERO — full-bleed aerial */}
      <section style={{ position: 'relative', height: 720, overflow: 'hidden' }}>
        <AerialPlaceholder variant={dark ? 'night' : 'sky'} />
        {/* Overlay gradient for text legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,22,40,0.15) 0%, rgba(10,22,40,0.05) 40%, rgba(10,22,40,0.7) 100%)' }} />
        {/* Topographic overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <TopoLines color="#ffffff" opacity={0.12} />
        </div>
        {/* Coordinates / data overlay top-right */}
        <div style={{ position: 'absolute', top: 100, right: 48, color: 'rgba(255,255,255,0.55)',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', fontSize: 11, letterSpacing: '0.08em', textAlign: 'right', lineHeight: 1.7 }}>
          <div>—— BLOG · ED. 042</div>
          <div>22.04.2026  ·  SP −23.55°</div>
          <div>ALT 10.500 m  ·  ATM 264 ppm CO₂</div>
        </div>

        {/* Hero content */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 48px 64px', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ maxWidth: 880 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 12px',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)', borderRadius: 999,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: BRAND.green, boxShadow: `0 0 8px ${BRAND.green}` }} />
              Em destaque · ESG
            </div>
            <h1 onClick={() => onOpenPost(featured.id)}
              style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em', color: '#fff',
                marginBottom: 24, cursor: 'pointer', textWrap: 'balance' }}>
              {featured.title}
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', maxWidth: 680, marginBottom: 32, fontWeight: 400 }}>
              {featured.excerpt}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: 14, background: BRAND.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>AE</span>
                {featured.author}
              </span>
              <span>·</span>
              <span>{featured.date}</span>
              <span>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.clock /> {featured.readTime}</span>
              <button onClick={() => onOpenPost(featured.id)}
                style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px',
                  background: BRAND.blue, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600,
                  borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                Ler artigo completo <Icon.arrow />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span>Continuar</span>
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section style={{ borderBottom: `1px solid ${palette.border}`, position: 'sticky', top: 64, background: `${palette.bg}EE`, backdropFilter: 'blur(12px)', zIndex: 20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', gap: 28, height: 56, overflowX: 'auto' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: palette.muted, flexShrink: 0 }}>Editorias</span>
          {[{ id: 'todos', name: 'Todos' }, ...CATEGORIES].map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 14, fontWeight: activeCat === c.id ? 600 : 500,
                color: activeCat === c.id ? palette.text : palette.muted,
                position: 'relative', padding: '20px 0', flexShrink: 0,
                borderBottom: activeCat === c.id ? `2px solid ${BRAND.blue}` : '2px solid transparent',
                marginBottom: -1 }}>
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* SECONDARY FEATURE + GRID */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 48px' }}>
        {secondary && (
          <div onClick={() => onOpenPost(secondary.id)}
            style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, marginBottom: 80, cursor: 'pointer', alignItems: 'center' }}>
            <div style={{ aspectRatio: '4 / 3', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
              <AerialPlaceholder variant={secondary.image} label={`${secondary.category} · cobertura aérea`} />
            </div>
            <div>
              <CategoryTag cat={secondary.category} />
              <h2 style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
                color: palette.text, margin: '20px 0 20px', textWrap: 'balance' }}>{secondary.title}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: palette.textMuted, marginBottom: 28 }}>{secondary.excerpt}</p>
              <Meta post={secondary} palette={palette} />
            </div>
          </div>
        )}

        {/* Grid heading */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36, paddingBottom: 20, borderBottom: `1px solid ${palette.border}` }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 8 }}>Mais recentes</div>
            <h3 style={{ fontSize: 32, fontWeight: 700, color: palette.text, letterSpacing: '-0.02em' }}>O horizonte da gestão ambiental</h3>
          </div>
          <span style={{ fontSize: 13, color: palette.muted, fontFamily: 'ui-monospace, monospace' }}>{grid.length.toString().padStart(2, '0')} artigos</span>
        </div>

        {/* Magazine grid: 3 columns, varying card sizes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, rowGap: 56 }}>
          {grid.map((p, i) => (
            <PostCard key={p.id} post={p} palette={palette} onClick={() => onOpenPost(p.id)} variant={i === 0 ? 'tall' : 'default'} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER BAND */}
      <NewsletterBand palette={palette} />

      <Footer palette={palette} />
    </div>
  );
}

// ─────────── shared sub-components ───────────

function Nav({ palette, onOpenSearch, variant = 'cinema' }) {
  const onDark = variant === 'cinema';
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50,
      background: onDark ? 'rgba(10,22,40,0.85)' : `${palette.bg}EE`,
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${onDark ? 'rgba(255,255,255,0.08)' : palette.border}`,
      height: 64, display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', gap: 40 }}>
        <AeraLogo color={BRAND.blue} textColor={onDark ? '#fff' : BRAND.navy} sub={false} size="sm" />
        <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4,
          background: onDark ? 'rgba(255,255,255,0.1)' : BRAND.bgAlt,
          color: onDark ? 'rgba(255,255,255,0.7)' : BRAND.textMuted,
          fontWeight: 600, letterSpacing: '0.05em' }}>BLOG</span>
        <div style={{ display: 'flex', gap: 28, marginLeft: 'auto', alignItems: 'center' }}>
          {['Sustentabilidade', 'ESG', 'Resíduos', 'Certificações'].map(l => (
            <a key={l} style={{ fontSize: 13, fontWeight: 500, color: onDark ? 'rgba(255,255,255,0.85)' : palette.text, textDecoration: 'none', cursor: 'pointer' }}>{l}</a>
          ))}
          <button onClick={onOpenSearch} style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', background: onDark ? 'rgba(255,255,255,0.1)' : BRAND.bgAlt,
            border: `1px solid ${onDark ? 'rgba(255,255,255,0.15)' : palette.border}`,
            color: onDark ? 'rgba(255,255,255,0.7)' : palette.muted,
            borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12 }}>
            <Icon.search /> Buscar
            <kbd style={{ marginLeft: 8, fontSize: 10, padding: '2px 5px', background: onDark ? 'rgba(255,255,255,0.1)' : '#fff', borderRadius: 3, fontFamily: 'ui-monospace, monospace' }}>⌘K</kbd>
          </button>
          <button style={{ padding: '9px 18px', background: BRAND.blue, color: '#fff', border: 'none',
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Acessar AERA APP
          </button>
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

function NewsletterBand({ palette }) {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: BRAND.navy, color: '#fff' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <AerialPlaceholder variant="dawn" />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,22,40,0.8) 0%, rgba(10,22,40,0.95) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '96px 48px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BRAND.green, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon.plane /> Newsletter
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 20, textWrap: 'balance' }}>
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

function Footer({ palette }) {
  return (
    <footer style={{ background: palette.bgAlt, borderTop: `1px solid ${palette.border}`, padding: '56px 48px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
        <div>
          <AeraLogo color={BRAND.blue} textColor={palette.text} size="md" />
          <p style={{ fontSize: 13, lineHeight: 1.7, color: palette.muted, marginTop: 16, maxWidth: 320 }}>
            Soluções Ambientais e Sustentáveis. Tecnologia + Propósito ambiental para empresas que querem operar com responsabilidade.
          </p>
        </div>
        {[
          { t: 'Editorias', l: ['Sustentabilidade', 'ESG', 'Resíduos', 'Certificações'] },
          { t: 'AERA', l: ['Sobre nós', 'AERA APP', 'Casos', 'Contato'] },
          { t: 'Recursos', l: ['Newsletter', 'Whitepapers', 'Eventos', 'Imprensa'] },
        ].map(col => (
          <div key={col.t}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 14 }}>{col.t}</div>
            {col.l.map(item => (
              <a key={item} style={{ display: 'block', fontSize: 13, color: palette.textMuted, marginBottom: 10, cursor: 'pointer', textDecoration: 'none' }}>{item}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingTop: 28, borderTop: `1px solid ${palette.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: palette.muted }}>
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
