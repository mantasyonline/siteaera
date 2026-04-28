// Home v2 — Editorial Atmosférico
// Structured grid, metadata-rich cards, topographic accents, denser layout

function HomeEditorial({ onOpenPost, onOpenSearch, dark = false }) {
  const [activeCat, setActiveCat] = React.useState('todos');
  const palette = dark ? darkPal : lightPal;
  const featured = POSTS.find(p => p.featured);
  const filtered = POSTS.filter(p => !p.featured && (activeCat === 'todos' || p.category === activeCat));

  return (
    <div style={{ background: palette.bg, color: palette.text, fontFamily: "'Inter', sans-serif", minHeight: '100%' }}>
      {/* Top utility strip */}
      <div style={{ background: BRAND.navy, color: 'rgba(255,255,255,0.7)', fontSize: 11,
        letterSpacing: '0.06em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'ui-monospace, monospace' }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: BRAND.green, boxShadow: `0 0 6px ${BRAND.green}` }} />
            AERA · BLOG · ED. 042 · 22.04.2026
          </span>
          <span style={{ fontFamily: 'ui-monospace, monospace', display: 'flex', gap: 24 }}>
            <span>SP +18°C · 264 ppm CO₂</span>
            <span>↗ 2.1% YoY</span>
          </span>
        </div>
      </div>

      <Nav palette={palette} onOpenSearch={onOpenSearch} variant="editorial" />

      {/* MASTHEAD */}
      <header style={{ borderBottom: `1px solid ${palette.border}`, padding: '48px 40px 36px', background: palette.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BRAND.blue }}>
              Editoria · Vista de Cima
            </div>
            <div style={{ fontSize: 11, color: palette.muted, fontFamily: 'ui-monospace, monospace' }}>
              {filtered.length + 1} artigos · atualizado há 2h
            </div>
          </div>
          <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
            color: palette.text, textWrap: 'balance', maxWidth: 920 }}>
            Inteligência ambiental para quem opera no horizonte.
          </h1>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 28, gap: 32 }}>
            <p style={{ fontSize: 16, color: palette.textMuted, lineHeight: 1.6, maxWidth: 600 }}>
              Análises, dados e bastidores da gestão ambiental nas empresas brasileiras. Onde a regulação encontra a operação — e a estratégia ganha altitude.
            </p>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              {[{ id: 'todos', name: 'Todos' }, ...CATEGORIES].slice(0, 6).map(c => (
                <button key={c.id} onClick={() => setActiveCat(c.id)}
                  style={{ padding: '7px 14px', fontSize: 12, fontWeight: 500,
                    border: `1px solid ${activeCat === c.id ? BRAND.blue : palette.border}`,
                    background: activeCat === c.id ? BRAND.blue : 'transparent',
                    color: activeCat === c.id ? '#fff' : palette.text,
                    borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* HERO ARTICLE — split layout with topographic accent */}
      <section style={{ borderBottom: `1px solid ${palette.border}`, padding: '64px 40px', position: 'relative', overflow: 'hidden' }}>
        <TopoLines color={BRAND.blue} opacity={dark ? 0.06 : 0.05} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', display: 'grid',
          gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
          <div onClick={() => onOpenPost(featured.id)} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#fff', background: BRAND.blue, padding: '4px 10px', borderRadius: 3 }}>Em destaque</span>
              <CategoryTag cat={featured.category} />
            </div>
            <h2 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em',
              color: palette.text, marginBottom: 24, textWrap: 'balance' }}>
              {featured.title}
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: palette.textMuted, marginBottom: 28 }}>
              {featured.excerpt}
            </p>
            <Meta post={featured} palette={palette} />
            <button style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '12px 22px', background: 'transparent', border: `1.5px solid ${BRAND.blue}`,
              color: BRAND.blue, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Continuar a leitura <Icon.arrow />
            </button>
          </div>
          <div onClick={() => onOpenPost(featured.id)}
            style={{ aspectRatio: '5 / 4', borderRadius: 4, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
            <AerialPlaceholder variant="sky" label="Cobertura aérea · São Paulo · 22.04.26" />
            {/* Data overlay */}
            <div style={{ position: 'absolute', top: 16, right: 16, padding: '8px 12px',
              background: 'rgba(255,255,255,0.95)', borderRadius: 4, fontFamily: 'ui-monospace, monospace',
              fontSize: 10, lineHeight: 1.5, color: BRAND.navy }}>
              <div style={{ color: BRAND.blue, fontWeight: 700, letterSpacing: '0.08em' }}>23.55°S · 46.63°W</div>
              <div>Alt 10.500 m</div>
            </div>
          </div>
        </div>
      </section>

      {/* COLUMN GRID with rule */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: palette.text, letterSpacing: '-0.01em' }}>
            <span style={{ color: BRAND.blue, marginRight: 12 }}>—</span>
            Mais publicações
          </h3>
          <span style={{ fontSize: 12, color: palette.muted, fontFamily: 'ui-monospace, monospace' }}>
            Ordenado por data ↓
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48 }}>
          {/* Main column — list-style entries */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.slice(0, 4).map((p, i) => (
              <ListEntry key={p.id} post={p} palette={palette} onClick={() => onOpenPost(p.id)} index={i} />
            ))}
          </div>

          {/* Sidebar */}
          <aside>
            {/* Most read */}
            <div style={{ background: palette.bgAlt, border: `1px solid ${palette.border}`, borderRadius: 4,
              padding: 28, marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: BRAND.blue, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 1, background: BRAND.blue }} />
                Mais lidos da semana
              </div>
              {POSTS.slice(0, 4).map((p, i) => (
                <div key={p.id} onClick={() => onOpenPost(p.id)}
                  style={{ display: 'flex', gap: 14, padding: '14px 0', cursor: 'pointer',
                    borderTop: i > 0 ? `1px solid ${palette.border}` : 'none' }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: BRAND.blue, lineHeight: 1, fontFamily: 'ui-monospace, monospace', minWidth: 36 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35, color: palette.text, marginBottom: 4 }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: 11, color: palette.muted }}>
                      {p.readTime} · {p.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter card */}
            <div style={{ background: BRAND.navy, color: '#fff', borderRadius: 4, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                <AerialPlaceholder variant="dawn" />
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,22,40,0.6) 0%, rgba(10,22,40,0.95) 100%)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: BRAND.green, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon.plane /> Newsletter
                </div>
                <h4 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.01em' }}>
                  Vista aérea, no inbox
                </h4>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
                  Curadoria quinzenal sobre ESG, regulação e tecnologia ambiental.
                </p>
                <input type="email" placeholder="seu@email.com.br"
                  style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff', fontSize: 13,
                    fontFamily: 'inherit', outline: 'none', marginBottom: 8 }} />
                <button style={{ width: '100%', padding: '11px', background: BRAND.blue, border: 'none',
                  color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Inscrever-se →
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* TILE GRID — remaining */}
        <div style={{ marginTop: 64, paddingTop: 48, borderTop: `1px solid ${palette.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: BRAND.blue, marginBottom: 28 }}>+ Coberturas recentes</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {filtered.slice(4).map(p => (
              <PostCard key={p.id} post={p} palette={palette} onClick={() => onOpenPost(p.id)} />
            ))}
          </div>
        </div>
      </section>

      <Footer palette={palette} />
    </div>
  );
}

function ListEntry({ post, palette, onClick, index }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 28, padding: '28px 0',
        borderTop: index > 0 ? `1px solid ${palette.border}` : 'none', cursor: 'pointer' }}>
      <div style={{ aspectRatio: '4 / 3', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
        <AerialPlaceholder variant={post.image} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
          <CategoryTag cat={post.category} />
          <span style={{ fontSize: 11, color: palette.muted, fontFamily: 'ui-monospace, monospace' }}>
            {post.date} · {post.readTime}
          </span>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.015em',
          color: palette.text, marginBottom: 10, textWrap: 'balance',
          textDecoration: hover ? 'underline' : 'none', textDecorationColor: BRAND.blue, textUnderlineOffset: 4 }}>
          {post.title}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: palette.textMuted, marginBottom: 14 }}>
          {post.excerpt}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: palette.muted }}>
          <span style={{ width: 22, height: 22, borderRadius: 11, background: BRAND.blue, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>
            {post.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </span>
          <span style={{ color: palette.text, fontWeight: 500 }}>{post.author}</span>
          <span style={{ color: palette.muted }}>· {post.authorRole}</span>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { HomeEditorial, ListEntry });
