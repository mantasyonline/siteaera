// Search modal/page

function SearchPage({ onClose, onOpenPost, dark = false, embedded = false }) {
  const palette = dark ? darkPal : lightPal;
  const [q, setQ] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('todos');
  const inputRef = React.useRef(null);

  React.useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const results = POSTS.filter(p => {
    if (activeFilter !== 'todos' && p.category !== activeFilter) return false;
    if (!q) return true;
    const lq = q.toLowerCase();
    return p.title.toLowerCase().includes(lq) || p.excerpt.toLowerCase().includes(lq) ||
      p.tags.some(t => t.toLowerCase().includes(lq)) || p.author.toLowerCase().includes(lq);
  });

  const trending = ['ESG', 'MTR Digital', 'ISO 14001', 'Crédito de carbono', 'GRI'];

  return (
    <div style={{ position: embedded ? 'absolute' : 'fixed', inset: 0, zIndex: embedded ? 1 : 1000,
      background: dark ? '#06101F' : '#F8FAFE',
      backdropFilter: embedded ? 'none' : 'blur(20px)', overflowY: 'auto', fontFamily: "'Inter', sans-serif", color: palette.text }}>
      {/* Header */}
      <header style={{ borderBottom: `1px solid ${palette.border}`, padding: '20px 40px', position: embedded ? 'static' : 'sticky', top: 0,
        background: dark ? 'rgba(6,16,31,0.96)' : 'rgba(248,250,254,0.97)', backdropFilter: 'blur(20px)', zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <AeraLogo color={BRAND.blue} textColor={palette.text} sub={false} size="sm" />
          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: palette.bgAlt,
            color: palette.muted, fontWeight: 600, letterSpacing: '0.05em' }}>BUSCA</span>
          <div style={{ flex: 1 }} />
          <button onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 12px', background: palette.bgAlt, border: `1px solid ${palette.border}`,
            color: palette.muted, borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12 }}>
            <Icon.close /> Esc
          </button>
        </div>
      </header>

      {/* Search input */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 40px 32px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
          color: BRAND.blue, marginBottom: 16, fontFamily: 'ui-monospace, monospace' }}>
          / busca · ed. 042
        </div>
        <div style={{ position: 'relative', borderBottom: `2px solid ${palette.text}`, paddingBottom: 4 }}>
          <input ref={inputRef} type="text" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="O que você procura?"
            style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none',
              fontSize: 48, fontWeight: 700, fontFamily: 'inherit', color: palette.text,
              padding: '8px 48px 8px 0', letterSpacing: '-0.02em' }} />
          <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: palette.muted }}>
            <Icon.search style={{ width: 28, height: 28 }} />
          </span>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
          {[{ id: 'todos', name: 'Todos' }, ...CATEGORIES].map(c => (
            <button key={c.id} onClick={() => setActiveFilter(c.id)}
              style={{ padding: '8px 16px', fontSize: 12, fontWeight: 500,
                border: `1px solid ${activeFilter === c.id ? BRAND.blue : palette.border}`,
                background: activeFilter === c.id ? BRAND.blue : 'transparent',
                color: activeFilter === c.id ? '#fff' : palette.text,
                borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit' }}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results / trending */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 40px 80px' }}>
        {!q && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: palette.muted, marginBottom: 14 }}>Em alta no momento</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {trending.map(t => (
                <button key={t} onClick={() => setQ(t)} style={{ padding: '10px 18px', background: palette.bgAlt,
                  border: `1px solid ${palette.border}`, borderRadius: 999, fontSize: 13, fontWeight: 500,
                  color: palette.text, cursor: 'pointer', fontFamily: 'inherit',
                  display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Icon.search /> {t}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24,
          paddingBottom: 16, borderBottom: `1px solid ${palette.border}` }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: palette.text }}>
            {q ? `Resultados para "${q}"` : 'Todos os artigos'}
          </span>
          <span style={{ fontSize: 12, color: palette.muted, fontFamily: 'ui-monospace, monospace' }}>
            {String(results.length).padStart(2, '0')} {results.length === 1 ? 'artigo' : 'artigos'}
          </span>
        </div>

        {results.length === 0 ? (
          <div style={{ padding: '64px 0', textAlign: 'center', color: palette.muted }}>
            <div style={{ fontSize: 48, opacity: 0.3, marginBottom: 16 }}>∅</div>
            <p style={{ fontSize: 14 }}>Nenhum artigo encontrado para "<strong style={{ color: palette.text }}>{q}</strong>".</p>
          </div>
        ) : (
          <div>
            {results.map((p, i) => (
              <article key={p.id} onClick={() => { onOpenPost(p.id); onClose(); }}
                style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 24, alignItems: 'center',
                  padding: '20px 0', borderTop: i > 0 ? `1px solid ${palette.border}` : 'none', cursor: 'pointer' }}>
                <div style={{ aspectRatio: '4 / 3', borderRadius: 3, overflow: 'hidden' }}>
                  <AerialPlaceholder variant={p.image} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                    <CategoryTag cat={p.category} />
                    <span style={{ fontSize: 11, color: palette.muted, fontFamily: 'ui-monospace, monospace' }}>{p.date}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, color: palette.text, marginBottom: 6 }}>
                    {q ? <Highlight text={p.title} q={q} /> : p.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: palette.textMuted,
                    display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.excerpt}
                  </p>
                </div>
                <div style={{ color: palette.muted, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                  <Icon.clock /> {p.readTime}
                  <Icon.arrow style={{ marginLeft: 8 }} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function Highlight({ text, q }) {
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi'));
  return <>{parts.map((p, i) => p.toLowerCase() === q.toLowerCase() ? <mark key={i} style={{ background: `${BRAND.blue}30`, color: 'inherit', padding: '0 2px', borderRadius: 2 }}>{p}</mark> : p)}</>;
}

Object.assign(window, { SearchPage });
