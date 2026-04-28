// Post page — full article with comments

function PostPage({ postId, onBack, dark = false }) {
  const palette = dark ? darkPal : lightPal;
  const post = POSTS.find(p => p.id === postId) || POSTS[0];
  const related = POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  const moreRelated = POSTS.filter(p => p.id !== post.id).slice(0, 3);
  const allRelated = related.length >= 2 ? related : moreRelated;

  const [progress, setProgress] = React.useState(0);
  const articleRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => {
      if (!articleRef.current) return;
      const r = articleRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const scrolled = -r.top;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={articleRef} style={{ background: palette.bg, color: palette.text, fontFamily: "'Inter', sans-serif", minHeight: '100%' }}>
      {/* Reading progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'transparent', zIndex: 100 }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: BRAND.blue, transition: 'width .1s' }} />
      </div>

      <Nav palette={palette} variant="post" onOpenSearch={() => {}} />

      {/* Back nav */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 32px 0' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          fontSize: 13, color: palette.muted, padding: 0 }}>
          <Icon.arrow style={{ transform: 'rotate(180deg)' }} /> Voltar ao blog
        </button>
      </div>

      {/* HERO */}
      <header style={{ maxWidth: 760, margin: '0 auto', padding: '32px 32px 48px' }}>
        <div style={{ marginBottom: 24 }}>
          <CategoryTag cat={post.category} />
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em',
          color: palette.text, marginBottom: 24, textWrap: 'balance' }}>
          {post.title}
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.55, color: palette.textMuted, marginBottom: 32, fontWeight: 400 }}>
          {post.excerpt}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 20, borderTop: `1px solid ${palette.border}` }}>
          <span style={{ width: 40, height: 40, borderRadius: 20, background: BRAND.blue, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>
            {post.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>{post.author}</div>
            <div style={{ fontSize: 12, color: palette.muted }}>{post.authorRole} · {post.date} · <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.clock /> {post.readTime} de leitura</span></div>
          </div>
          <ActionBtns palette={palette} />
        </div>
      </header>

      {/* HERO IMAGE */}
      <figure style={{ maxWidth: 1100, margin: '0 auto 48px', padding: '0 32px' }}>
        <div style={{ aspectRatio: '16 / 8', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
          <AerialPlaceholder variant={post.image} label="Cobertura aérea · Brasil · 22.04.26" />
          <div style={{ position: 'absolute', top: 20, right: 20, padding: '10px 14px',
            background: 'rgba(255,255,255,0.95)', borderRadius: 4, fontFamily: 'ui-monospace, monospace',
            fontSize: 10, lineHeight: 1.5, color: BRAND.navy }}>
            <div style={{ color: BRAND.blue, fontWeight: 700, letterSpacing: '0.08em' }}>23.55°S · 46.63°W</div>
            <div>Alt 10.500 m · 264 ppm</div>
          </div>
        </div>
        <figcaption style={{ fontSize: 12, color: palette.muted, marginTop: 12, textAlign: 'center', fontStyle: 'italic' }}>
          A cobrança climática deixou de ser pauta de marketing — virou critério de compra.
        </figcaption>
      </figure>

      {/* BODY */}
      <article style={{ maxWidth: 680, margin: '0 auto', padding: '0 32px 80px' }}>
        {ARTICLE_BODY.map((block, i) => <Block key={i} block={block} palette={palette} />)}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 48, paddingTop: 32, borderTop: `1px solid ${palette.border}` }}>
          {post.tags.map(t => (
            <span key={t} style={{ padding: '6px 14px', background: palette.bgAlt,
              border: `1px solid ${palette.border}`, borderRadius: 999,
              fontSize: 12, fontWeight: 500, color: palette.textMuted }}>
              # {t}
            </span>
          ))}
        </div>

        {/* Author card */}
        <div style={{ display: 'flex', gap: 20, padding: 28, marginTop: 32,
          background: palette.bgAlt, border: `1px solid ${palette.border}`, borderRadius: 12 }}>
          <span style={{ width: 56, height: 56, borderRadius: 28, background: BRAND.blue, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
            {post.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 6 }}>Sobre o autor</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: palette.text }}>{post.author}</div>
            <div style={{ fontSize: 13, color: palette.muted, marginBottom: 10 }}>{post.authorRole} · AERA</div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: palette.textMuted }}>
              Equipe técnica da AERA, especializada em soluções ambientais para empresas brasileiras. Combinando conhecimento técnico, tecnologia própria e propósito genuíno.
            </p>
          </div>
        </div>
      </article>

      {/* COMMENTS */}
      <Comments palette={palette} />

      {/* RELATED */}
      <section style={{ borderTop: `1px solid ${palette.border}`, padding: '64px 32px', background: palette.bgAlt }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 12 }}>Continue lendo</div>
          <h3 style={{ fontSize: 28, fontWeight: 700, color: palette.text, letterSpacing: '-0.01em', marginBottom: 32 }}>
            Outras coberturas no horizonte
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {allRelated.map(p => (
              <PostCard key={p.id} post={p} palette={palette} onClick={() => { onBack(); setTimeout(() => window.openPost && window.openPost(p.id), 0); }} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterBand palette={palette} />
      <Footer palette={palette} />
    </div>
  );
}

function Block({ block, palette }) {
  const T = (props) => <p style={{ fontSize: 18, lineHeight: 1.75, color: palette.text, marginBottom: 24 }} {...props} />;
  if (block.type === 'lead') return (
    <p style={{ fontSize: 22, lineHeight: 1.55, color: palette.text, marginBottom: 32, fontWeight: 500, letterSpacing: '-0.005em' }}>
      {block.text}
    </p>
  );
  if (block.type === 'p') return <T>{block.text}</T>;
  if (block.type === 'h2') return (
    <h2 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.015em',
      color: palette.text, marginTop: 48, marginBottom: 20, textWrap: 'balance' }}>{block.text}</h2>
  );
  if (block.type === 'quote') return (
    <blockquote style={{ borderLeft: `3px solid ${BRAND.blue}`, paddingLeft: 24, margin: '32px 0',
      fontSize: 22, lineHeight: 1.45, fontWeight: 500, color: palette.text, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
      "{block.text}"
    </blockquote>
  );
  if (block.type === 'list') return (
    <ul style={{ marginBottom: 28, paddingLeft: 0, listStyle: 'none' }}>
      {block.items.map((it, i) => (
        <li key={i} style={{ fontSize: 17, lineHeight: 1.65, color: palette.text, marginBottom: 12, paddingLeft: 24, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, top: 12, width: 8, height: 8, background: BRAND.blue, borderRadius: 1 }} />
          {it}
        </li>
      ))}
    </ul>
  );
  if (block.type === 'numlist') return (
    <ol style={{ marginBottom: 28, paddingLeft: 0, listStyle: 'none', counterReset: 'item' }}>
      {block.items.map((it, i) => (
        <li key={i} style={{ fontSize: 17, lineHeight: 1.65, color: palette.text, marginBottom: 16,
          paddingLeft: 48, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, width: 32, height: 32,
            background: BRAND.blue, color: '#fff', borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, fontFamily: 'ui-monospace, monospace' }}>
            {i + 1}
          </span>
          {it}
        </li>
      ))}
    </ol>
  );
  return null;
}

function ActionBtns({ palette }) {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <IconBtn palette={palette} active={liked} onClick={() => setLiked(!liked)}><Icon.heart /></IconBtn>
      <IconBtn palette={palette} active={bookmarked} onClick={() => setBookmarked(!bookmarked)}><Icon.bookmark /></IconBtn>
      <IconBtn palette={palette}><Icon.share /></IconBtn>
    </div>
  );
}
function IconBtn({ palette, active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ width: 36, height: 36, borderRadius: 8,
      border: `1px solid ${palette.border}`, background: active ? BRAND.blue : 'transparent',
      color: active ? '#fff' : palette.muted, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>
      {children}
    </button>
  );
}

