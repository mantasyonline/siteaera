// Post page — full article with comments, like/save persistentes e compartilhamento real

function PostPage({ postId, onBack, onOpenSearch }) {
  const palette = lightPal;
  const isMobile = useIsMobile();
  const post = POSTS.find(p => p.id === postId) || POSTS[0];
  const contentBlocks = ARTICLES_CONTENT[postId] || ARTICLES_CONTENT['consumidor-clima'];

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
      {/* Barra de progresso de leitura */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'transparent', zIndex: 100 }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: BRAND.blue, transition: 'width .1s' }} />
      </div>

      {/* Nav adaptada para a página de artigo */}
      <PostNav palette={palette} onOpenSearch={onOpenSearch} onBack={onBack} />

      {/* Botão voltar */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '24px 16px 0' : '32px 32px 0' }}>
        <button onClick={() => onBack()} style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          fontSize: 13, color: palette.muted, padding: 0 }}>
          <Icon.arrow style={{ transform: 'rotate(180deg)' }} /> Voltar ao blog
        </button>
      </div>

      {/* Cabeçalho do artigo */}
      <header style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '24px 16px 40px' : '32px 32px 48px' }}>
        <div style={{ marginBottom: 24 }}>
          <CategoryTag cat={post.category} />
        </div>
        <h1 style={{ fontSize: isMobile ? 28 : 48, fontWeight: 800, lineHeight: 1.18, letterSpacing: '-0.025em',
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
            <div style={{ fontSize: 12, color: palette.muted }}>
              {post.authorRole} · {post.date} · <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.clock /> {post.readTime} de leitura</span>
            </div>
          </div>
          <ActionBtns palette={palette} post={post} />
        </div>
      </header>

      {/* Imagem hero */}
      <figure style={{ maxWidth: 1100, margin: '0 auto 48px', padding: isMobile ? '0 16px' : '0 32px' }}>
        {post.image && (post.image.startsWith('/') || post.image.startsWith('http') || post.image.includes('.png') || post.image.includes('.jpg') || post.image.includes('.webp')) ? (
          <div style={{ borderRadius: 6, overflow: 'hidden', position: 'relative', background: '#0A1628' }}>
            <img src={post.image} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
            <div style={{ position: 'absolute', top: 20, right: 20, padding: '10px 14px',
              background: 'rgba(255,255,255,0.95)', borderRadius: 4, fontFamily: 'ui-monospace, monospace',
              fontSize: 10, lineHeight: 1.5, color: BRAND.navy }}>
              <div style={{ color: BRAND.blue, fontWeight: 700, letterSpacing: '0.08em' }}>23.55°S · 46.63°W</div>
              <div>Alt 10.500 m · 264 ppm</div>
            </div>
          </div>
        ) : (
          <div style={{ aspectRatio: isMobile ? '4 / 3' : '16 / 8', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
            <AerialPlaceholder variant={post.image} label="Cobertura aérea · Brasil · 22.04.26" />
            <div style={{ position: 'absolute', top: 20, right: 20, padding: '10px 14px',
              background: 'rgba(255,255,255,0.95)', borderRadius: 4, fontFamily: 'ui-monospace, monospace',
              fontSize: 10, lineHeight: 1.5, color: BRAND.navy }}>
              <div style={{ color: BRAND.blue, fontWeight: 700, letterSpacing: '0.08em' }}>23.55°S · 46.63°W</div>
              <div>Alt 10.500 m · 264 ppm</div>
            </div>
          </div>
        )}
        <figcaption style={{ fontSize: 12, color: palette.muted, marginTop: 12, textAlign: 'center', fontStyle: 'italic' }}>
          Vista aérea como metáfora da perspectiva estratégica sobre sustentabilidade.
        </figcaption>
      </figure>

      {/* Corpo do artigo */}
      <article style={{ maxWidth: 680, margin: '0 auto', padding: isMobile ? '0 16px 64px' : '0 32px 80px' }}>
        {contentBlocks.map((block, i) => <Block key={i} block={block} palette={palette} />)}

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

        {/* Card do autor */}
        <div style={{ display: 'flex', gap: 20, padding: 28, marginTop: 32,
          background: palette.bgAlt, border: `1px solid ${palette.border}`, borderRadius: 12 }}>
          <span style={{ width: 56, height: 56, borderRadius: 28, background: BRAND.blue, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
            {post.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 6 }}>Sobre o autor</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: palette.text }}>{post.author}</div>
            <div style={{ fontSize: 13, color: palette.muted, marginBottom: 10 }}>{post.authorRole || 'Especialistas'} · AERA</div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: palette.textMuted }}>
              Equipe técnica da AERA, especializada em soluções ambientais para empresas brasileiras. Combinando conhecimento técnico, tecnologia própria e propósito genuíno.
            </p>
          </div>
        </div>
      </article>

      {/* Comentários */}
      <Comments palette={palette} postId={post.id} />

      {/* Artigos relacionados */}
      <section style={{ borderTop: `1px solid ${palette.border}`, padding: isMobile ? '40px 16px' : '64px 32px', background: palette.bgAlt }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 12 }}>Continue lendo</div>
          <h3 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: palette.text, letterSpacing: '-0.01em', marginBottom: 32 }}>
            Outras coberturas no horizonte
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 32 }}>
            {allRelated.map(p => (
              <PostCard key={p.id} post={p} palette={palette}
                onClick={() => { onBack(); setTimeout(() => window.openPost && window.openPost(p.id), 0); }} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterBand palette={palette} />
      <Footer palette={palette} onFilterCat={(cat) => onBack(cat)} />
    </div>
  );
}

// Nav simplificada para página de artigo
function PostNav({ palette, onOpenSearch, onBack }) {
  const isMobile = useIsMobile();
  return (
    <nav style={{ position: 'sticky', top: 3, zIndex: 50,
      background: `${palette.bg}EE`, backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${palette.border}`,
      height: 64, display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto', padding: isMobile ? '0 16px' : '0 48px', display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 40 }}>
        <AeraLogo color={BRAND.blue} textColor={BRAND.blue} sub={false} size="sm" homeUrl="../" />
        <button onClick={() => onBack()} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4,
          background: BRAND.bgAlt, color: BRAND.textMuted,
          fontWeight: 600, letterSpacing: '0.05em', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          ← BLOG
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {!isMobile && (
            <button onClick={onOpenSearch} style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', background: BRAND.bgAlt, border: `1px solid ${palette.border}`,
              color: palette.muted, borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12 }}>
              <Icon.search /> Buscar
              <kbd style={{ marginLeft: 8, fontSize: 10, padding: '2px 5px', background: '#fff', borderRadius: 3, fontFamily: 'ui-monospace, monospace' }}>⌘K</kbd>
            </button>
          )}
          <a href="../aera-app.html" style={{ padding: isMobile ? '8px 12px' : '9px 18px', background: BRAND.blue, color: '#fff',
            borderRadius: 8, fontSize: isMobile ? 12 : 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
            {isMobile ? 'AERA APP' : 'Acessar AERA APP'}
          </a>
        </div>
      </div>
    </nav>
  );
}

function Block({ block, palette }) {
  if (block.type === 'lead') return (
    <p style={{ fontSize: 22, lineHeight: 1.55, color: palette.text, marginBottom: 32, fontWeight: 500, letterSpacing: '-0.005em' }}>
      {block.text}
    </p>
  );
  if (block.type === 'p') return (
    <p style={{ fontSize: 18, lineHeight: 1.75, color: palette.text, marginBottom: 24 }}>{block.text}</p>
  );
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
        <li key={i} style={{ fontSize: 17, lineHeight: 1.65, color: palette.text, marginBottom: 16, paddingLeft: 48, position: 'relative' }}>
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

// Botões de ação: like, salvar e compartilhar — persistência via localStorage
function ActionBtns({ palette, post }) {
  const [liked, setLiked] = React.useState(() => Storage.isLiked(post.id));
  const [saved, setSaved] = React.useState(() => Storage.isSaved(post.id));

  const handleLike = () => {
    const next = Storage.toggleLike(post.id);
    setLiked(next);
    window.showToast && window.showToast(next ? 'Artigo curtido!' : 'Curtida removida.');
  };

  const handleSave = () => {
    const next = Storage.toggleSave(post.id);
    setSaved(next);
    window.showToast && window.showToast(next ? 'Artigo salvo!' : 'Removido dos salvos.');
  };

  const handleShare = () => sharePost(post);

  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <IconBtn palette={palette} active={liked} onClick={handleLike} title={liked ? 'Remover curtida' : 'Curtir artigo'}>
        <Icon.heart style={{ fill: liked ? 'currentColor' : 'none' }} />
      </IconBtn>
      <IconBtn palette={palette} active={saved} onClick={handleSave} title={saved ? 'Remover dos salvos' : 'Salvar artigo'}>
        <Icon.bookmark style={{ fill: saved ? 'currentColor' : 'none' }} />
      </IconBtn>
      <IconBtn palette={palette} active={false} onClick={handleShare} title="Compartilhar artigo">
        <Icon.share />
      </IconBtn>
    </div>
  );
}

function IconBtn({ palette, active, onClick, title, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: 36, height: 36, borderRadius: 8,
        border: `1px solid ${active ? BRAND.blue : palette.border}`,
        background: active ? BRAND.blue : hover ? palette.bgAlt : 'transparent',
        color: active ? '#fff' : hover ? palette.text : palette.muted,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'inherit', transition: 'all .15s' }}>
      {children}
    </button>
  );
}

// Seção de comentários com threading e persistência em memória por sessão
function Comments({ palette, postId }) {
  const isMobile = useIsMobile();
  const [list, setList] = React.useState([]);
  const [val, setVal] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!val.trim()) return;
    setList(prev => [
      { id: Date.now(), author: 'Você', role: 'Leitor', avatar: 'V',
        date: 'agora', body: val.trim(), likes: 0, replies: [] },
      ...prev,
    ]);
    setVal('');
    window.showToast && window.showToast('Comentário publicado!');
  };

  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '0 16px 48px' : '0 32px 64px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BRAND.blue, marginBottom: 12 }}>
        Discussão · {list.length} {list.length === 1 ? 'comentário' : 'comentários'}
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
            style={{ padding: '8px 18px',
              background: val.trim() ? BRAND.blue : palette.border,
              border: 'none', color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 600,
              cursor: val.trim() ? 'pointer' : 'default', fontFamily: 'inherit' }}>
            Publicar
          </button>
        </div>
      </form>

      {list.length === 0 && (
        <div style={{ padding: '32px 0', textAlign: 'center', color: palette.muted, fontSize: 14 }}>
          Seja o primeiro a comentar neste artigo.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {list.map(c => (
          <CommentNode key={c.id} c={c} palette={palette}
            onReply={(id, text) => {
              setList(prev => prev.map(cm =>
                cm.id === id
                  ? { ...cm, replies: [...(cm.replies || []), { id: Date.now(), author: 'Você', role: 'Leitor', avatar: 'V', date: 'agora', body: text, likes: 0 }] }
                  : cm
              ));
            }}
          />
        ))}
      </div>
    </section>
  );
}

function CommentNode({ c, palette, depth = 0, onReply }) {
  const [liked, setLiked] = React.useState(false);
  const [localLikes, setLocalLikes] = React.useState(c.likes);
  const [showReply, setShowReply] = React.useState(false);
  const [replyVal, setReplyVal] = React.useState('');

  const handleLike = () => {
    if (!liked) setLocalLikes(n => n + 1);
    else setLocalLikes(n => n - 1);
    setLiked(!liked);
  };

  const submitReply = (e) => {
    e.preventDefault();
    if (!replyVal.trim()) return;
    onReply && onReply(c.id, replyVal.trim());
    setReplyVal('');
    setShowReply(false);
    window.showToast && window.showToast('Resposta publicada!');
  };

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
            <button onClick={handleLike} style={{ background: 'none', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 5,
              color: liked ? BRAND.blue : palette.muted, padding: 0, fontFamily: 'inherit', fontSize: 12 }}>
              <Icon.heart style={{ fill: liked ? 'currentColor' : 'none' }} /> {localLikes}
            </button>
            {depth === 0 && (
              <button onClick={() => setShowReply(!showReply)} style={{ background: 'none', border: 'none', cursor: 'pointer',
                color: palette.muted, padding: 0, fontFamily: 'inherit', fontSize: 12,
                display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Icon.comment /> Responder
              </button>
            )}
          </div>
          {showReply && (
            <form onSubmit={submitReply} style={{ marginTop: 10, padding: 12, background: palette.bgAlt, border: `1px solid ${palette.border}`, borderRadius: 8 }}>
              <textarea value={replyVal} onChange={e => setReplyVal(e.target.value)}
                placeholder={`Responder a ${c.author}...`} rows={2}
                style={{ width: '100%', border: 'none', background: 'transparent', resize: 'vertical',
                  outline: 'none', fontFamily: 'inherit', fontSize: 13, color: palette.text }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                <button type="button" onClick={() => setShowReply(false)} style={{ padding: '6px 14px', background: 'transparent',
                  border: `1px solid ${palette.border}`, color: palette.text, borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Cancelar</button>
                <button type="submit" disabled={!replyVal.trim()} style={{ padding: '6px 14px',
                  background: replyVal.trim() ? BRAND.blue : palette.border, border: 'none',
                  color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  cursor: replyVal.trim() ? 'pointer' : 'default', fontFamily: 'inherit' }}>Enviar</button>
              </div>
            </form>
          )}
        </div>
      </div>
      {c.replies && c.replies.map(r => (
        <div key={r.id} style={{ marginTop: 20 }}>
          <CommentNode c={r} palette={palette} depth={depth + 1} />
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { PostPage, PostNav, Block, ActionBtns, IconBtn, Comments, CommentNode });