function Comments({ palette }) {
  const [list, setList] = React.useState(COMMENTS);
  const [val, setVal] = React.useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!val.trim()) return;
    setList([...list, { id: Date.now(), author: 'Você', role: 'Leitor', avatar: 'V', date: 'agora', body: val, likes: 0 }]);
    setVal('');
  };
  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px 64px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 12 }}>
        Discussão · {list.length} comentários
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 700, color: palette.text, letterSpacing: '-0.01em', marginBottom: 24 }}>
        Conversa com leitores
      </h3>

      {/* Composer */}
      <form onSubmit={submit} style={{ background: palette.bgAlt, border: `1px solid ${palette.border}`,
        borderRadius: 12, padding: 18, marginBottom: 32 }}>
        <textarea value={val} onChange={(e) => setVal(e.target.value)}
          placeholder="Compartilhe sua perspectiva sobre este artigo..."
          rows={3}
          style={{ width: '100%', border: 'none', background: 'transparent', resize: 'vertical',
            outline: 'none', fontFamily: 'inherit', fontSize: 14, lineHeight: 1.55, color: palette.text }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 12, paddingTop: 12, borderTop: `1px solid ${palette.border}` }}>
          <span style={{ fontSize: 11, color: palette.muted }}>
            Comentando como <strong style={{ color: palette.text }}>convidado</strong>. Seja respeitoso e relevante.
          </span>
          <button type="submit" disabled={!val.trim()}
            style={{ padding: '8px 18px', background: val.trim() ? BRAND.blue : palette.border,
              border: 'none', color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 600,
              cursor: val.trim() ? 'pointer' : 'default', fontFamily: 'inherit' }}>
            Publicar
          </button>
        </div>
      </form>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {list.map(c => <CommentNode key={c.id} c={c} palette={palette} />)}
      </div>
    </section>
  );
}
function CommentNode({ c, palette, depth = 0 }) {
  const [liked, setLiked] = React.useState(false);
  const [showReply, setShowReply] = React.useState(false);
  return (
    <div style={{ marginLeft: depth * 36 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 18,
          background: c.isAuthor ? BRAND.blue : palette.bgAlt,
          color: c.isAuthor ? '#fff' : palette.text,
          border: c.isAuthor ? 'none' : `1px solid ${palette.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700 }}>{c.avatar}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: palette.text }}>{c.author}</span>
            {c.isAuthor && (
              <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', background: BRAND.blue,
                color: '#fff', borderRadius: 3, letterSpacing: '0.06em' }}>AUTOR</span>
            )}
            <span style={{ fontSize: 12, color: palette.muted }}>· {c.role}</span>
            <span style={{ fontSize: 12, color: palette.muted }}>· {c.date}</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: palette.text, marginBottom: 10 }}>{c.body}</p>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: palette.muted }}>
            <button onClick={() => setLiked(!liked)} style={{ background: 'none', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 5,
              color: liked ? BRAND.blue : palette.muted, padding: 0, fontFamily: 'inherit', fontSize: 12 }}>
              <Icon.heart /> {c.likes + (liked ? 1 : 0)}
            </button>
            <button onClick={() => setShowReply(!showReply)} style={{ background: 'none', border: 'none', cursor: 'pointer',
              color: palette.muted, padding: 0, fontFamily: 'inherit', fontSize: 12,
              display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Icon.comment /> Responder
            </button>
          </div>
          {showReply && (
            <div style={{ marginTop: 10, padding: 12, background: palette.bgAlt, border: `1px solid ${palette.border}`, borderRadius: 8 }}>
              <textarea placeholder={`Responder a ${c.author}...`} rows={2}
                style={{ width: '100%', border: 'none', background: 'transparent', resize: 'vertical',
                  outline: 'none', fontFamily: 'inherit', fontSize: 13, color: palette.text }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                <button onClick={() => setShowReply(false)} style={{ padding: '6px 14px', background: 'transparent',
                  border: `1px solid ${palette.border}`, color: palette.text, borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Cancelar</button>
                <button style={{ padding: '6px 14px', background: BRAND.blue, border: 'none',
                  color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Enviar</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {c.replies && c.replies.map(r => <div key={r.id} style={{ marginTop: 20 }}><CommentNode c={r} palette={palette} depth={depth + 1} /></div>)}
    </div>
  );
}

Object.assign(window, { PostPage, Block, ActionBtns, IconBtn, Comments, CommentNode });
